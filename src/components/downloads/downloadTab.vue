<script lang="ts" setup>
import { ref } from 'vue'
import DownloadItem from './downloadItem.vue'

type ReleaseType = 'stable' | 'beta'

const curType = ref<ReleaseType>('stable')

function toType(type: ReleaseType) {
  if (curType.value !== type)
    curType.value = type
  // // eslint-disable-next-line no-alert
  // alert(`Already on the ${curType.value} release tab!`)
}
</script>

<template>
  <div class="w-full">
    <div>
      <div class="flex mt-3 item-center">
        <a
          class="flex items-center text-white h-[50px] px-2 bg-grey-100"
          :class="[curType === 'stable' ? 'border-b-4 border-blue-400' : '']"
          role="button" @click="toType('stable')"
        >
          稳定版本
        </a>
        <a
          class="flex items-center text-white h-[50px] px-2 bg-grey-100"
          :class="[curType === 'beta' ? 'border-b-4 border-blue-400' : '']"
          role="button" @click="toType('beta')"
        >
          测试版本
        </a>
      </div>
      <div class="mt-2 w-full">
        <div class="text-white">
          <DownloadItem v-show="curType === 'stable'" type="stable" />
          <DownloadItem v-show="curType === 'beta'" type="beta" />
        </div>
      </div>
    </div>
  </div>
</template>
