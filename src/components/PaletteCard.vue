<script setup lang="ts">
import type { PaletteColor } from '@/types'

defineProps<{
  name: string
  colors: PaletteColor[]
}>()

const emit = defineEmits<{
  selectColor: [hex: string]
}>()
</script>

<template>
  <div class="palette-card">
    <div class="palette-name">{{ name }}</div>
    <div class="swatches">
      <button
        v-for="color in colors"
        :key="color.slug"
        class="swatch"
        :style="{ backgroundColor: color.hex }"
        :title="color.name + ' ' + color.hex"
        @click="emit('selectColor', color.hex)"
      />
    </div>
  </div>
</template>

<style scoped>
.palette-card {
  background: #2a2a2e;
  border-radius: 8px;
  padding: 12px;
}

.palette-name {
  margin-bottom: 8px;
}

.swatches {
  display: flex;
  justify-content: center;
  gap: 6px;
}

.swatch {
  width: 36px;
  height: 36px;
  border-radius: 6px;
  border: 2px solid transparent;
  cursor: pointer;
  transition:
    border-color 0.15s,
    transform 0.15s;
}

.swatch:hover {
  border-color: #fff;
  transform: scale(1.1);
}
</style>
