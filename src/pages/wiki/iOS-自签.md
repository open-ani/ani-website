---
layout: ../../layouts/Post.astro
title: "iOS 安装教程"
---

# iOS 安装教程

### 准备事项

- 对应架构的 [Sideloadly](https://sideloadly.io/#download) (通常为 64 bit)
>[!TIP]
>同时按下 `Win` + `R` ，输入 `msinfo32` ，在系统类型一栏即可查询到您的电脑是 64 bit 还是 32 bit

- 使用邮箱注册的 [Apple 账户](https://support.apple.com/zh-cn/apple-account)

- Animeko IPA 安装包
>从[Github Release](https://github.com/open-ani/animeko/releases/latest)或[分流地址](https://myani.org/downloads)下载

- Windows 用户需要额外下载 [iTunes](https://www.apple.com.cn/itunes/)

> [!IMPORTANT]
> 
> iTunes 需要为非 Microsoft Store 版本，如果安装了 Microsoft Store 版本，请卸载并从官网下载

### 安装

逐一安装上述软件并重启电脑，准备好 Apple 账户 后就可以开始了。

1. 启动 Sideloadly。

![sideloadly.png](https://youke1.picui.cn/s1/2025/10/25/68fcd8dc853dc.png)

2. 在 `Apple ID` 一栏中输入你的 Apple 账户 邮箱。

3. 连接设备

使用一条稳定的数据线将设备连接至电脑。如无意外，你将会在 `iDevice` 一栏中看到你的设备名称。在设备上信任这部电脑并输入你的锁屏密码。

4. 安装至设备

点击 IPA 图标，在窗口中选择你下载的 IPA 文件。选择好后如图所示，确认无误后点击 `Start`。

![ready.png](https://youke1.picui.cn/s1/2025/10/25/68fcd8dc7353c.png)

> [!TIP]
> `Start` 按钮左边的刷新按钮应该是默认启用的。启用后，在同一网络环境下，每 7 天会自动续签，推荐开启。

第一次使用会需要你输入 Apple 账户 密码，输入后点击 OK。

之后可能手机会跳出需要双重认证，点击允许并在电脑输入验证码就好了。

安装完成后，Sideloadly 会显示 `Done.`

![done.png](https://youke1.picui.cn/s1/2025/10/25/68fcd8dcab59d.png)

### 不受信任的开发者

安装后直接打开 Animeko 可能会失败，并提示不受信任的开发者。

解决方法：

1. 找到 `设置` - `通用`。

2. 滑动至底部，点击 `VPN 与设备管理`。

3. 滑动至底部，找到 `开发者 APP` 并点击。

4. 点击信任即可。
