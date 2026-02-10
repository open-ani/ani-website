---
title: "文档"
---

这里是 Animeko 的用户文档，Animeko 是一个开源的一站式弹幕动画平台。

## 寻求帮助

对于文档没有覆盖到的一般的问题，你可以在 [Telegram 闲聊群](https://t.me/openani)或QQ群(1019689427)礼貌地寻求帮助。

如果你想要对 Animeko 相关问题进行较为正式的讨论，请前往 [GitHub Discussions](https://github.com/open-ani/animeko/discussions)。

如果你在使用中发现了 Animeko 的 bug，或期待 Animeko 添加一个新的特性，请前往 [GitHub Issues](https://github.com/open-ani/animeko/issues) 查找是否存在重复的报告，如果不存在，你可以通过 <https://github.com/open-ani/animeko/issues/new/choose> 报告，由于开发者时间有限，请务必在以上链接提交问题。

## 参与贡献

首先，感谢您愿意为 Animeko 做出自己的贡献。不过在开始之前，我们需要您了解并熟知一些规范，以免在贡献过程中产生不必要的麻烦。

### Animeko 文档

如果你发现了现有的文档有错别字/表述不当/信息不完整等问题，可以通过页面底部的“编辑页面”按钮跳转至编辑页面快捷地创建修改 PR。同时，我们也欢迎你把你在使用 Animeko 时遇到的问题编写成新的文档提交给我们。

对于新文档，你有这几种提交方式：

1. 编辑好文档，在 [GitHub Issues](https://github.com/open-ani/ani-website/issues/new) 提交，或发送到邮箱 <i@nickchen.top> （推荐）
2. fork 官网仓库 <https://github.com/open-ani/ani-website>，在本地分支的 `src/content/wiki` 按照格式新建并编辑文档，静态资源存放在 `/public` 并正确链接后提交 PR 等待审核。

你的文档被我们采用后，我们将会及时通知你，你可以选择是否在正式发布页面上署名。

### Animeko 官网

Animeko 的官网采取了 Astro.js 的技术栈，贡献时请参考 [CONTRIBUTING](https://github.com/open-ani/ani-website/blob/main/CONTRIBUTING_CN.md) 的准则。

### Animeko

欢迎你提交 PR 参与开发，有关项目技术细节请参考 [CONTRIBUTING](https://github.com/open-ani/animeko/blob/main/docs/contributing/README.md)。如果你想与其他开发者讨论 Animeko 开发相关内容，可以加入[开发者电报群](https://t.me/openani_dev)

以下几点可以给你一个技术上的大概了解。

- [Kotlin 多平台](https://kotlinlang.org/docs/multiplatform.html) 架构；
- 使用新一代响应式 UI 框架 [Compose Multiplatform](https://www.jetbrains.com/lp/compose-multiplatform/) 构建 UI；
- 内置专为 Animeko 打造的“基于 [libtorrent](https://github.com/arvidn/libtorrent) 的 BitTorrent 引擎”，优化边下边播的体验；
- 高性能弹幕引擎，公益弹幕服务器 + 网络弹幕源；
- 适配多平台的[视频播放器](https://github.com/open-ani/mediamp)，Android 底层为 [ExoPlayer](https://github.com/google/ExoPlayer)，PC 底层为 [VLC](https://www.videolan.org/)；
- 多类型数据源适配，内置 [动漫花园](https://share.dmhy.org/)、[Mikan](https://mikanani.me/)，拥有强大的自定义数据源编辑器和自动数据源选择器。
