<script setup lang="ts">
import { useWorkspaceStore } from '@/stores/workspaceStore'

const store = useWorkspaceStore()

const emit = defineEmits<{
  saveTheme: []
  deleteTheme: []
}>()
</script>

<template>
  <div class="theme-row">
    <div class="theme-left">
      <label for="theme-select" class="sr-only">Select Theme</label>
      <select
        id="theme-select"
        :value="store.selectedThemeId ?? ''"
        @change="store.selectTheme(($event.target as HTMLSelectElement).value || null)"
      >
        <option value="">Select Theme</option>
        <option v-for="theme in store.allThemes" :key="theme.id" :value="theme.id">
          {{ theme.name }}
        </option>
      </select>
    </div>
    <div class="theme-actions">
      <button class="btn btn-save" @click="emit('saveTheme')">Save Theme</button>
      <button v-if="store.isCustomTheme" class="btn btn-delete" @click="emit('deleteTheme')">
        🗑
      </button>
    </div>
  </div>
</template>

<style scoped>
.theme-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

.theme-left {
  flex: 1;
}

select {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #555;
  background: #2a2a2e;
  color: #e0e0e0;
  font-size: 0.9rem;
  min-width: 200px;
}

.theme-actions {
  display: flex;
  gap: 8px;
}

.btn {
  padding: 8px 16px;
  border-radius: 6px;
  border: 1px solid #555;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.15s;
}

.btn-save {
  background: #3a3a4e;
  color: #e0e0e0;
}

.btn-save:hover {
  background: #4a4a5e;
}

.btn-delete {
  background: #3a3a4e;
  color: #e0e0e0;
}

.btn-delete:hover {
  background: #5a2a2a;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>
