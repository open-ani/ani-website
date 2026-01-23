/**
 * 下载相关类型定义
 */

// 发布类型
export type ReleaseType = "stable" | "beta";

// 平台类型映射
export const PlatType = {
  "android-universal": "安卓 APK",
  "windows-x86_64": "Windows",
  "macos-aarch64": "macOS (M系列芯片)",
  "macos-x86_64": "macOS (Intel 芯片)",
  "linux-x86_64": "Linux AppImage",
  "ios-aarch64": "iOS IPA（自签）",
} as const;

// 平台键类型
export type PlatformKey = keyof typeof PlatType;

// 下载链接映射类型
export type DownloadUrlMap = Record<PlatformKey, string[]>;

// 获取状态枚举
export enum FetchStatType {
  loading = "loading",
  loaded = "loaded",
  networkErr = "networkErr",
  serviceErr = "serviceErr",
}

// API 响应类型
export interface ApiResponse {
  version: string;
  downloadUrlAlternativesMap: DownloadUrlMap;
  publishTime: number;
  qrcodeUrls: string[];
}

// 组件内部使用的响应类型
export interface FetchRespType {
  version: string;
  downloadUrlAlternativesMap: DownloadUrlMap;
  publishTime: number;
  qrcodeUrls: [string, string]; // 固定两个二维码URL
}

// 安装指导链接映射类型
export type GuidanceLinkMap = Record<PlatformKey, string>;

// 下载项组件属性类型
export interface DownloadItemProps {
  type: ReleaseType;
}
