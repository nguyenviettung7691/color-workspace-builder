import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { nextTick } from 'vue'
import { useWorkspaceStore } from '../stores/workspaceStore'

vi.mock('../components/AppHeader.vue', () => ({
  default: { template: '<header class="app-header"><h1>Color Workspace Builder</h1></header>' },
}))
vi.mock('../components/PaletteGrid.vue', () => ({
  default: { template: '<div class="palette-grid-stub"></div>' },
}))

import App from '../App.vue'

beforeEach(() => {
  setActivePinia(createPinia())
  localStorage.clear()
  vi.stubGlobal(
    'fetch',
    vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ combinations: [] }),
      }),
    ),
  )
})

describe('Workspace', () => {
  it('renders main layout and title', () => {
    const wrapper = mount(App)
    expect(wrapper.find('.app').exists()).toBe(true)
    expect(wrapper.text()).toContain('Color Workspace Builder')
  })

  it('renders WorkspaceColors component', async () => {
    const wrapper = mount(App)
    const store = useWorkspaceStore()

    store.addColor('#ff0000')
    await nextTick()

    expect(wrapper.find('.workspace-builder .workspace-colors').exists()).toBe(true)
    expect(wrapper.text()).toContain('Drag to reorder')
  })

  it('renders WorkspaceBuilder component', () => {
    const wrapper = mount(App)
    expect(wrapper.find('.workspace-builder').exists()).toBe(true)
  })

  it('opens SaveThemeModal when triggered', async () => {
    const wrapper = mount(App)
    expect(wrapper.find('.modal-overlay').exists()).toBe(false)

    const saveBtn = wrapper.find('.workspace-builder .btn-save')
    await saveBtn.trigger('click')

    expect(wrapper.find('.modal-overlay').exists()).toBe(true)
    expect(wrapper.text()).toContain('Save Custom Theme')
  })

  it('passes colors to WorkspaceColors and WorkspaceBuilder', async () => {
    const wrapper = mount(App)
    const store = useWorkspaceStore()

    store.addColor('#ff0000')
    store.addColor('#00ff00')
    await nextTick()

    const colorItems = wrapper.findAll('.workspace-colors .color-item')
    expect(colorItems).toHaveLength(2)
    expect(colorItems[0]!.attributes('style')).toContain('background-color')
    expect(colorItems[1]!.attributes('style')).toContain('background-color')
  })

  it('handles save event from SaveThemeModal', async () => {
    const wrapper = mount(App)
    const store = useWorkspaceStore()

    store.addColor('#ff0000')
    store.addColor('#00ff00')
    await nextTick()

    // Open the save modal
    await wrapper.find('.workspace-builder .btn-save').trigger('click')
    expect(wrapper.find('.modal-overlay').exists()).toBe(true)

    // Fill in theme name and save
    const nameInput = wrapper.find('#theme-name')
    await nameInput.setValue('My Test Theme')

    const modalSaveBtn = wrapper.find('.modal .btn-save')
    await modalSaveBtn.trigger('click')

    expect(store.customThemes).toHaveLength(1)
    expect(store.customThemes[0]!.name).toBe('My Test Theme')
  })

  it('toggles dark mode', async () => {
    const wrapper = mount(App)
    const store = useWorkspaceStore()

    expect(store.darkMode).toBe(false)

    const checkbox = wrapper.find('.workspace-builder .dark-mode-toggle input[type="checkbox"]')
    await checkbox.setValue(true)

    expect(store.darkMode).toBe(true)
  })

  it('adds a new color to the workspace', async () => {
    const wrapper = mount(App)
    const store = useWorkspaceStore()

    expect(wrapper.findAll('.workspace-colors .color-item')).toHaveLength(0)

    store.addColor('#abcdef')
    await nextTick()

    const colorItems = wrapper.findAll('.workspace-colors .color-item')
    expect(colorItems).toHaveLength(1)
    expect(colorItems[0]!.attributes('style')).toContain('background-color')
  })
})
