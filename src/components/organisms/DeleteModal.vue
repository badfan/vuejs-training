<script setup lang="ts">
import { notes, delete_id } from '../../stores/notes';
import App from '../../App.vue';
import AppModal from '../atoms/AppModal.vue';
import AppButton from '../atoms/AppButton.vue';

const emits = defineEmits(['cancel-deleting', 'submit-deleting']);
defineProps({
  modalActive: {
    type: Boolean,
    default: false,
  },
});
const handleDeleting = () => {
  const index = notes.value.findIndex((n) => n.id == delete_id.value);
  notes.value.splice(index, 1);
  emits('submit-deleting');
};
</script>

<template>
  <AppModal :modal-active="modalActive">
    <div
      v-if="modalActive"
      class="pt-16 pb-16 bg-white self-start m-auto mt-64 max-w-md rounded-lg"
    >
      <p class="text-2xl text-center">Are you sure</p>
      <p class="text-2xl text-center">you want to delete this note?</p>
      <div class="flex justify-center mt-1">
        <div>
          <AppButton
            class="text-white mt-4 py-2 px-6 bg-neutral-500 border"
            text="Delete"
            @click="handleDeleting"
          />
          <button
            class="text-white mt-4 py-2 px-6 bg-neutral-500 border hover:bg-todo-black duration-150 rounded-full"
            @click="handleDeleting"
          >
            Delete
          </button>
        </div>
        <div>
          <AppButton
            class="mt-4 ml-4 py-2 px-6 border border-white"
            text="Cancel"
            @click="$emit('cancel-deleting')"
          />
          <button
            class="text-black mt-4 ml-4 py-2 px-6 bg-white border border-white hover:text-white hover:bg-todo-black duration-150 rounded-full"
            @click="$emit('cancel-deleting')"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </AppModal>
</template>

<style scoped></style>
