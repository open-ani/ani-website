---
layout: ../layouts/Post.astro
title: "Changelogs"
---

[![GitHub Release](https://img.shields.io/github/v/release/open-ani/animeko?sort=semver&display_name=tag&style=flat-square)](https://github.com/open-ani/animeko/releases/latest)

> 本页面仅展示 v4.x.x 版本的更新日志, 且不包括 Beta 与 Pre-release 版本.

## [v4.6.0](https://github.com/open-ani/animeko/releases/tag/v4.6.0) (2025-03-13)

- 新增简单模式数据源选择
- 优化资源匹配准确率

## [v4.5.1](https://github.com/open-ani/animeko/releases/tag/v4.5.1) (2025-03-02)

- 修复安卓小窗模式的布局问题
- 修复 Windows 全屏时可能有白边的问题
- 修复安卓上无法用第三方 APP 打开 Ani 的问题

## [v4.5.0](https://github.com/open-ani/animeko/releases/tag/v4.5.0) (2025-03-01)

- 更优雅的动画效果
- Windows 沉浸标题栏
- Windows 支持动态主题
- 增加新用户欢迎向导页
- 优化网络连接稳定性
- 修复 Windows 使用快捷方式启动时无法自动更新 APP

## [v4.4.3](https://github.com/open-ani/animeko/releases/tag/v4.4.3) (2025-02-20)

- 修复数据源选择框闪烁

## [v4.4.2](https://github.com/open-ani/animeko/releases/tag/v4.4.2) (2025-02-14)

- 修复剧集评论无法显示
- 修复自定义代理设置无效

## [v4.4.1](https://github.com/open-ani/animeko/releases/tag/v4.4.1) (2025-01-30)

- 修复 Android 不显示弹幕

## [v4.4.0](https://github.com/open-ani/animeko/releases/tag/v4.4.0) (2025-01-30)

- 新增新番时间表
- 新增更多主题设置 by [@WoLeo-Z](https://github.com/WoLeo-Z)
- 优化资源排序逻辑
- 增加 Monochrome 图标 by [@WoLeo-Z](https://github.com/WoLeo-Z)
- 优化 Jellyfin / Emby 支持 by [@he0119](https://github.com/he0119)

## [v4.3.3](https://github.com/open-ani/animeko/releases/tag/v4.3.3) (2025-01-27)

- 接入新版弹弹play 接口，修复弹幕无法获取的问题

## [v4.3.2](https://github.com/open-ani/animeko/releases/tag/v4.3.2) (2025-01-27)

- 接入新版弹弹play 接口，修复弹幕无法获取的问题

## [v4.3.1](https://github.com/open-ani/animeko/releases/tag/v4.3.1) (2025-01-19)

- 独立系统代理设置 (自动检测)
- 禁用弹幕时显示提示
- 修复播放器选集问题

## [v4.3.0](https://github.com/open-ani/animeko/releases/tag/v4.3.0) (2025-01-15)

- 为桌面端添加水平滚动列表的按钮
- 安卓端支持发送剧集评论
- 支持修改 BT 分享率设置
- 为 Jellyfin 添加 Movie 类型和字幕的支持 by [@he0119](https://github.com/he0119)
- 优化播放器功能稳定性
- 优化一些界面细节 by [@WoLeo-Z](https://github.com/WoLeo-Z)
- 优化网络连通性
- 优化资源匹配准确性

## [v4.2.1](https://github.com/open-ani/animeko/releases/tag/v4.2.1) (2025-01-03)

- 修复条目数据可能没有刷新的问题
- 修复部分服务没有遵循代理设置的问题
- 修复 BT 下载可能没有速度的问题

## [v4.2.0](https://github.com/open-ani/animeko/releases/tag/v4.2.0) (2025-01-02)

- 优化数据源查询速度
- 优化资源匹配准确性
- 增加一键重新查询所有数据源
- PC 支持同步系统深色模式设置
- 搜索时支持自动补全
- 自动更新时校验文件完整性, 避免自毁

## [v4.1.0](https://github.com/open-ani/animeko/releases/tag/v4.1.0) (2024-12-21)

- 显著优化资源查询速度与准确性
- 校正新番连载时间 ("继续观看"栏目)
- 优化 BT 下载速度
- 播放器右上角添加一键快进 85 秒功能 (跳过 OP/ED)
- 增加内置 BT peer 屏蔽规则
- 增加 NSFW 条目过滤设置
- 支持删除搜索记录

## [v4.0.2](https://github.com/open-ani/animeko/releases/tag/v4.0.2) (2024-12-15)

- 修复剧集列表排序错误
- 优化数据源订阅的更新稳定性

## [v4.0.1](https://github.com/open-ani/animeko/releases/tag/v4.0.1) (2024-12-02)

- 修复一些番剧的数据源解析问题

## [v4.0.0](https://github.com/open-ani/animeko/releases/tag/v4.0.0) (2024-11-21)

Ani 更名为 Animeko, 并继续使用 Ani 作为简称

- 全新界面设计
- "首页"更名为"探索", 增加"最高热度"排行榜和便捷"继续观看"栏目
- 优化追番列表的加载速度
- Android 上独立运行 BT 引擎, 保持后台下载
- 优化许多播放器细节
