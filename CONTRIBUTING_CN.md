# 贡献指南

本指南用于说明如何为 Animeko 网站做贡献。

## 技术栈

- 框架：Astro v6（静态输出，部署到 Cloudflare Pages）
- UI：SolidJS v1（JSX 写在 `.tsx` 文件中）
- 样式：Tailwind CSS v4，通过 `@tailwindcss/vite` 集成
- Lint/格式化：Biome v2 — 请勿使用 Prettier 或 ESLint
- 包管理器：pnpm v10
- 语言：TypeScript 严格模式。路径别名 `@/*` → `src/*`

## 项目结构

```
src/
  components/
    common/       # NavBar、Footer、GoogleAnalytics
    home/         # 落地页各区块（Header、Features、FAQ 等）
    modules/      # 交互组件（DownloadList.tsx）+ 逻辑测试
  content/
    wiki/         # Wiki Markdown 文件
  config/         # ads.ts
  layouts/        # Layout、Doc、Post、Changelog
  pages/          # 基于文件的路由（index、downloads、changelogs、wiki/*、about、404）
  plugins/        # rehypeMarkdownImages.ts（自定义 rehype 插件）
  scripts/        # 客户端脚本（统计、图片增强）
  styles/         # 全局 CSS
public/           # 站点根目录静态资源
```

## 开发环境要求

- Node.js 22+（推荐）
- pnpm 10+

## 本地调试

安装依赖：

```bash
pnpm install
```

启动开发服务器：

```bash
pnpm dev
```

默认访问地址为 `http://localhost:4321`。`pnpm start` 作为 `pnpm dev` 的别名。

## 可用命令

```
pnpm dev              # 开发服务器
pnpm build            # astro check + astro build（提交前执行）
pnpm code:fix         # biome check --write .（lint + 格式化修复）
pnpm test:logic       # node --experimental-strip-types --test src/components/modules/*.test.ts
pnpm astro check      # 仅类型检查（也会在 pre-commit 阶段对 *.astro 文件运行）
```

## 代码规范

- 使用 TypeScript（严格模式已开启）。
- 遵循 `biome.json` 中的格式化与 lint 规则（2 空格缩进、120 字符行宽、双引号、分号、ES5 尾逗号）。
- 样式使用 Tailwind CSS v4。
- 保持 import 有序，移除未使用代码。

## 测试

逻辑测试使用 Node 内置测试运行器（`node:test` + `node:assert/strict`）。测试文件以 `*.test.ts` 的形式放在 `src/components/modules/` 源码旁边。使用 `pnpm test:logic` 运行。

## 提交规范

- 提交信息简洁清晰。
- 推荐使用 Gitmoji：<https://gitmoji.dev/>

## Pre-commit 钩子

`husky` + `lint-staged` 会在提交时自动运行：
- 对 `*.astro` 文件运行 `astro check`
- 对所有暂存文件运行 `biome check`

请勿绕过或禁用这些钩子。

## 代码质量要求

提交前请按以下顺序验证：

```bash
pnpm code:fix
pnpm build
```

如果修改了 UI，请额外执行 `pnpm dev` 进行预览检查。`pnpm build` 会包含 `astro check` 的类型检查。
