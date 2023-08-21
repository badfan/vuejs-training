<script setup lang="ts">
import AppModal from '../atoms/AppModal.vue';
import FormInput from '../molecules/FormInput.vue';
import { ref } from 'vue';

const isCreateNoteModalActive = ref(false);
const toggleCreateNoteModal = () => {
  isCreateNoteModalActive.value = !isCreateNoteModalActive.value;
};

defineExpose({
  toggleCreateNoteModal,
});
</script>

<template>
  <AppModal :is-modal-active="isCreateNoteModalActive">
    <div
      v-if="isCreateNoteModalActive"
      class="p-8 bg-white self-start m-auto mt-64 max-w-screen-sm rounded-lg"
    >
      <h1 class="text-xl mb-2 text-center">CREATE NOTE</h1>
      <div>
        <FormInput @toggle-modal="toggleCreateNoteModal()" />
      </div>
    </div>
  </AppModal>
</template>

<style scoped></style>
