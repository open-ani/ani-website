<template>
    <div class="flex flex-col items-center mx-auto p-4 h-[200px] max-w-[500px]">
        <div class="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
        <slot />
        </div>
        <dt class="mt-4 font-semibold text-white">{{ title }}</dt>
        <dd class="mt-2 leading-7 text-gray-400">{{ desc }}</dd>
    </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  desc?: string
}>()
</script>