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
    <a data-astro-prefetch href="/downloads" class="index-btn">
      下载 Animeko
    </a>
    <a target="_blank" href="https://github.com/open-ani/animeko/" class="index-btn">
      开源仓库
    </a>
    <button class="index-btn" @click="rotate()">
      切换全屏
    </button>
  </div>
</template>
