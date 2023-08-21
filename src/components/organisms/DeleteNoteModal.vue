<script setup lang="ts">
import { deleteNote } from '../../stores/notes';

import { ref } from 'vue';
import AppModal from '../atoms/AppModal.vue';
import AppButton from '../atoms/AppButton.vue';

const isDeleteNoteModalActive = ref(false);

const toggleDeleteNoteModal = () => {
  isDeleteNoteModalActive.value = !isDeleteNoteModalActive.value;
};

const handleDeleting = () => {
  deleteNote();
  toggleDeleteNoteModal();
};

defineExpose({
  toggleDeleteNoteModal,
});
</script>

<template>
  <AppModal :is-modal-active="isDeleteNoteModalActive">
    <div
      v-if="isDeleteNoteModalActive"
      class="pt-16 pb-16 bg-white self-start m-auto mt-64 max-w-md rounded-lg"
    >
      <p class="text-2xl text-center">Are you sure</p>
      <p class="text-2xl text-center">you want to delete this note?</p>
      <div class="flex justify-center mt-1">
        <div>
          <AppButton
            class="text-white mt-4 py-2 px-6 bg-neutral-500 border"
            text="Delete"
            @click="handleDeleting()"
          />
        </div>
        <div>
          <AppButton
            class="mt-4 ml-4 py-2 px-6 border border-white"
            text="Cancel"
            @click="toggleDeleteNoteModal()"
          />
        </div>
      </div>
    </div>
  </AppModal>
</template>

<style scoped></style>
