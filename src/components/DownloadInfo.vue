<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { onMounted, type Ref, ref } from 'vue'

// 0 -> loading, 1 -> loaded, 2 -> network Err, 3 -> serverSide Err

const props = defineProps(['type'])
const loaded = ref(0)
const isPC = ref(true)
const showQR = ref(false)

interface responseType {
  version: string
  downloadUrlAlternativesMap: {
    'macos-aarch64': string[]
    'windows-x86_64': string[]
    'android-universal': string[]
  }
  publishTime: number
  qrcodeUrls: string[]
}

const nameMap = ref({
  'macos-aarch64': 'macOS aarch64',
  'windows-x86_64': 'Windows X86_64',
  'android-universal': '安卓 APK',
})

const outputs: Ref<responseType | undefined> = ref()

async function checkStatus() {
  const response = await fetch('https://danmaku-cn.myani.org/status', { mode: 'cors' })
  return response.status === 200
}

onMounted(() => {
  checkStatus().then(async (s) => {
    if (!s) {
      loaded.value = 3
      return
    }
    // console.log('Server is running')
    const api_link = `https://danmaku-cn.myani.org/v1/updates/latest?releaseClass=${props.type === 'stable' ? 'stable' : 'beta'}`
    try {
      const response = await fetch(api_link, { mode: 'cors' })
      const response_json: responseType = await response.json()
      outputs.value = response_json
      loaded.value = 1
    }
    catch {
      loaded.value = 2
    }
    const userAgent = navigator.userAgent
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
    if (mobileRegex.test(userAgent))
      isPC.value = false
  })
})
</script>

<template>
  <ul v-if="loaded === 1 && outputs" class="py-3">
    <li v-for="(k, v) in nameMap" :key="v" aria-label="win" class="p-4 flex">
      <div class="w-full flex">
        <svg class="w-12 h-12 p-1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <g fill="none">
            <path
              d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
            />
            <path
              fill="currentColor"
              d="M8 5v2H5v13h14V7h-3V5h3a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm4-3a1 1 0 0 1 1 1v10.828L14.828 12a1 1 0 1 1 1.415 1.414l-3.36 3.359a1.25 1.25 0 0 1-1.767 0l-3.359-3.359A1 1 0 1 1 9.172 12L11 13.828V3a1 1 0 0 1 1-1"
            />
          </g>
        </svg>
        <div class="ml-2 w-fit flex flex-col">
          <p class="font-bold">
            {{ k }}
          </p>
          <small>v{{ outputs.version }}</small>
        </div>
      </div>
      <div class="space-x-2 flex text-nowrap my-auto w-fit float-end">
        <a
          :href="outputs.downloadUrlAlternativesMap[v][0]"
          class="hover:bg-slate-600 border-2 border-white rounded px-3 py-2 text-sm text-slate-300"
        >主线</a>
        <a
          :href="outputs.downloadUrlAlternativesMap[v][1]"
          class="hover:bg-slate-600 border-2 border-white rounded px-3 py-2 text-sm text-slate-300"
        >备线</a>
        <button
          v-if="v === 'android-universal' && isPC"
          class="hover:bg-slate-600 border-2 border-white rounded px-3 py-2 text-sm text-slate-300"
          @click="showQR = !showQR"
        >
          扫码下载
        </button>
      </div>
      <!-- TODO: sort to pin the correct device type -->
    </li>
    <div v-show="isPC" class="px-4 flex flex-row-reverse items-center">
      <hr class="my-3">
      <table v-show="showQR" class="w-[300px]">
        <thead>
          <tr>
            <th>Cloudflare 下载（推荐）</th>
            <th>GithubProxy 下载</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><img class="w-28 mx-4" alt="QRcode for downloading ani" :src="outputs.qrcodeUrls[0]"></td>
            <td><img class="w-28 mx-4" alt="QRcode for downloading ani" :src="outputs.qrcodeUrls[2]"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </ul>
  <div v-else class="w-2/3 xl:w-1/2 p-6 border-2 border-white rounded">
    <div v-if="loaded === 0" class="flex justify-center items-center space-x-3">
      <b class="h-fit text-xl font-medium">资源加载中...</b>
    </div>
    <div v-else class="flex justify-center items-center space-x-3">
      <Icon icon="mdi:error-outline" class="w-10 h-10" />
      <b class="h-fit text-xl font-medium"> {{
        loaded === 3 ? "服务器故障，请等候服务恢复" : "资源加载失败，请刷新重试"
      }}或前往<a href="https://github.com/open-ani/ani/releases" class=" text-blue-600">Github Releases</a>下载 😭</b>
    </div>
  </div>
</template>

<style scoped>
table {
  table-layout: fixed;
  border-collapse: collapse;
  border: 1px solid white;
}

thead th:nth-child(1)
thead th:nth-child(2) {
  width: 50%;
}

th,
td {
  border: 1px solid white;
  padding: 8px;
}
</style>
