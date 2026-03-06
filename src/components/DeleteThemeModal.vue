<script setup lang="ts">
defineProps<{
  themeName: string
}>()

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()
</script>

<template>
  <div class="modal-overlay" @click.self="emit('cancel')">
    <div class="modal">
      <h2>Delete theme "{{ themeName }}"?</h2>
      <p class="message">
        Are you sure you want to delete this theme? This action cannot be undone.
      </p>

      <div class="modal-footer">
        <button class="btn btn-cancel" @click="emit('cancel')">Cancel</button>
        <button class="btn btn-confirm" @click="emit('confirm')">Confirm</button>
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
  min-width: 380px;
  max-width: 90vw;
  color: #e0e0e0;
}

h2 {
  margin: 0 0 12px;
  font-size: 1.1rem;
}

.message {
  color: #aaa;
  font-size: 0.9rem;
  margin: 0 0 20px;
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

.btn-confirm {
  background: #d32f2f;
  color: #fff;
  border-color: #d32f2f;
}

.btn-confirm:hover {
  background: #b71c1c;
}
</style>
