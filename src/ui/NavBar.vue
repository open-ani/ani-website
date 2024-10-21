<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { Icon } from '@iconify/vue/dist/iconify.js'

const navigation = [
  { name: '主页', href: '/', current: false },
  { name: '下载', href: '/downloads', current: false },
  { name: '功能截图', href: '/about', current: false },
  { name: '常见问题', href: '/wiki', current: false },
]
</script>

<template>
  <Disclosure as="nav" class="bg-transparent w-full">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <DisclosureButton
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span class="absolute -inset-0.5" />
            <Icon icon="mdi:menu" class="w-5 h-5" />
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <a href="/" class="hover:animate-spin flex flex-shrink-0 items-center">
            <img class="rounded-full w-8 h-8" alt="logo" src="/logo.png">
          </a>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <a
                v-for="item in navigation" :key="item.name" :href="item.href"
                class="rounded-md px-3 py-2 text-sm font-medium"
                :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white']"
                :aria-current="item.current ? 'page' : undefined"
              >{{ item.name }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <DisclosureButton
          v-for="item in navigation" :key="item.name" as="a" :href="item.href"
          class="block rounded-md px-3 py-2 text-base font-medium"
          :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white']"
          :aria-current="item.current ? 'page' : undefined"
        >
          {{ item.name }}
        </DisclosureButton>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>
