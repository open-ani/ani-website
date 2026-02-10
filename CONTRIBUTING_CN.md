# 贡献指南

本指南用于说明如何为 Animeko 网站做贡献。

## 项目结构

- `src/pages/`: Astro 页面路由目录。
- `src/components/`: 可复用 UI 组件（Astro 或 Solid）。
- `src/layouts/`: 页面布局。
- `src/styles/`: 全局样式与 Tailwind 层。
- `src/ui/`: 设计系统风格的基础组件。
- `src/types/`: 共享 TypeScript 类型。
- `public/`: 站点根目录静态资源。

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

## 代码规范

- 使用 TypeScript（严格模式已开启）。
- 遵循 `biome.json` 中的格式化与 lint 规则。
- 样式使用 Tailwind CSS v4。
- 保持 import 有序，移除未使用代码。

## 提交规范

- 提交信息简洁清晰。
- 推荐使用 Gitmoji：<https://gitmoji.dev/>

## 代码质量要求

提交前请执行：

```bash
pnpm code:fix
pnpm build
```

`pnpm build` 会包含 `astro check` 的类型检查。
