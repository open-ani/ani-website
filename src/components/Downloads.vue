<template>
    <div class="w-full">
        <div>
            <div class="flex mt-3 item-center">
                <a href="/downloads/stable" :class="['flex items-center text-white h-[50px] px-2 bg-grey-100',type=='stable'?'border-b-4 border-blue-400':'']">稳定版本</a>
                <a href="/downloads/beta" :class="['flex items-center text-white h-[50px] px-2 bg-grey-100',type=='beta'?'border-b-4 border-blue-400':'']">Beta（测试版）</a>
            </div>

            <div class="mt-2 w-full">
                <div class="rounded-sm text-white p-3">
                    <DownloadInfo :type="type" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import DownloadInfo from './DownloadInfo.vue';
const props = defineProps(['type'])
</script>