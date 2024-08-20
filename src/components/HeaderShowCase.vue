<script setup lang="ts">
import { onMounted } from 'vue'

let rotation = 0
let phone: HTMLDivElement
let phone_img: HTMLImageElement
let pc_img: HTMLImageElement
function rotateElement() {
  if (rotation++ % 2 === 0) {
    phone.style.transform = `rotate(90deg)`
    setTimeout(() => {
      phone_img.src = '/showcase/phone/2.jpg'
      pc_img.src = '/showcase/pc/2.jpg'
    }, 400)
  }
  else {
    phone.style.transform = `rotate(0deg)`
    setTimeout(() => {
      phone_img.src = '/showcase/phone/1.jpg'
      pc_img.src = '/showcase/pc/1.jpg'
    }, 400)
  }
}

onMounted(() => {
  setTimeout(() => document.getElementById('rotate')!.addEventListener('click', rotateElement), 200)
})
</script>

<template>
  <div class="relative flex w-fit xl:mb-20">
    <div>
      <div id="pc" class="hidden xl:block bottom-0 right-0 relative w-[800px] h-[450px]">
        <img
          ref="pc_img" alt="showcase" src="/showcase/pc/1.jpg"
          class="w-[75%] top-[7.2%] left-[12.5%] absolute h-[84%] object-cover"
        >
      </div>
    </div>
    <div ref="phone" class="rotatable xl:absolute xl:-bottom-24 xl:-right-8">
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
    transition: transform 0.5s ease;
}
</style>
