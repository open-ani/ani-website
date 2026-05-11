/**
 * Attaches load/error listeners to markdown images that were given the
 * `lazy-image is-loading` classes by the server-side rehype plugin, so the
 * skeleton animation is dismissed once each image settles.
 */
export function enhanceMarkdownImages() {
  const images = document.querySelectorAll<HTMLImageElement>(".markdown-body img.lazy-image");

  images.forEach((img) => {
    if (img.dataset.enhancedImage === "true") {
      return;
    }
    img.dataset.enhancedImage = "true";

    const markLoaded = (hasError = false) => {
      img.classList.remove("is-loading");
      img.classList.add(hasError ? "is-error" : "is-loaded");
    };

    if (img.complete) {
      markLoaded(img.naturalWidth === 0);
      return;
    }

    img.addEventListener("load", () => markLoaded(false), { once: true });
    img.addEventListener("error", () => markLoaded(true), { once: true });
  });
}
