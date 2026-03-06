<script setup lang="ts">
import { computed } from 'vue'
import { useWorkspaceStore } from '@/stores/workspaceStore'

const store = useWorkspaceStore()

const bg = computed(() => (store.darkMode ? '#1e1e1e' : '#ffffff'))
const defaultText = computed(() => (store.darkMode ? '#d4d4d4' : '#333333'))

const keyColor = computed(
  () => store.workspaceColors[0] ?? (store.darkMode ? '#569cd6' : '#0000ff'),
)
const funcColor = computed(
  () => store.workspaceColors[1] ?? (store.darkMode ? '#dcdcaa' : '#795e26'),
)
const strColor = computed(
  () => store.workspaceColors[2] ?? (store.darkMode ? '#ce9178' : '#a31515'),
)
const numColor = computed(
  () => store.workspaceColors[3] ?? (store.darkMode ? '#b5cea8' : '#098658'),
)
const commentColor = computed(
  () => store.workspaceColors[4] ?? (store.darkMode ? '#6a9955' : '#008000'),
)
const tagColor = computed(
  () => store.workspaceColors[5] ?? (store.darkMode ? '#4ec9b0' : '#800000'),
)
</script>

<template>
  <div class="code-preview" :style="{ backgroundColor: bg }">
    <div class="file-tab" :style="{ color: defaultText }">my-theme-preview.vue</div>
    <pre
      class="code-content"
    ><code><span :style="{ color: keyColor }">Vue</span><span :style="{ color: defaultText }">.</span><span :style="{ color: funcColor }">component</span><span :style="{ color: defaultText }">(</span><span :style="{ color: strColor }">'builder'</span><span :style="{ color: defaultText }">, {</span>
  <span :style="{ color: funcColor }">setup</span><span :style="{ color: defaultText }">() {</span>
    <span :style="{ color: keyColor }">const</span> <span :style="{ color: defaultText }">count = </span><span :style="{ color: funcColor }">ref</span><span :style="{ color: defaultText }">(</span><span :style="{ color: numColor }">6</span><span :style="{ color: defaultText }">);</span>
    <span :style="{ color: commentColor }">// comment</span>
    <span :style="{ color: tagColor }">&lt;div&gt;</span>
  <span :style="{ color: defaultText }">}</span>
<span :style="{ color: defaultText }">})</span></code></pre>
  </div>
</template>

<style scoped>
.code-preview {
  border-radius: 8px;
  padding: 0;
  margin-bottom: 16px;
  overflow: hidden;
  border: 1px solid #444;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
}

.file-tab {
  padding: 8px 16px;
  font-size: 0.8rem;
  border-bottom: 1px solid #444;
  opacity: 0.7;
}

.code-content {
  padding: 16px;
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.6;
  overflow-x: auto;
}

code {
  font-family: inherit;
}
</style>
