import { type Component, createSignal, For, onMount, Show } from "solid-js";

interface ReleaseData {
  publishTime: number;
  version: string;
  downloadUrlAlternativesMap: Record<string, string[]>;
  qrcodeUrls?: string[];
}

// Constants
const PLAT_TYPE: Record<string, string> = {
  "android-universal": "安卓 APK",
  "windows-x86_64": "Windows",
  "macos-aarch64": "macOS (M系列芯片)",
  "macos-x86_64": "macOS (Intel 芯片)",
  "linux-x86_64": "Linux AppImage",
  "ios-aarch64": "iOS IPA（自签）",
};

const PLATFORM_ICONS: Record<string, string> = {
  "android-universal": "mgc_android_line",
  "windows-x86_64": "mgc_windows_line",
  "macos-aarch64": "mgc_apple_line",
  "macos-x86_64": "mgc_apple_line",
  "linux-x86_64": "mgc_linux_line",
  "ios-aarch64": "mgc_apple_line",
};

const GUIDANCE_LINK: Record<string, string> = {
  "android-universal": "",
  "windows-x86_64": "",
  "macos-aarch64": "",
  "linux-x86_64": "/wiki/Linux-安装说明",
  "ios-aarch64": "/wiki/iOS-自签",
  "macos-x86_64": "/wiki/macOS-Intel-芯片版本安装教程",
};

const API_BASE = "https://danmaku-cn.myani.org/v1/updates/latest";

