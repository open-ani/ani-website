<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { onMounted, ref } from 'vue'

const props = withDefaults(defineProps<DownloadItemProps>(), { type: 'stable' })
interface DownloadItemProps {
  type: 'stable' | 'beta'
}
enum FetchStatType {
  loading,
  loaded,
  networkErr,
  serviceErr,
}
const PlatType = {
  'android-universal': '安卓 APK',
  'windows-x86_64': 'Windows',
  'macos-aarch64': 'macOS (M系列芯片)',
  'macos-x86_64': 'macOS (Intel 芯片)',
  'linux-x86_64': 'Linux AppImage',
  'ios-aarch64': 'iOS IPA（自签）',
} as const
type PlatKey = keyof typeof PlatType
const releaseList = Object.entries(PlatType).map(([key]) => key as PlatKey)
interface FetchRespType {
  version: string
  downloadUrlAlternativesMap: Record<keyof typeof PlatType, Array<string>>
  publishTime: number
  QRcodeUrls: string[]
}

const fetchStat = ref<FetchStatType>(FetchStatType.loading)
const isPC = ref<boolean>(true)
const showQr = ref<boolean>(false)
const fetchResp = ref<FetchRespType>()

const guidanceLink: Record<keyof typeof PlatType, string> = {
  'android-universal': '',
  'windows-x86_64': '',
  'macos-aarch64': '',
  'linux-x86_64': '/wiki/Linux-%E5%AE%89%E8%A3%85%E8%AF%B4%E6%98%8E',
  'ios-aarch64': '/wiki/iOS-%E8%87%AA%E7%AD%BE',
  'macos-x86_64': '/wiki/macOS-Intel-%E8%8A%AF%E7%89%87%E7%89%88%E6%9C%AC%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B',
}

async function checkStat(): Promise<boolean> {
  try {
    const resp = await fetch('https://danmaku-cn.myani.org/status', { mode: 'cors' })
    return resp.status === 200
  }
  catch (error) {
    console.error(error)
    return false
  }
}

function checkIsPc(): void {
  isPC.value = !/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
}

async function getRemoteRelease(): Promise<void> {
  fetchStat.value = FetchStatType.loading
  const link = new URL('https://danmaku-cn.myani.org/v1/updates/latest')
  link.search = new URLSearchParams({ releaseClass: props.type }).toString()
  try {
    const resp = await fetch(link, {
      mode: 'cors',
    }).then(r => r.json())
    fetchResp.value = {
      version: resp.version,
      downloadUrlAlternativesMap: {
        'android-universal': resp.downloadUrlAlternativesMap['android-universal'],
        'windows-x86_64': resp.downloadUrlAlternativesMap['windows-x86_64'],
        'macos-aarch64': resp.downloadUrlAlternativesMap['macos-aarch64'],
        'macos-x86_64': resp.downloadUrlAlternativesMap['macos-x86_64'],
        'linux-x86_64': resp.downloadUrlAlternativesMap['linux-x86_64'],
        'ios-aarch64': resp.downloadUrlAlternativesMap['ios-aarch64'],
      },
      QRcodeUrls: [resp.QRcodeUrls[0], resp.QRcodeUrls[1]],
      publishTime: resp.publishTime,
    }
    fetchStat.value = FetchStatType.loaded
  }
  catch (error) {
    console.error(error)
    fetchStat.value = FetchStatType.networkErr
  }
}

function ts2str(ts: number): string {
  const date = new Date(ts * 1000)
  const y = date.getFullYear().toString()
  const m = (date.getMonth() + 1).toString().padStart(2, '0')
  const d = date.getDate().toString().padStart(2, '0')
  return `${y}-${m}-${d}`
}

onMounted(async () => {
  checkIsPc()
  const stat = await checkStat()
  if (!stat) {
    fetchStat.value = FetchStatType.serviceErr
    return
  }
  await getRemoteRelease()
})
</script>

<template>
  <ul v-if="fetchStat === FetchStatType.loaded && fetchResp !== undefined">
    <li class="flex justify-between items-center">
      <span class="font-bold">
        更新时间：{{ ts2str(fetchResp.publishTime) }}
      </span>
      <button class="btn cursor-pointer" @click="getRemoteRelease()">
        刷新
      </button>
    </li>
    <li v-for="release in releaseList" :key="release" class="py-4 flex">
      <div class="w-full flex items-center flex-wrap pr-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="80px" height="80px" viewBox="0 0 24 24" class="w-12 h-12 p-1">
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
        <div class="ml-2">
          <p class="font-bold">
            {{ PlatType[release] }}
          </p>
          <small>v{{ fetchResp.version }}</small>
        </div>
      </div>
      <div class="space-x-2 flex text-nowrap my-auto w-fit float-end">
        <a v-for="(link, idx) in fetchResp.downloadUrlAlternativesMap[release]" :key="idx" :href="link" class="btn">
          {{ idx === 0 ? '主线' : '备线' }}
        </a>
        <button v-if="release === 'android-universal' && isPC" class="btn" @click="showQr = !showQr">
          扫码下载
        </button>
        <a v-if="guidanceLink[release]" class="btn" :href="guidanceLink[release]">
          安装教程
        </a>
      </div>
    </li>
    <li v-show="isPC && showQr" class="px-4 flex flex-row-reverse items-center gap-1">
      <div class="flex flex-col">
        <span class="font-bold">Cloudflare 下载（推荐）</span>
        <img class="w-28 m-4" alt="QRcode for downloading ani" :src="fetchResp.QRcodeUrls[0]">
      </div>
      <div class="flex flex-col">
        <span class="font-bold">GithubProxy 下载</span>
        <img class="w-28 m-4" alt="QRcode for downloading ani" :src="fetchResp.QRcodeUrls[1]">
      </div>
    </li>
  </ul>
  <div v-else class="w-full sm:w-1/2 p-6 border-2 border-white rounded">
    <div v-if="fetchStat === FetchStatType.loading" class="flex justify-center items-center space-x-3">
      <b class="h-fit text-xl font-medium">资源加载中...</b>
    </div>
    <div v-else class="flex justify-center items-center space-x-3">
      <Icon icon="mdi:error-outline" class=" w-12 h-12" />

      <b class="h-fit text-lg">
        {{ fetchStat === FetchStatType.serviceErr ? "服务器故障，请等候服务恢复" : "资源加载失败，请刷新重试" }}
        <span>或前往</span>
        <a href="https://github.com/open-ani/animeko/releases" class=" text-blue-600">Github Releases</a>
        <span>下载 😭</span>
      </b>
      <button class="btn cursor-pointer" @click="getRemoteRelease()">
        刷新
      </button>
    </div>
  </div>
</template>
