<template>
    {{ data }}
</template>

<script setup lang="ts">
import { getDownloadLink } from "../composables/getDownloadLink.ts";
const data = await getDownloadLink('android','beta')
</script>