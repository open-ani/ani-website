<script setup lang="ts">
import Danmaku from 'danmaku'
import { onMounted, useTemplateRef } from 'vue'

const danmaku_data = [
  'ani太方便了导致经常摸鱼',
  '好漂亮的客户端',
  'elegant !',
  '這種項目總是要支持的(bgm105)',
  '支持，技术力贡献的美好世界',
  '(bgm105)好东西啊',
  '好厉害的软件啊！一条五毛记得删括号',
  'Ciallo～(∠・ω< )⌒☆',
]

const containerEl = useTemplateRef<HTMLDivElement>('container')

function getRandomColor() {
  const r = Math.floor(Math.random() * 128) + 128
  const g = Math.floor(Math.random() * 128) + 128
  const b = Math.floor(Math.random() * 128) + 128
  return `rgb(${r}, ${g}, ${b})`
}

const randint = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min // [min,max]
onMounted(() => {
  if (containerEl.value) {
    const danmaku = new Danmaku({ container: containerEl.value, engine: 'dom', speed: 110 })
    const add = () => {
      const comment = {
        text: danmaku_data[randint(0, danmaku_data.length - 1)],
        style: {
          fontSize: `${randint(22, 32)}px`,
          color: getRandomColor(),
        },
      }
      danmaku.emit(comment)
    }
    setTimeout(function cycle() {
      add()
      setTimeout(cycle, Math.random() * 1000)
    }, Math.random() * 1000)
  }
})
</script>

<template>
  <div class="flex w-full justify-center items-center flex-col mt-3 !space-y-3 px-3">
    <h2 class="text-4xl font-bold my-2">
      用户对 Ani 的评价
    </h2>
    <div ref="container" class="w-full md:w-3/5 h-[350px] border-2 border-slate-400 rounded-md" />
    <div class="mt-6 w-full flex md:w-3/5 gap-x-2">
      <input
        disabled type="text" placeholder="我也要说说（暂不开放）" required
        class="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
      >
      <button
        disabled type="submit"
        class="flex-none rounded-md //hover:bg-indigo-400 //bg-indigo-500 bg-slate-400 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      >
        提交
      </button>
    </div>
  </div>
</template>
