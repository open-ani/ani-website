---
title: "Windows 下字体与背景颜色异常"
order: 2
authors:
  - StageGuard
---
## 字体与背景颜色渲染异常

![image](/images/win-font-1.png)

造成此现象可能是 Windows 双显卡的问题，通常出现在同时有 **集成显卡** 和 **独立显卡** 的笔记本电脑。

### 解决方案

1. 打开 Windows 设置，依次点击 **系统设置** -> **显示** -> **显卡设置**
  ![image](/images/win-font-2.png)
2. 选择 **桌面应用** 并点击 **浏览**，找到 **Animkeo.exe** 添加。
3. 点击 **Animeko.exe** 选项，选择 **集成显卡**(省电)，保存。
  ![image](/images/win-font-3.png)
4. 重新打开 `Animeko`
