<script setup lang="ts">
import Buttons from './Buttons.vue'
import HeaderShowCase from './HeaderShowCase.vue'
</script>

<template>
  <div class="flex w-full flex-col-reverse xl:flex-row justify-center mb-24">
    <div class="flex justify-center items-center flex-col relative">
      <p><span class="text-[2rem] xl:text-[2.8rem] font-bold w-full">Ani</span><span class="text-[1.3rem]">：<b>一站式</b>在线<b class="underline">弹幕</b>追番平台</span></p>
      <ul class="list-none space-y-0.5 max-w-[320px] my-2">
        <li>📦 在线多数据源聚合</li>
        <li>⛔ 离线缓存支持</li>
        <li>🚩 Bangumi 收藏同步</li>
        <li>✨ <a href="https://github.com/open-ani/ani" class="text-blue-500 underline">代码开源</a>，更多功能等你来PR！</li>
        <li>🧲 全自动 BT，无需下载其他客户端</li>
        <li>🤩 Compose Multiplatform 多平台客户端支持</li>
      </ul>
      <Buttons />
    </div>
    <div class="xl:float-right w-full xl:w-fit flex justify-center scale-[85%] xl:scale-100">
      <HeaderShowCase />
    </div>
  </div>
</template>
