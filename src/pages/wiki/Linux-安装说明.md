---
layout: ../../layouts/Doc.astro
title: "Linux 安装说明"
---

# Linux 安装说明

## 安装依赖

### Arch Linux

1. 安装 [VLC](https://www.videolan.org/vlc/#download)

  ```bash
  sudo pacman -S --needed vlc
  ```

  或者参阅 <https://wiki.archlinux.org/title/VLC_media_player#Installation>
2. [安装 GVFS](https://wiki.archlinux.org/title/Java#Java_applications_cannot_open_external_links)

### Ubuntu

1. 安装图形库 `mesa-utils`

  ```bash
  sudo apt-get install mesa-utils
  ```

2. 安装 [VLC](https://www.videolan.org/vlc/#download)

  ```bash
  sudo apt-get install vlc
  ```

  注意: 使用 Snappy 安装可能会没有效果，建议使用 Aptitude。
3. 安装 `gvfs-libs`，用于打开浏览器登录

  ```bash
  sudo apt-get install gvfs-libs
  ```

## 启动 Animeko

初次启动可能需要设置权限：

```bash
chmod a+x ./ani<tab 补全>
```

然后双击启动，或者使用命令行：

```bash
./ani<tab 补全>
```
