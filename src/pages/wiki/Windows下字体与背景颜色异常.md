---
layout: ../../layouts/Post.astro
title: "Windows 下字体与背景颜色异常"
---

# Windows 下字体与背景颜色异常

## 字体与背景颜色渲染异常

<img width="648" alt="image" src="https://s2.loli.net/2024/07/26/2pmUT4W3kuaPjg1.png">

造成此现象可能是 Windows 双显卡的问题，通常出现在同时有 **集成显卡** 和 **独立显卡** 的笔记本电脑。

### 解决方案

1. 打开 Windows 设置，依次点击 **系统设置** -> **显示** -> **显卡设置**

<img width="648" alt="image" src="https://s2.loli.net/2024/07/26/p9kJgoCTHdNbmR1.png">

2. 选择 **桌面应用** 并点击 **浏览**，找到 **Ani.exe** 添加。

3. 点击 **Ani.exe** 选项，选择 **集成显卡**(省电)，保存。

<img width="648" alt="image" src="https://s2.loli.net/2024/07/26/WcY5GnH4QvChgla.png">

4. 重新打开 `Ani`

