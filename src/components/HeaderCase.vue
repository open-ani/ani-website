<template>
    <div class="relative flex w-fit">
        <div><div class="hidden xl:block bottom-0 right-0 relative w-[800px] h-[450px]" id="pc">
            <img ref="pc_img" src="/showcase/pc/1.jpg" class="w-[75%] top-[7.2%] left-[12.5%] absolute h-[84%] object-cover">
        </div></div>
        <div ref="phone" class="rotatable xl:absolute xl:-bottom-24 xl:-right-8"><div class="relative w-[200px] h-[410px]" id="phone">
            <img ref="phone_img" src="/showcase/phone/1.jpg" class="rotatable w-[93%] top-[10.26%] left-[3.5%] absolute h-[80%] object-cover">
        </div></div>
    </div>
    <!-- <button class="p-2.5 bg-black rounded-md mt-6 ml-2" @click="rotateElement()">点我切换全屏</button> -->
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
let rotation = 0
let phone:HTMLDivElement
let phone_img:HTMLImageElement
let pc_img:HTMLImageElement
function rotateElement() {
    if (rotation++%2===0){
        phone.style.transform = `rotate(90deg)`
        setTimeout(()=>{
            phone_img.src='/showcase/phone/2.jpg'
            pc_img.src='/showcase/pc/2.jpg'
        }, 400)
    }else{
        phone.style.transform = `rotate(0deg)`;
        setTimeout(()=>{
            phone_img.src='/showcase/phone/1.jpg'
            pc_img.src='/showcase/pc/1.jpg'
        }, 400)
    }
}
onMounted(()=>{
    document.getElementById('switch_trig')?.addEventListener('mouseover',rotateElement);
    document.getElementById('switch_trig')?.addEventListener('mouseleave',rotateElement);
})
</script>
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