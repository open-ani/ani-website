import { defineCollection } from "astro:content";
import { glob, type Loader } from "astro/loaders";
import { z } from "astro/zod";

const changelogSchema = z.object({
  version: z.string(),
  downloadUrlAlternatives: z.array(z.string()),
  publishTime: z.coerce.number().transform((ts) => {
    return new Date(ts * 1000).toISOString().slice(0, 10);
  }),
  description: z.string(),
});

type Changelog = z.infer<typeof changelogSchema>;

const changelogLoader: Loader = {
  name: "changelog-loader",
  async load({ renderMarkdown, store, parseData }) {
    const response = await fetch(
      "https://danmaku-cn.myani.org/v1/updates/incremental/details?clientVersion=4.0.0&clientPlatform=android&clientArch=x86_64&releaseClass=stable"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch changelogs");
    }

    const { updates } = (await response.json()) as { updates: Changelog[] };

    const stableUpdates = updates
      .toReversed()
      .filter((update) => !update.version.includes("beta") && !update.version.includes("alpha"));

    store.clear();

    for (const update of stableUpdates) {
      const parsedData = await parseData({
        id: update.version,
        data: update,
      });

      store.set({
        id: parsedData.version,
        data: parsedData,
        rendered: await renderMarkdown(parsedData.description),
      });
    }
  },
  schema: changelogSchema,
};

const changelogs = defineCollection({
  loader: changelogLoader,
  schema: changelogSchema,
});

const wiki = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/wiki" }),
  schema: z.object({
    title: z.string(),
    order: z.number().optional(),
  }),
});

export const collections = {
  changelogs,
  wiki,
};
