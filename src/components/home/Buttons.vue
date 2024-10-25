<script setup lang="ts">
import { computed } from 'vue'

interface ButtonsProps {
  modelValue: boolean
}

interface ButtonsEmits {
  (e: 'update:modelValue', v: boolean): void
}

const props = defineProps<ButtonsProps>()
const emits = defineEmits<ButtonsEmits>()
const isRotate = computed<boolean>({
  get: () => props.modelValue,
  set: (value: boolean): void => {
    emits('update:modelValue', value)
  },
})

function rotate(): void {
  isRotate.value = !isRotate.value
}
</script>

<template>
  <div class="mt-5 space-x-3 w-full flex justify-center">
    <a
      data-astro-prefetch href="/downloads"
      class="flex-none rounded-md bg-transparent border-white border-2 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      下载 Animeko
    </a>
    <a
      target="_blank" href="https://github.com/open-ani/animeko/"
      class="flex-none rounded-md bg-transparent border-white border-2 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      开源仓库
    </a>
    <button
      class="flex-none rounded-md bg-transparent border-white border-2 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      @click="rotate()"
    >
      切换全屏
    </button>
  </div>
</template>
