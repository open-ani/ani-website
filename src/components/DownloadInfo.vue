<template>
    <div v-if="loaded === 0 || loaded === 2" class="w-2/3 xl:w-1/2 p-6 border-2 border-white rounded">
        <div v-if="loaded == 0" class="flex justify-center items-center space-x-3">
            <!-- <Icon icon="fa:spinner" class=" animate-spin w-10 h-10" /> -->
            <b class="h-fit text-xl font-medium">资源加载中...</b>
        </div>
        <div v-else-if="loaded == 2" class="flex justify-center items-center space-x-3">
            <Icon icon="mdi:error-outline" class="w-10 h-10" />
            <b class="h-fit text-xl">资源加载失败，请刷新重试或前往<a href="https://github.com/open-ani/ani/releases">Github Releases</a>下载 😭</b>
        </div>
    </div>
    <ul v-else-if="loaded === 1">
        <li v-for="(v, k) in outputs.data" aria-label="win" class="p-4 flex">
            <div class="w-full flex">
                <svg class="w-12 h-12 p-1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
                    viewBox="0 0 24 24">
                    <g fill="none">
                        <path
                            d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                        <path fill="currentColor"
                            d="M8 5v2H5v13h14V7h-3V5h3a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm4-3a1 1 0 0 1 1 1v10.828L14.828 12a1 1 0 1 1 1.415 1.414l-3.36 3.359a1.25 1.25 0 0 1-1.767 0l-3.359-3.359A1 1 0 1 1 9.172 12L11 13.828V3a1 1 0 0 1 1-1" />
                    </g>
                </svg>
                <div class="ml-2 w-fit flex flex-col">
                    <p class="font-bold">{{ str_map[k] }}</p>
                    <small>v{{ v.version }}</small>
                </div>
            </div>
            <div class="space-x-2 flex text-nowrap my-auto w-fit float-end">
                <a :href="v.urls[0]"
                    class="inline-flex items-center border-2 border-white rounded px-3 py-2 text-sm font-semibold text-slate-300 shadow-sm">主线</a>
                <a :href="v.urls[1]"
                    class="inline-flex items-center border-2 border-white rounded px-3 py-2 text-sm font-semibold text-slate-300 shadow-sm">备线</a>
            </div>
        </li>
        <div class=" px-4 flex flex-row-reverse items-center" v-show="ispc">
            <img class=" w-28" alt="QRcode for downloading ani" id="qrc">
            <span class=" mx-4 text-sm font-semibold text-slate-300 h-fit">扫描二维码下载</span>
        </div>
        <!-- TODO: sort to pin the correct device type -->
    </ul>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, type Ref } from 'vue';
import { Icon } from '@iconify/vue'
const props = defineProps(['type'])
const ispc = ref(true)
type typeString = "stable" | "beta";
interface updateItem {
    version: string,
    downloadUrlAlternatives: string[],
    publishTime: number,
    description: string
}
interface response {
    updates: updateItem[]
}
interface item {
    version: string;
    urls: string[];
}
interface data_type {
    type: string,
    data: {
        win: item,
        maci: item,
        macm: item,
        android: item
    }
}
const str_map = {
    'win': 'Windows X86_64',
    'maci': 'macOS x86_64 (Intel 芯片)',
    'macm': 'macOS aarch64 (M 系列芯片)',
    'android': 'Android APK aarch64'
}
// @ts-ignore
const outputs: Ref<data_type> = ref({ type: props.type, data: {} })
const loaded = ref(0)
onMounted(async () => {
    function getDownloadLink(platform: string, type: typeString) {
        return new Promise(async (resolve, reject) => {
            let api_url;
            switch (platform) {
                case ("android"):
                    api_url = `https://danmaku-cn.myani.org/v1/updates/incremental/details?clientVersion=3.0.0-rc04&clientPlatform=android&clientArch=aarch64&releaseClass=${type}`
                    break
                case ("maci"):
                    api_url = `https://danmaku-cn.myani.org/v1/updates/incremental/details?clientVersion=3.0.0-rc04&clientPlatform=macos&clientArch=x86_64&releaseClass=${type}`
                    break
                case ("macm"):
                    api_url = `https://danmaku-cn.myani.org/v1/updates/incremental/details?clientVersion=3.0.0-rc04&clientPlatform=macos&clientArch=aarch64&releaseClass=${type}`
                    break
                case ("win"):
                    api_url = `https://danmaku-cn.myani.org/v1/updates/incremental/details?clientVersion=3.0.0-rc04&clientPlatform=windows&clientArch=x86_64&releaseClass=${type}`
                    break
            }
            try {
                let latest;
                if (api_url) (await fetch(api_url, { mode: 'cors', 'headers': { 'accept': 'application/json' } })).json().then((data: response) => {
                    latest = data.updates[0]
                    for (let item of data.updates)
                        if (item.publishTime > latest.publishTime && (type == 'stable' || item.version.includes('beta'))) latest = item
                    resolve({
                        version: latest!.version,
                        urls: latest!.downloadUrlAlternatives
                    })
                })
            } catch (err) { reject(err) }
        })
    }
    let pending = []
    for (let i of ['win', 'maci', 'macm', 'android']) {
        let item_data = getDownloadLink(i, props.type)
        pending.push(item_data)
        item_data.then((d) => {
            // @ts-ignore
            outputs.value['data'][i] = d
        })
    }
    Promise.all(pending).then(() => {
        loaded.value = 1
        nextTick(()=>{
                document.querySelector('#qrc')!.setAttribute('src',`https://api.qrtool.cn/?text=${outputs.value['data']['android'].urls[0]}`)
            }
        )
    }).catch((err) => {
        loaded.value = 2
        console.error(err)
    })
    let userAgent = navigator.userAgent;
    let mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    if (mobileRegex.test(userAgent)){
        ispc.value=false
    }
})
</script>