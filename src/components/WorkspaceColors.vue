<script setup lang="ts">
import { computed, ref } from 'vue'
import { useWorkspaceStore } from '@/stores/workspaceStore'
import { hasLowContrast } from '@/composables/useContrast'

const store = useWorkspaceStore()

const dragIndex = ref<number | null>(null)
const dragOverIndex = ref<number | null>(null)

const background = computed(() => (store.darkMode ? '#1e1e1e' : '#ffffff'))
const helperLabel = computed(() =>
  store.workspaceColors.length === 0
    ? 'No colors added yet'
    : 'Drag to reorder colors or click to remove',
)

const hasAnyLowContrast = computed(() =>
  store.workspaceColors.some((c) => hasLowContrast(c, background.value)),
)

function onDragStart(index: number, event: DragEvent) {
  dragIndex.value = index
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
  }
}

function onDragOver(index: number, event: DragEvent) {
  event.preventDefault()
  dragOverIndex.value = index
}

function onDragLeave() {
  dragOverIndex.value = null
}

function onDrop(toIndex: number) {
  if (dragIndex.value !== null && dragIndex.value !== toIndex) {
    store.reorderColors(dragIndex.value, toIndex)
  }
  dragIndex.value = null
  dragOverIndex.value = null
}

function onDragEnd() {
  dragIndex.value = null
  dragOverIndex.value = null
}
</script>

<template>
  <div class="workspace-colors">
    <p class="helper-label">{{ helperLabel }}</p>
    <div class="colors-list">
      <div
        v-for="(color, index) in store.workspaceColors"
        :key="index"
        class="color-item"
        :class="{
          'low-contrast': hasLowContrast(color, background),
          'drag-over': dragOverIndex === index,
          dragging: dragIndex === index,
        }"
        :style="{ backgroundColor: color }"
        draggable="true"
        @dragstart="onDragStart(index, $event)"
        @dragover="onDragOver(index, $event)"
        @dragleave="onDragLeave"
        @drop="onDrop(index)"
        @dragend="onDragEnd"
      >
        <button class="remove-btn" title="Remove color" @click.stop="store.removeColor(index)">
          ×
        </button>
        <span v-if="hasLowContrast(color, background)" class="warning-icon">⚠</span>
      </div>
    </div>
    <div v-if="hasAnyLowContrast" class="contrast-warning">
      ⚠ Warning: Some colors have low contrast (&lt;3.5)
    </div>
  </div>
</template>

<style scoped>
.workspace-colors {
  margin-top: 8px;
}

.helper-label {
  margin: 18px;
  text-align: center;
}

.colors-list {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  min-height: 56px;
}

.color-item {
  width: 56px;
  height: 56px;
  border-radius: 8px;
  position: relative;
  cursor: pointer;
  border: 2px solid transparent;
  transition:
    border-color 0.15s,
    opacity 0.15s;
}

.color-item:hover {
  border-color: #fff;
}

.color-item.low-contrast {
  border-color: #f5c518;
}

.color-item.drag-over {
  opacity: 0.5;
}

.color-item.dragging {
  opacity: 0.3;
}

.remove-btn {
  position: absolute;
  top: -6px;
  right: -6px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #333;
  color: #fff;
  border: 1px solid transparent;
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.15s;
}

.remove-btn:hover {
  border-color: #fff;
}

.warning-icon {
  position: absolute;
  bottom: 2px;
  left: 4px;
  font-size: 12px;
  color: #f5c518;
}

.contrast-warning {
  margin-top: 12px;
  padding: 8px 12px;
  border-radius: 6px;
  background: rgba(245, 197, 24, 0.1);
  border: 1px solid rgba(245, 197, 24, 0.4);
  color: #f5c518;
  text-align: center;
}
</style>
