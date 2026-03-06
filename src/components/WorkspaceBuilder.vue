<script setup lang="ts">
import { ref } from 'vue'
import { useWorkspaceStore } from '@/stores/workspaceStore'
import ThemeSelector from './ThemeSelector.vue'
import CodePreview from './CodePreview.vue'
import WorkspaceColors from './WorkspaceColors.vue'
import SaveThemeModal from './SaveThemeModal.vue'
import DeleteThemeModal from './DeleteThemeModal.vue'

const store = useWorkspaceStore()

const showSaveModal = ref(false)
const showDeleteModal = ref(false)

function handleSaveTheme(name: string, colors: string[]) {
  store.saveCustomTheme(name, colors)
  showSaveModal.value = false
}

function handleDeleteTheme() {
  if (store.selectedThemeId) {
    store.deleteCustomTheme(store.selectedThemeId)
  }
  showDeleteModal.value = false
}
</script>

<template>
  <section class="workspace-builder">
    <div class="builder-header">
      <h2>Color Workspace Builder</h2>
      <label class="dark-mode-toggle">
        <input :checked="store.darkMode" type="checkbox" @change="store.toggleDarkMode()" />
        Dark Mode
      </label>
    </div>

    <ThemeSelector @save-theme="showSaveModal = true" @delete-theme="showDeleteModal = true" />

    <CodePreview />

    <WorkspaceColors />

    <SaveThemeModal
      v-if="showSaveModal"
      :colors="store.workspaceColors"
      @save="handleSaveTheme"
      @cancel="showSaveModal = false"
    />

    <DeleteThemeModal
      v-if="showDeleteModal"
      :theme-name="store.selectedTheme?.name ?? ''"
      @confirm="handleDeleteTheme"
      @cancel="showDeleteModal = false"
    />
  </section>
</template>

<style scoped>
.workspace-builder {
  background: #1e1e22;
  border-radius: 12px;
  padding: 20px;
}

.builder-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.builder-header h2 {
  margin: 0;
  font-size: 1.2rem;
  color: #e0e0e0;
}

.dark-mode-toggle {
  display: flex;
  flex-direction: row;
  align-items: normal;
  gap: 6px;
  cursor: pointer;
  font-size: 1rem;
}

.dark-mode-toggle input {
  cursor: pointer;
  margin: 0;
}
</style>
