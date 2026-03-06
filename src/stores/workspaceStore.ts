import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Palette, Theme } from '@/types'
import { MAX_WORKSPACE_COLORS } from '@/types'
import { defaultThemes } from '@/data/defaultThemes'

const LS_CUSTOM_THEMES = 'custom-themes'
const LS_WORKSPACE_COLORS = 'workspace-colors'
const LS_SELECTED_THEME = 'selected-theme'
const LS_DARK_MODE = 'dark-mode'

function loadFromLocalStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function saveToLocalStorage(key: string, value: unknown): void {
  localStorage.setItem(key, JSON.stringify(value))
}

export const useWorkspaceStore = defineStore('workspace', () => {
  const palettes = ref<Palette[]>([])
  const workspaceColors = ref<string[]>(loadFromLocalStorage<string[]>(LS_WORKSPACE_COLORS, []))
  const selectedThemeId = ref<string | null>(
    loadFromLocalStorage<string | null>(LS_SELECTED_THEME, null),
  )
  const darkMode = ref<boolean>(loadFromLocalStorage<boolean>(LS_DARK_MODE, false))
  const customThemes = ref<Theme[]>(loadFromLocalStorage<Theme[]>(LS_CUSTOM_THEMES, []))

  const paletteCount = computed(() => palettes.value.length)

  const allThemes = computed<Theme[]>(() => [...defaultThemes, ...customThemes.value])

  const selectedTheme = computed(() => allThemes.value.find((t) => t.id === selectedThemeId.value))

  const isCustomTheme = computed(
    () => selectedTheme.value != null && !selectedTheme.value.isDefault,
  )

  async function loadPalettes() {
    const res = await fetch(import.meta.env.BASE_URL + 'combinations.json')
    const data = (await res.json()) as {
      combinations: {
        combination: {
          id: number
          name: string
          slug: string
          colors: { slug: string; hex: string; name: string }[]
        }
      }[]
    }
    palettes.value = data.combinations.slice(0, 7).map((entry) => ({
      id: entry.combination.id,
      name: entry.combination.name,
      slug: entry.combination.slug,
      colors: entry.combination.colors,
    }))
  }

  function addColor(hex: string) {
    if (workspaceColors.value.length >= MAX_WORKSPACE_COLORS) return
    workspaceColors.value.push(hex)
    saveToLocalStorage(LS_WORKSPACE_COLORS, workspaceColors.value)
  }

  function removeColor(index: number) {
    workspaceColors.value.splice(index, 1)
    saveToLocalStorage(LS_WORKSPACE_COLORS, workspaceColors.value)
  }

  function reorderColors(fromIndex: number, toIndex: number) {
    const item = workspaceColors.value.splice(fromIndex, 1)[0]
    if (item != null) {
      workspaceColors.value.splice(toIndex, 0, item)
      saveToLocalStorage(LS_WORKSPACE_COLORS, workspaceColors.value)
    }
  }

  function selectTheme(themeId: string | null) {
    selectedThemeId.value = themeId
    saveToLocalStorage(LS_SELECTED_THEME, themeId)
    const theme = allThemes.value.find((t) => t.id === themeId)
    if (theme) {
      workspaceColors.value = [...theme.colors]
      saveToLocalStorage(LS_WORKSPACE_COLORS, workspaceColors.value)
    }
  }

  function toggleDarkMode() {
    darkMode.value = !darkMode.value
    saveToLocalStorage(LS_DARK_MODE, darkMode.value)
  }

  function saveCustomTheme(name: string, colors: string[]) {
    const id = `custom-${Date.now()}`
    const theme: Theme = { id, name, colors: [...colors], isDefault: false }
    customThemes.value.push(theme)
    saveToLocalStorage(LS_CUSTOM_THEMES, customThemes.value)
    selectTheme(id)
  }

  function deleteCustomTheme(themeId: string) {
    customThemes.value = customThemes.value.filter((t) => t.id !== themeId)
    saveToLocalStorage(LS_CUSTOM_THEMES, customThemes.value)
    selectedThemeId.value = null
    saveToLocalStorage(LS_SELECTED_THEME, null)
    workspaceColors.value = []
    saveToLocalStorage(LS_WORKSPACE_COLORS, workspaceColors.value)
  }

  return {
    palettes,
    workspaceColors,
    selectedThemeId,
    darkMode,
    customThemes,
    paletteCount,
    allThemes,
    selectedTheme,
    isCustomTheme,
    loadPalettes,
    addColor,
    removeColor,
    reorderColors,
    selectTheme,
    toggleDarkMode,
    saveCustomTheme,
    deleteCustomTheme,
  }
})
