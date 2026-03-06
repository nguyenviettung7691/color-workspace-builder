<script setup lang="ts">
import { onMounted } from 'vue'
import { useWorkspaceStore } from '@/stores/workspaceStore'
import AppHeader from '@/components/AppHeader.vue'
import PaletteGrid from '@/components/PaletteGrid.vue'
import WorkspaceBuilder from '@/components/WorkspaceBuilder.vue'

const store = useWorkspaceStore()

onMounted(() => {
  store.loadPalettes()
})
</script>

<template>
  <div class="app">
    <AppHeader />
    <PaletteGrid />
    <WorkspaceBuilder />
  </div>
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  background: #121214;
  color: #e0e0e0;
}
</style>

<style scoped>
.app {
  max-width: 960px;
  margin: 0 auto;
  padding: 16px 24px;
}
</style>
