<script setup lang="ts">
import { useWorkspaceStore } from '@/stores/workspaceStore'
import PaletteCard from './PaletteCard.vue'

const store = useWorkspaceStore()
</script>

<template>
  <section class="palette-section">
    <p class="palette-count">Loaded {{ store.paletteCount }} palettes</p>
    <div class="palette-grid">
      <PaletteCard
        v-for="palette in store.palettes"
        :key="palette.id"
        :name="palette.name"
        :colors="palette.colors"
        @select-color="store.addColor"
      />
    </div>
  </section>
</template>

<style scoped>
.palette-section {
  margin-bottom: 24px;
  text-align: center;
}

.palette-count {
  margin: 0 0 12px;
}

.palette-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

@media (max-width: 900px) {
  .palette-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
