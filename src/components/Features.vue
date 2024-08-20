<script setup lang="ts">
import FeatureCard from './FeatureCard.vue'
</script>

<template>
  <div class="flex flex-col w-full items-center justify-center space-y-5">
    <h2 class="text-4xl font-bold">
      Ani 有什么亮点
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 w-full md:w-3/5">
      <FeatureCard title="弹幕及弹幕云过滤" desc="Ani 从弹弹play, 其他弹幕网站, 以及 Ani 弹幕服务获取弹幕，你也可以发送弹幕到 Ani 的公益弹幕服务器，AI 团队将逐渐推进弹幕云过滤功能。">
        <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002" /></svg>
      </FeatureCard>
      <FeatureCard title="使用 bangumi 管理追番进度" desc="只要有一个 bangumi 账号，你就可以通过 Ani 一站式地管理追番的进度，标注想看/再看/看过的番剧，以及和网友们讨论剧集。当然，你也可以以游客的身份体验大部分功能。">
        <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none"><path stroke="currentColor" stroke-width="1.5" d="M22 16c0 2.828 0 4.243-.879 5.121C20.243 22 18.828 22 16 22H8c-2.828 0-4.243 0-5.121-.879C2 20.243 2 18.828 2 16v-4c0-2.828 0-4.243.879-5.121C3.757 6 5.172 6 8 6h8c2.828 0 4.243 0 5.121.879C22 7.757 22 9.172 22 12z" /><path stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="m9 2l3 3.5L15 2" opacity="0.5" /><path stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M16 6v16" /><path fill="currentColor" d="M20 16a1 1 0 1 0-2 0a1 1 0 0 0 2 0m0-4a1 1 0 1 0-2 0a1 1 0 0 0 2 0" opacity="0.5" /></g></svg>
      </FeatureCard>
      <FeatureCard title="代码开源" desc="开放源代码, 公开自动构建, 无资料泄露风险，可 PR 添加自己喜欢的功能。">
        <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12h7c-.53 4.11-3.28 7.78-7 8.92zH5V6.3l7-3.11M12 1L3 5v6c0 5.55 3.84 10.73 9 12c5.16-1.27 9-6.45 9-12V5z" /></svg>
      </FeatureCard>
      <FeatureCard title="BT + 在线源播放" desc="全自动整合多个 BT 数据源与在线数据源, 兼顾资源质量与缓冲速度，支持 emby 和 jellyfin 源，享受你的本地追番体验~">
        <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M21.984 10c-.037-1.311-.161-2.147-.581-2.86c-.598-1.015-1.674-1.58-3.825-2.708l-2-1.05C13.822 2.461 12.944 2 12 2s-1.822.46-3.578 1.382l-2 1.05C4.271 5.56 3.195 6.125 2.597 7.14C2 8.154 2 9.417 2 11.942v.117c0 2.524 0 3.787.597 4.801c.598 1.015 1.674 1.58 3.825 2.709l2 1.049C10.178 21.539 11.056 22 12 22s1.822-.46 3.578-1.382l2-1.05c2.151-1.129 3.227-1.693 3.825-2.708c.42-.713.544-1.549.581-2.86M21 7.5l-4 2M12 12L3 7.5m9 4.5v9.5m0-9.5l4.5-2.25l.5-.25m0 0V13m0-3.5l-9.5-5" /></svg>
      </FeatureCard>
    </div>
  </div>
</template>