const ts2str = (ts: number) => {
  const date = new Date(ts * 1000);
  const y = date.getFullYear().toString();
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const d = date.getDate().toString().padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const ReleaseCard: Component<{
  releaseKey: string;
  data: ReleaseData;
  type: "stable" | "beta";
}> = (props) => {
  const links = () => props.data.downloadUrlAlternativesMap[props.releaseKey] || [];

  return (
    <Show when={links().length > 0}>
      <div class="group flex flex-col md:flex-row md:items-center justify-between p-5 rounded-xl border border-surface-highlight hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-black/20 gap-6">
        <div class="flex items-center gap-5">
          <div class="w-14 h-14 rounded-2xl bg-surface-base flex items-center justify-center border border-surface-highlight text-primary group-hover:scale-105 transition-transform duration-300">
            <i class={`${PLATFORM_ICONS[props.releaseKey] || "mgc_file_line"} text-3xl`}></i>
          </div>
          <div class="flex flex-col">
            <h3 class="text-lg text-text-main leading-tight">{PLAT_TYPE[props.releaseKey] || props.releaseKey}</h3>
            <div class="flex items-center gap-2 text-sm text-text-muted mt-2">
              <span class="px-1.5 py-0.5 rounded text-xs border-surface-highlight border font-mono text-text-dim">
                v{props.data.version}
              </span>
              <Show when={props.type === "beta"}>
                <span class="text-yellow-500 text-xs border border-yellow-500/30 px-1.5 py-0.5 rounded">Beta</span>
              </Show>
            </div>
          </div>
        </div>
        <div class="flex flex-col items-end gap-3 w-full md:w-auto">
          <div class="flex items-center gap-3 w-full md:w-auto justify-end">
            <Show when={GUIDANCE_LINK[props.releaseKey]}>
              <a
                href={GUIDANCE_LINK[props.releaseKey]}
                class="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm text-text-muted hover:text-primary hover:bg-surface-highlight/50 transition-colors"
              >
                <i class="mgc_book_2_line text-lg"></i>
                <span>安装教程</span>
              </a>
            </Show>
            <a
              href={links()[0]}
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-primary text-on-primary transition-all hover:brightness-110 active:scale-95 shadow-sm hover:shadow-md hover:shadow-primary/20"
            >
              <i class="mgc_download_line text-lg"></i>
              <span>下载</span>
            </a>
          </div>
          <Show when={links().length > 1}>
            <div class="flex flex-wrap justify-end gap-2">
              <For each={links().slice(1)}>
                {(link, idx) => (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center gap-2 px-3 py-1.5 text-xs rounded-md text-text-muted hover:text-text-main hover:bg-surface-highlight transition-colors"
                    title={`备用下载链接 ${idx() + 1}`}
                  >
                    <i class="mgc_link_line"></i>
                    <span>备用 {idx() + 1}</span>
                  </a>
                )}
              </For>
            </div>
          </Show>
        </div>
      </div>
    </Show>
  );
};

export default function DownloadList() {
  const [activeTab, setActiveTab] = createSignal<"stable" | "beta">("stable");
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal(false);
  const [stableData, setStableData] = createSignal<ReleaseData | null>(null);
  const [betaData, setBetaData] = createSignal<ReleaseData | null>(null);

  const fetchData = async (type: "stable" | "beta") => {
    try {
      const res = await fetch(`${API_BASE}?releaseClass=${type === "beta" ? "alpha" : "stable"}`, {
        mode: "cors",
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return await res.json();
    } catch (e) {
      console.error(`[DownloadList] Fetch failed for ${type}.`, e);
      throw e;
    }
  };

  const loadAllData = async () => {
    setLoading(true);
    setError(false);
    try {
      const [sData, bData] = await Promise.all([fetchData("stable"), fetchData("beta")]);
      setStableData(sData);
      setBetaData(bData);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  onMount(() => {
    loadAllData();
  });

  const currentData = () => (activeTab() === "stable" ? stableData() : betaData());

  return (
    <div class="max-w-4xl mx-auto min-h-125 relative">
      {/* Tabs */}
      <div class="flex justify-center mb-4">
        <div class="p-1.5 rounded-full border border-surface-highlight inline-flex shadow-lg shadow-black/20">
          <button
            type="button"
            class={`px-8 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
              activeTab() === "stable"
                ? "text-text-main bg-surface-highlight shadow-sm"
                : "text-text-muted hover:text-text-main bg-transparent"
            }`}
            onClick={() => setActiveTab("stable")}
          >
            稳定版本
          </button>
          <button
            type="button"
            class={`px-8 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
              activeTab() === "beta"
                ? "text-text-main bg-surface-highlight shadow-sm"
                : "text-text-muted hover:text-text-main bg-transparent"
            }`}
            onClick={() => setActiveTab("beta")}
          >
            测试版本
          </button>
        </div>
      </div>

      {/* Loading Spinner */}
      <Show when={loading()}>
        <div class="absolute inset-0 z-50 flex flex-col items-center justify-start pt-20 bg-bg-base/50 backdrop-blur-sm transition-opacity duration-300">
          <div class="w-10 h-10 border-4 border-surface-highlight border-t-primary rounded-full animate-spin mb-4"></div>
          <p class="text-text-muted font-medium animate-pulse">正在获取最新版本信息...</p>
        </div>
      </Show>

      {/* Error State */}
      <Show when={error()}>
        <div class="absolute inset-0 z-50 flex flex-col items-center justify-start pt-20 bg-bg-base/50 backdrop-blur-sm transition-opacity duration-300">
          <div class="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4 text-red-500">
            <i class="mgc_alert_line text-3xl"></i>
          </div>
          <h3 class="text-lg font-bold text-text-main mb-2">获取版本信息失败</h3>
          <p class="text-text-muted text-sm mb-6 text-center max-w-xs">
            无法连接到更新服务器，请检查网络连接后重试或前往{" "}
            <a href="https://github.com/open-ani/animeko/releases" class="underline text-primary">
              Github releases
            </a>{" "}
            下载
          </p>
          <button
            type="button"
            onClick={loadAllData}
            class="px-6 py-2.5 rounded-full bg-surface-highlight hover:bg-surface-highlight/80 text-text-main font-medium transition-colors border border-surface-highlight cursor-pointer"
          >
            重试
          </button>
        </div>
      </Show>

      {/* Content Container */}
      <div class={`transition-opacity duration-500 ${loading() ? "opacity-0" : "opacity-100"}`}>
        <Show
          when={!loading() && !error() && currentData()}
          fallback={
            <Show when={!loading() && !error()}>
              <div class="p-8 text-center text-text-muted border border-dashed border-surface-highlight rounded-xl">
                暂无数据
              </div>
            </Show>
          }
        >
          <div class="download-content space-y-4 transition-all duration-300">
            {/* Header Info */}
            <div class="flex items-center justify-center gap-2 mb-6 text-sm text-text-muted">
              <span class="bg-surface-highlight/20 px-3 py-1 rounded-full flex items-center gap-2">
                <i class="mgc_time_line"></i>
                更新时间: {ts2str(currentData()!.publishTime)}
              </span>
            </div>

            {/* Warning for Beta */}
            <Show when={activeTab() === "beta"}>
              <div class="mb-6 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex gap-3 text-yellow-500">
                <i class="mgc_warning_line text-xl shrink-0"></i>
                <p class="text-sm leading-relaxed">Alpha 测试版包含最新功能但可能不稳定。</p>
              </div>
            </Show>

            {/* Grid of Cards */}
            <div class="grid grid-cols-1 gap-4">
              <For each={Object.keys(PLAT_TYPE)}>
                {(key) => <ReleaseCard releaseKey={key} data={currentData()!} type={activeTab()} />}
              </For>
            </div>

            {/* QR Code for Stable (Mobile) */}
            <Show when={activeTab() === "stable" && currentData()!.qrcodeUrls && currentData()!.qrcodeUrls![0]}>
              <div class="mt-8 flex flex-col items-center justify-center">
                <div class="p-4 bg-white rounded-xl shadow-lg transform hover:-translate-y-1 transition-transform duration-300">
                  <img alt="Mobile QR Code" src={currentData()!.qrcodeUrls![0]} class="w-40 h-40 object-contain" />
                </div>
                <span class="mt-3 text-sm text-text-muted flex items-center gap-1.5">
                  <i class="mgc_cellphone_line"></i>
                  手机扫码下载APK
                </span>
              </div>
            </Show>
          </div>
        </Show>
      </div>
    </div>
  );
}
