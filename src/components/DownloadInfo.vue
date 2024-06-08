<template>
    <!-- {{ outputs }} -->
    <ul>
        <li v-for="(v,k) in outputs.data" aria-label="win" class="p-4 flex">
            <div class="w-full flex">
                <svg class="w-12 h-12 p-1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M8 5v2H5v13h14V7h-3V5h3a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm4-3a1 1 0 0 1 1 1v10.828L14.828 12a1 1 0 1 1 1.415 1.414l-3.36 3.359a1.25 1.25 0 0 1-1.767 0l-3.359-3.359A1 1 0 1 1 9.172 12L11 13.828V3a1 1 0 0 1 1-1"/></g></svg>
                <div class="ml-2 flex flex-col">
                    <p class="font-bold">{{ str_map[k] }}</p>
                    <small>版本：{{ v.version }}</small>
                </div>
            </div>
            <div class="space-x-2 flex text-nowrap my-auto w-fit float-end">
                <a :href="v.urls[0]"
                    class="inline-flex items-center border-2 border-white rounded px-3 py-2 text-sm font-semibold text-slate-300 shadow-sm">主线（推荐）</a>
                <a :href="v.urls[1]"
                    class="inline-flex items-center border-2 border-white rounded px-3 py-2 text-sm font-semibold text-slate-300 shadow-sm">全球</a>
            </div>
        </li>
        <!-- TODO: sort to pin the correct device type -->
    </ul>
</template>

<script setup lang="ts">
import { getDownloadLink } from '../composables/getDownloadLink';
const props = defineProps(['type'])
const str_map = {
    'win':'Windows X86_64',
    'maci': 'macOS x86_64 (Intel 芯片)',
    'macm': 'macOS aarch64 (M 系列芯片)',
    'android': 'Android APK aarch64'
}
interface i {
    version: string;
    urls: string[];
}
interface j {
    win:i,
    maci:i,
    macm:i,
    android:i,
}
interface k{    
    type:string,
    data:j
}
//@ts-ignore
let outputs:k = {type:props.type,data:{}};
for(let i of ['win','maci','macm','android']){
    // @ts-ignore
    outputs['data'][i] = await getDownloadLink(i, props.type)
}
</script>