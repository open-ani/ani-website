export const SITE_NAME = "Animeko";

export const APP_DESCRIPTION =
  "开源的一站式弹幕追番平台，集找番、追番、看番于一体，支持多数据源聚合播放、弹幕云过滤、Bangumi 收藏同步和离线缓存，覆盖 Android、iOS、Windows、macOS 和 Linux。";

export const DEFAULT_DESCRIPTION = `Animeko（Ani）官网：${APP_DESCRIPTION}`;

// Must match the actual dimensions of public/og-image.png.
export const OG_IMAGE = {
  path: "/og-image.png",
  width: 1280,
  height: 640,
  alt: "Animeko - 集找番、追番、看番的一站式弹幕追番平台",
};

export type JsonLdNode = Record<string, unknown>;

export const webSiteSchema = (site: URL | undefined): JsonLdNode => ({
  "@type": "WebSite",
  "@id": new URL("/#website", site).href,
  url: new URL("/", site).href,
  name: SITE_NAME,
  alternateName: ["Ani", "Animeko 官网"],
  description: APP_DESCRIPTION,
  inLanguage: "zh-CN",
});

export const softwareApplicationSchema = (site: URL | undefined, softwareVersion?: string): JsonLdNode => ({
  "@type": "SoftwareApplication",
  "@id": new URL("/#app", site).href,
  name: SITE_NAME,
  alternateName: "Ani",
  url: new URL("/", site).href,
  description: APP_DESCRIPTION,
  image: new URL(OG_IMAGE.path, site).href,
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Android, iOS, Windows, macOS, Linux",
  downloadUrl: new URL("/downloads/", site).href,
  ...(softwareVersion ? { softwareVersion } : {}),
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  sameAs: ["https://github.com/open-ani/animeko"],
});
