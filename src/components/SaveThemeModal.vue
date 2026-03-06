<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { COLOR_TYPES, MAX_WORKSPACE_COLORS } from '@/types'

const props = defineProps<{
  colors: string[]
}>()

const emit = defineEmits<{
  save: [name: string, colors: string[]]
  cancel: []
}>()

const themeName = ref('')
const editableColors = ref<string[]>([])

onMounted(() => {
  const padded = [...props.colors]
  while (padded.length < MAX_WORKSPACE_COLORS) {
    padded.push('#888888')
  }
  editableColors.value = padded.slice(0, MAX_WORKSPACE_COLORS)
})

function onColorChange(index: number, event: Event) {
  const target = event.target as HTMLInputElement
  editableColors.value[index] = target.value
}

function handleSave() {
  if (themeName.value.trim()) {
    emit('save', themeName.value.trim(), [...editableColors.value])
  }
}
</script>

<template>
  <div class="modal-overlay" @click.self="emit('cancel')">
    <div class="modal">
      <h2>Save Custom Theme</h2>

      <div class="form-group">
        <label for="theme-name">Enter a name for your theme *</label>
        <input id="theme-name" v-model="themeName" type="text" placeholder="Theme name" required />
      </div>

      <div class="color-grid">
        <div v-for="(color, index) in editableColors" :key="index" class="color-row">
          <span class="color-type">{{ COLOR_TYPES[index] }}:</span>
          <label class="color-pill" :style="{ backgroundColor: color }">
            <span class="color-hex">{{ color }}</span>
            <input
              type="color"
              class="color-input-hidden"
              :value="color"
              @input="onColorChange(index, $event)"
            />
          </label>
        </div>
      </div>

      <hr class="divider" />

      <div class="modal-footer">
        <button class="btn btn-cancel" @click="emit('cancel')">Cancel</button>
        <button class="btn btn-save" :disabled="!themeName.trim()" @click="handleSave">Save</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: #2a2a2e;
  border-radius: 12px;
  padding: 24px;
  min-width: 400px;
  max-width: 90vw;
  color: #e0e0e0;
}

h2 {
  margin: 0 0 20px;
  font-size: 1.2rem;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 0.85rem;
  color: #aaa;
  margin-bottom: 8px;
}

.form-group input[type='text'] {
  width: 100%;
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #555;
  background: #1e1e1e;
  color: #e0e0e0;
  font-size: 0.9rem;
  box-sizing: border-box;
}

.color-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 16px;
}

.color-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.color-type {
  font-size: 0.85rem;
  color: #ccc;
}

.color-pill {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 20px;
  cursor: pointer;
  position: relative;
  min-width: 90px;
  justify-content: center;
}

.color-hex {
  font-size: 0.8rem;
  color: #000;
  font-weight: 500;
}

.color-input-hidden {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  top: 0;
  left: 0;
}

.divider {
  border: none;
  border-top: 1px solid #444;
  margin: 16px 0;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.btn {
  padding: 8px 20px;
  border-radius: 6px;
  border: 1px solid #555;
  cursor: pointer;
  font-size: 0.9rem;
}

.btn-cancel {
  background: #3a3a4e;
  color: #e0e0e0;
}

.btn-cancel:hover {
  background: #4a4a5e;
}

.btn-save {
  background: #4a8cff;
  color: #fff;
  border-color: #4a8cff;
}

.btn-save:hover:not(:disabled) {
  background: #3a7cef;
}

.btn-save:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
