---
layout: ../../layouts/Post.astro
title: "macOS 无法打开解决方案"
---

# macOS 无法打开解决方案

## 未打开 “Animeko”

<img width="252" alt="image" src="https://s2.loli.net/2024/07/26/Le1l2BQj9bpixdw.png">

### 解决方案

#### 方案1

1. 按 `command + 空格` 并输入 `terminal` 后回车
2. 在打开的页面中，输入以下命令并回车
   ```shell
   sudo xattr -d com.apple.quarantine /Applications/Animeko.app
   ```
3. 输入电脑的锁屏密码并回车
4. 重新打开 `Animeko`

#### 方案2

1. 打开 `系统设置`
1. 左侧栏找到 `隐私与安全` 项
1. 安全性设置点击 `仍要打开`
1. 输入电脑的锁屏密码

<img width="700" alt="image" src="https://s2.loli.net/2024/07/26/Mxcae5fBQkLb36E.png">
<img width="250" alt="image" src="https://s2.loli.net/2024/07/26/TA6UbGqWQwcaHuX.png">
