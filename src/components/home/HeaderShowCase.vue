<script setup lang="ts">
import { useTemplateRef, watch } from 'vue'

const props = defineProps<HeaderShowCaseProps>()
const phoneEl = useTemplateRef<HTMLDivElement>('phone')
const phoneImgEl = useTemplateRef<HTMLImageElement>('phone_img')
const pcImgEl = useTemplateRef<HTMLImageElement>('pc_img')

interface HeaderShowCaseProps {
  modelValue: boolean
}

function rotateElement(): void {
  if (props.modelValue) {
    if (phoneEl.value)
      phoneEl.value.style.transform = 'rotate(90deg)'
    setTimeout(() => {
      if (phoneImgEl.value)
        phoneImgEl.value.src = '/showcase/phone/2.jpg'
      if (pcImgEl.value)
        pcImgEl.value.src = '/showcase/pc/2.jpg'
    }, 400)
    return
  }
  if (phoneEl.value)
    phoneEl.value.style.transform = 'rotate(0deg)'
  setTimeout(() => {
    if (phoneImgEl.value)
      phoneImgEl.value.src = '/showcase/phone/1.jpg'
    if (pcImgEl.value)
      pcImgEl.value.src = '/showcase/pc/1.jpg'
  }, 400)
}

watch(() => props.modelValue, () => rotateElement())
</script>

<template>
  <div class="relative flex w-fit md:mb-20 md:-ml-15">
    <div>
      <div id="pc" class="hidden md:block bottom-0 right-0 relative w-[800px] h-[450px]">
        <img
          ref="pc_img" alt="showcase" src="/showcase/pc/1.jpg"
          class="w-[75%] top-[7.2%] left-[12.5%] absolute h-[84%] object-cover"
        >
      </div>
    </div>
    <div ref="phone" class="rotatable md:absolute md:-bottom-24 md:-right-8">
      <div id="phone" class="relative w-[200px] h-[410px]">
        <img
          ref="phone_img" alt="showcase" src="/showcase/phone/1.jpg"
          class="rotatable w-[93%] top-[10.26%] left-[3.5%] absolute h-[80%] object-cover"
        >
      </div>
    </div>
    <link rel="prefetch" href="/showcase/phone/2.jpg">
    <link rel="prefetch" href="/showcase/pc/2.jpg">
  </div>
</template>

<style>
#phone {
  background-image: url('/phone.png');
  background-size: cover;
}

#pc {
  background-image: url('/computer.png');
  background-size: cover;
}

.rotatable {
  transition: all 0.5s ease-in-out;
}
</style>
