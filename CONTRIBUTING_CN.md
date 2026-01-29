# 贡献指南 (Contributing to Animeko Website)

感谢你有兴趣为 **Animeko Website** 做贡献！这是 Animeko 的官方网站，基于 Astro 构建。

## 🛠 技术栈 (Tech Stack)

- **框架:** [Astro](https://astro.build/) (静态站点生成)
- **样式:** [Tailwind CSS](https://tailwindcss.com/) (v4)
- **语言:** TypeScript
- **代码规范:** [Biome](https://biomejs.dev/) (Linting & Formatting)
- **包管理器:** [pnpm](https://pnpm.io/)

## 📋 前置要求 (Prerequisites)

在开始之前，请确保你的环境已安装：

- **Node.js:** 推荐 v22.x 或更高版本。
- **pnpm:** v10.x 或更高版本。

## 🚀 开发流程 (Development Workflow)

### 1. 初始化 (Setup)

克隆仓库并安装依赖：

```bash
git clone https://github.com/open-ani/animeko-website.git
cd animeko-website
pnpm install
```

### 2. 启动开发服务器 (Start Development Server)

启动本地开发环境：

```bash
pnpm dev
# 或
pnpm start
```

网站通常会在 `http://localhost:4321` 运行。

### 3. 构建生产版本 (Build for Production)

构建生产版本（包含类型检查）：

```bash
pnpm build
```

### 4. 代码检查与格式化 (Linting and Formatting)

我们使用 **Biome** 进行代码检查和格式化。请不要使用 Prettier 或 ESLint。

```bash
pnpm code:lint
```

## 📂 项目结构 (Project Structure)

我们采用模块化的目录结构：

- **`src/pages/`**: Astro 的文件路由目录。
- **`src/components/common/`**: 全局通用的 UI 组件 (如 Header, Footer, Button)。
- **`src/components/modules/`**: 特定功能的业务组件 (如 DownloadList, FAQ)。
- **`src/lib/types/`**: TypeScript 类型定义文件。
- **`src/layouts/`**: 页面布局文件。

**注意:** 我们使用 `@/`别名映射到 `src/` 目录。

## 📏 编码规范 (Coding Conventions)

- **代码风格:** 我们通过 `biome.json` 强制执行严格的代码规范。提交代码前请务必运行 `pnpm code:lint`。
- **AI 代理:** 如果你是 AI Agent，请参考 `AGENTS.md` 获取详细指令。

## 🤝 Pull Request 流程

1.  **Fork** 本仓库到你的 GitHub 账号。
2.  **Clone** 你的 Fork 到本地。
3.  **新建分支** (`git checkout -b feature/amazing-feature`)。
4.  **提交更改** 并编写清晰的 commit message。
5.  **推送到远程分支** (`git push origin feature/amazing-feature`)。
6.  向原仓库的 `main` 分支 **发起 Pull Request**。

感谢你帮助 Animeko 变得更好！
