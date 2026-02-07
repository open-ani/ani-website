---
layout: ../../layouts/Doc.astro
title: "iOS 安装教程 (自签名)"
---

# iOS 安装教程

在 iOS 设备上安装 Animeko 需要使用“侧载”（Sideload）工具。本教程将详细介绍两种安装方案：**Sideloadly** 和 **AltStore**。

这两种方法均利用了 Apple 提供的开发者签名功能。对于未成为 Apple Developer Program 会员的用户，存在以下限制：

- 应用签名有效期为 7 天，到期后需重新续签，否则应用将无法打开。
- 单个 Apple ID 最多同时安装 3 个侧载应用。

## 准备工作

无论选择哪种方法，在开始前请确保做好以下准备：

- **硬件**：一台 macOS 或 Windows 电脑、一台 iPhone 或 iPad，请使用一根稳定的数据线，否则可能无法正确连接设备。
- **账号**：一个使用邮箱注册的 [Apple ID](https://support.apple.com/zh-cn/apple-account)。
- **安装包**：Animeko 的 IPA 文件（下载地址：[GitHub Release](https://github.com/open-ani/animeko/releases/latest) 或 [分流地址](https://myani.org/downloads)）。
- 对于 Windows 用户，必须安装 [iTunes](https://www.apple.com.cn/itunes/)。

> [!IMPORTANT]
> iTunes 需要为非 Microsoft Store 版本，如果安装了 Microsoft Store 版本，请卸载并从官网下载。

## 方法一：使用 Sideloadly 安装

### 1. 下载工具

请根据你的操作系统下载 [Sideloadly](https://sideloadly.io/#download)。

> [!TIP]
> **Windows 用户提示**：通常请下载 64 位版本。如果不确定系统类型，可按 `Win` + `R`，输入 `msinfo32`，在“系统类型”中查看。

### 2. 安装 IPA

![sideloadly.png](https://free.picui.cn/free/2026/01/22/697224c1b2c95.png)

1. 打开 Sideloadly，在 `Apple ID` 栏输入你的 Apple 账号邮箱。

2. 连接设备，使用数据线将 iOS 设备连接至电脑。
   - 手机上若弹出“要信任此电脑吗？”，请点击**信任**并输入锁屏密码。
   - 连接成功后，你的设备名称将出现在 `iDevice` 栏中。

3. 点击左侧的 IPA 图标，选择已下载的 Animeko IPA 文件，点击 `Start` 按钮开始安装。
    > [!TIP]
    > `Start` 按钮左侧的“刷新图标”建议保持开启状态（默认即开启）。这允许设备在同一 Wi-Fi 环境下每 7 天自动续签。

    ![ready.png](https://free.picui.cn/free/2026/01/22/697225d66f994.png)

4. 首次使用时，需输入 Apple ID 密码。若开启了双重认证，请在弹窗中输入手机收到的 6 位验证码。

5. 等待进度条跑完，当显示 `Done.` 时即表示安装成功。

   ![done.png](https://free.picui.cn/free/2026/01/22/6972260219689.png)

## 方法二：使用 AltStore 安装

### 1. 环境配置（仅 Windows 用户）

Windows 用户除 iTunes 外，还需安装 [iCloud for Windows](https://support.apple.com/zh-cn/103232)。
> [!IMPORTANT]
> 与 iTunes 一样，iCloud 也必须使用**非 Microsoft Store 版本**。如果安装了 Microsoft Store 版本，请卸载并从官网下载。

### 2. 安装 AltServer（电脑端）

- **下载**：
  - macOS: [altserver.zip](https://cdn.altstore.io/file/altstore/altserver.zip) (解压后将 `AltServer.app` 拖入 `/Applications`)。
  - Windows: [altinstaller.zip](https://cdn.altstore.io/file/altstore/altinstaller.zip) (解压并运行 `Setup.exe`)。
- **运行**：
  - macOS: 启动后图标位于**菜单栏**。
  - Windows: 请**以管理员身份运行**，图标位于**系统托盘**。

### 3. 连接与同步设置

1. 连接 iOS 设备至电脑，解锁并选择“信任此电脑”。
2. **开启 Wi-Fi 同步**（自动续签需要）：
    - **macOS**：打开访达，在侧边栏选择设备 -> 勾选「在 Wi-Fi 下显示此 iPhone/iPad」。
    - **Windows**：打开 iTunes 点击设备图标 -> 摘要 -> 勾选「通过 Wi-Fi 与此 iPhone/iPad 同步」。

### 4. 安装 AltStore 到手机

1. 点击电脑端的 AltServer 图标，选择 *“Install AltStore”* -> 选择你的设备。
2. 输入 Apple ID 和密码。
3. 等待数秒，直到电脑弹出通知“AltStore 已安装到设备”。
    > [!TIP]
    > 如果手机桌面未出现图标，请尝试重启设备。

### 5. 开启开发者模式（iOS 16+）

如果是 iOS 16 及以上系统，必须启用开发者模式才能运行侧载应用：

- 前往 `设置` -> `隐私与安全性` -> 拉到底部找到 `开发者模式` -> **开启**。
- 按提示重启设备并确认开启。

### 6. 安装 Animeko

确保 AltServer 在电脑上运行，且手机与电脑在同一 Wi-Fi 下（推荐连接数据线以提高稳定性）。

#### 方式 A：通过电脑端 AltServer 安装

按住电脑键盘的 **Option** (macOS) 或 **Shift** (Windows) 键，点击 AltServer 图标，选择 **“Sideload .ipa...”**，选中 Animeko IPA 文件并输入账号密码即可。

#### 方式 B：通过手机端 AltStore 安装

- **直接安装文件**：
  1. 将 IPA 文件发送到手机（如通过 AirDrop 或 文件App）。
  2. 打开 AltStore，切换到 **My Apps** 标签页。
  3. 点击左上角 **“+”**，选择 IPA 文件进行安装。

- **通过源安装（更新更方便）**：
  1. 打开 AltStore，切换到 **Sources** 标签页，点击右上角 **“+”**。
  2. 添加源地址：`https://raw.githubusercontent.com/maxchang3/ani-altstore-source/main/generated/apps.json`
  3. 添加后点击 **OpenAni** 源，找到 Animeko 点击安装。

### 进阶工具推荐

- **[SideStore](https://sidestore.app/)**：AltStore 的分支，支持无电脑续签，但安装相对复杂，适合进阶用户。
- **[LiveContainer](https://github.com/LiveContainer/LiveContainer)**：无需安装即可运行 IPA，可通过内置 SideStore 版本扩展功能。

## 常见问题：不受信任的开发者

首次启动 Animeko 时，可能会提示`不受信任的开发者`。

**解决方法**：

1. 打开 iOS `设置` -> `通用`。
2. 向下滑动选择 `VPN 与设备管理`（旧版本系统可能显示为“描述文件与设备管理”）。
3. 在 `开发者 APP` 下方点击你的 Apple ID。
4. 点击 **“信任 [你的邮箱]”** 并确认。

现在，你可以正常打开 Animeko 了。
