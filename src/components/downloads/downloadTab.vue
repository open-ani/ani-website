<script lang="ts" setup>
import type { Ref } from 'vue'
import { ref } from 'vue'
import DownloadItem from './downloadItem.vue'

type ReleaseType = 'stable' | 'beta'

// 当前选中的发布类型
const curType: Ref<ReleaseType> = ref<ReleaseType>('stable')

// 切换发布类型
function toType(type: ReleaseType): void {
  if (curType.value !== type) {
    curType.value = type
  }
}
</script>

<template>
  <div class="w-full">
    <div>
      <div class="flex mt-3 item-center">
        <a
          class="tab-btn" :class="[curType === 'stable' ? 'border-b-4 border-blue-400' : '']"
          @click="toType('stable')"
        >
          稳定版本
        </a>
        <a class="tab-btn" :class="[curType === 'beta' ? 'border-b-4 border-blue-400' : '']" @click="toType('beta')">
          测试版本
        </a>
      </div>
      <div class="mt-2 w-full">
        <div class="text-white">
          <DownloadItem v-show="curType === 'stable'" type="stable" />
          <DownloadItem v-show="curType === 'beta'" type="alpha" />
        </div>
      </div>
    </div>
  </div>
</template>
