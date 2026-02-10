---
title: "macOS 无法打开解决方案"
order: 3
authors:
  - MisakaTAT
  - Him188
---
## 未打开 “Ani”

![image](/images/macos-security.png)

### 解决方案

#### 方案1

1. 按 `command + 空格` 并输入 `terminal` 后回车
2. 在打开的页面中，输入以下命令并回车

   ```shell
   sudo xattr -d com.apple.quarantine /Applications/Ani.app
   ```

3. 输入电脑的锁屏密码并回车
4. 重新打开 `Ani`

#### 方案2

1. 打开 `系统设置`
1. 左侧栏找到 `隐私与安全` 项
1. 安全性设置点击 `仍要打开`
1. 输入电脑的锁屏密码

![image](/images/macos-xattr.png)
![image](/images/macos-open.png)
