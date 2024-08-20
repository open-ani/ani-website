<script setup lang="ts">
import DownloadInfo from './DownloadInfo.vue'

defineProps(['type'])
</script>

<template>
  <div class="w-full">
    <div>
      <div class="flex mt-3 item-center">
        <a href="/downloads/stable" class="flex items-center text-white h-[50px] px-2 bg-grey-100" :class="[type === 'stable' ? 'border-b-4 border-blue-400' : '']">稳定版本</a>
        <a href="/downloads/beta" class="flex items-center text-white h-[50px] px-2 bg-grey-100" :class="[type === 'beta' ? 'border-b-4 border-blue-400' : '']">Beta（测试版）</a>
      </div>

      <div class="mt-2 w-full">
        <div class="text-white">
          <DownloadInfo :type="type" />
        </div>
      </div>
    </div>
  </div>
</template>
