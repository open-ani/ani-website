const imageDimensions: Record<string, { width: number; height: number }> = {
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

function isNumericDimension(value: string) {
  return /^\d+(\.\d+)?$/.test(value.trim());
}

export function enhanceMarkdownImages() {
  const images = document.querySelectorAll<HTMLImageElement>(".markdown-body img");

  images.forEach((img) => {
    if (img.dataset.enhancedImage === "true") {
      return;
    }
    img.dataset.enhancedImage = "true";

    const src = img.getAttribute("src");
    const dims = src ? imageDimensions[src] : undefined;
    const widthAttr = img.getAttribute("width");
    const heightAttr = img.getAttribute("height");

    if (!img.hasAttribute("loading")) {
      img.setAttribute("loading", "lazy");
    }

    img.setAttribute("decoding", "async");
    img.classList.add("lazy-image", "is-loading");

    if (dims) {
      if (!widthAttr && !heightAttr) {
        img.setAttribute("width", String(dims.width));
        img.setAttribute("height", String(dims.height));
      } else if (widthAttr && !heightAttr && isNumericDimension(widthAttr)) {
        const displayWidth = Number(widthAttr);
        if (!Number.isNaN(displayWidth) && displayWidth > 0) {
          const displayHeight = Math.round((displayWidth * dims.height) / dims.width);
          img.setAttribute("height", String(displayHeight));
        }
      } else if (heightAttr && !widthAttr && isNumericDimension(heightAttr)) {
        const displayHeight = Number(heightAttr);
        if (!Number.isNaN(displayHeight) && displayHeight > 0) {
          const displayWidth = Math.round((displayHeight * dims.width) / dims.height);
          img.setAttribute("width", String(displayWidth));
        }
      }
    }

    const markLoaded = (hasError = false) => {
      img.classList.remove("is-loading");
      img.classList.add(hasError ? "is-error" : "is-loaded");
    };

    if (img.complete) {
      markLoaded(img.naturalWidth === 0);
      return;
    }

    img.addEventListener(
      "load",
      () => {
        markLoaded(false);
      },
      { once: true }
    );
    img.addEventListener(
      "error",
      () => {
        markLoaded(true);
      },
      { once: true }
    );
  });
}
