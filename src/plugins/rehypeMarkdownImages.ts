/** Minimal inline types for hast nodes (avoids external type dependency). */
interface HastProperties {
  [key: string]: unknown;
  src?: string;
  loading?: string;
  decoding?: string;
  width?: number | string;
  height?: number | string;
  className?: string | string[];
}

interface HastElement {
  type: "element";
  tagName: string;
  properties: HastProperties;
  children: HastNode[];
}

interface HastParent {
  type: string;
  children: HastNode[];
}

interface HastRaw {
  type: "raw";
  value: string;
}

type HastNode = HastElement | HastParent | HastRaw;

function isRawNode(node: HastNode): node is HastRaw {
  return node.type === "raw" && "value" in node;
}

const imageDimensions: Record<string, { width: number; height: number }> = {
  "/images/animeko.svg": { width: 1280, height: 640 },
  "/features/subject-details.png": { width: 575, height: 1280 },
  "/features/subject-rating.png": { width: 575, height: 1280 },
  "/features/anime-schedule.png": { width: 575, height: 1280 },
  "/features/search-by-tag.png": { width: 575, height: 1280 },
  "/features/subject-collection.png": { width: 575, height: 1280 },
  "/features/home.png": { width: 575, height: 1280 },
  "/features/mediaselector-simple.png": { width: 1080, height: 2400 },
  "/features/mediaselector-detailed.png": { width: 1080, height: 2400 },
  "/features/episode.png": { width: 575, height: 1280 },
  "/features/episode-scrolled.png": { width: 575, height: 1280 },
  "/features/cache-episode.png": { width: 575, height: 1280 },
  "/features/cache-list.png": { width: 575, height: 1280 },
  "/features/player-fullscreen.png": { width: 2400, height: 1080 },
  "/features/pc-home.png": { width: 2966, height: 1576 },
  "/features/pc-search.png": { width: 2722, height: 1742 },
  "/features/pc-search-detail.png": { width: 2528, height: 1742 },
  "/features/danmaku-settings.png": { width: 2400, height: 1080 },
  "/features/theme-settings.png": { width: 1080, height: 2400 },
  "/features/media-preferences.png": { width: 575, height: 1280 },
  "/images/iOS-sideloadly.png": { width: 1053, height: 374 },
  "/images/iOS-ready.png": { width: 1053, height: 374 },
  "/images/iOS-done.png": { width: 1053, height: 374 },
  "/images/macos-intel.png": { width: 332, height: 440 },
  "/images/macos-security.png": { width: 504, height: 418 },
  "/images/macos-xattr.png": { width: 1400, height: 1326 },
  "/images/macos-open.png": { width: 500, height: 582 },
  "/images/win-font-1.png": { width: 1689, height: 951 },
  "/images/win-font-2.png": { width: 956, height: 571 },
  "/images/win-font-3.png": { width: 942, height: 557 },
};

function titleCase(value: string): string {
  return value.replace(/\b\w/g, (char) => char.toUpperCase());
}

function inferAltFromSrc(src: string): string | null {
  const cleaned = src.split(/[?#]/)[0];
  const filename = cleaned.split("/").pop();
  if (!filename) return null;

  const base = filename.replace(/\.[a-z0-9]+$/i, "");
  const spaced = base.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
  if (!spaced) return null;

  return titleCase(spaced);
}

function parseImgFromRaw(value: string): HastElement | null {
  const trimmed = value.trim();
  const match = trimmed.match(/^<img\s+([^>]*?)\s*\/?>$/i);
  if (!match) return null;

  const props: HastProperties = {};
  const attrs = match[1];
  const attrRegex = /([^\s=]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+))/g;

  for (let attrMatch = attrRegex.exec(attrs); attrMatch; attrMatch = attrRegex.exec(attrs)) {
    const key = attrMatch[1];
    const rawValue = attrMatch[2] ?? attrMatch[3] ?? attrMatch[4] ?? "";

    if (key === "class") {
      props.className = rawValue.split(/\s+/).filter(Boolean);
      continue;
    }

    if (key === "width" || key === "height") {
      const numeric = Number(rawValue);
      props[key] = Number.isNaN(numeric) ? rawValue : numeric;
      continue;
    }

    props[key] = rawValue;
  }

  return {
    type: "element",
    tagName: "img",
    properties: props,
    children: [],
  };
}

function visitElements(
  node: HastNode,
  visitor: (element: HastElement) => void,
  parent?: HastParent,
  index?: number
): void {
  if (isRawNode(node)) {
    const parsed = parseImgFromRaw(node.value);
    if (parsed && parent && typeof index === "number") {
      parent.children[index] = parsed;
      visitor(parsed);
      return;
    }
  }

  if (node.type === "element") {
    visitor(node as HastElement);
  }

  if ("children" in node && Array.isArray(node.children)) {
    for (let i = 0; i < node.children.length; i += 1) {
      visitElements(node.children[i], visitor, node, i);
    }
  }
}

/**
 * Rehype plugin that enhances markdown `<img>` elements at build time:
 * - Adds `loading="lazy"` and `decoding="async"`
 * - Injects missing `width`/`height` for known images (including SVGs).
 *   When only one dimension is already present the other is inferred from the
 *   known aspect ratio — this covers the inline `<img width="200">` elements
 *   in about.md where the browser needs both values to reserve space (CLS).
 * - Adds `lazy-image is-loading` CSS classes so the skeleton is server-rendered
 *
 * SVG images are skipped only for the skeleton class treatment; they still
 * receive `loading`, `decoding`, and dimension attributes.
 */
export default function rehypeMarkdownImages() {
  return (tree: unknown) => {
    visitElements(tree as HastNode, (node) => {
      if (node.tagName !== "img") return;

      const props = node.properties ?? {};
      node.properties = props;
      const src = typeof props.src === "string" ? props.src : undefined;

      // Add loading="lazy" and decoding="async" to all images
      if (!props.loading) {
        props.loading = "lazy";
      }
      props.decoding = "async";

      if (!props.alt && src) {
        const inferredAlt = inferAltFromSrc(src);
        if (inferredAlt) {
          props.alt = inferredAlt;
        }
      }

      // Inject width/height for ALL known images (including SVGs).
      // When only one dimension is supplied (e.g. width="200" in about.md inline HTML)
      // the missing value is inferred from the known aspect ratio so the browser can
      // reserve the correct amount of space before the image loads (prevents CLS).
      const dims = src ? imageDimensions[src] : undefined;
      if (dims) {
        const hasWidth = props.width != null && props.width !== "";
        const hasHeight = props.height != null && props.height !== "";

        if (!hasWidth && !hasHeight) {
          props.width = dims.width;
          props.height = dims.height;
        } else if (hasWidth && !hasHeight) {
          const w = Number(props.width);
          if (!Number.isNaN(w) && w > 0) {
            props.height = Math.round((w * dims.height) / dims.width);
          }
        } else if (!hasWidth && hasHeight) {
          const h = Number(props.height);
          if (!Number.isNaN(h) && h > 0) {
            props.width = Math.round((h * dims.width) / dims.height);
          }
        }
      }

      // Add lazy-image and is-loading classes for skeleton animation
      const existing = Array.isArray(props.className)
        ? (props.className as string[]).filter((c) => typeof c === "string")
        : props.className
          ? [String(props.className)]
          : [];

      if (!existing.includes("lazy-image")) {
        props.className = [...existing, "lazy-image", "is-loading"];
      }
    });
  };
}
