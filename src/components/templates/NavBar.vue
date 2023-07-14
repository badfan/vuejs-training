<template>
  <header class="sticky top-0 bg-todo-black shadow-lg">
    <nav
      class="container flex flex-col sm:flex-row items-center gap-4 text-white py-4"
    >
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center pl-5 gap-3 cursor-pointer">
          <AppIcon />
          <p class="text-2xl">The Notes App</p>
        </div>
      </RouterLink>

      <div class="flex items-center flex-1 justify-end">
        <div
          class="flex gap-3 px-6 py-1 hover:text-black hover:bg-stone-100 duration-150 rounded-full cursor-pointer"
          @click="toggleCreateModal"
        >
          <CreateNoteIcon />
          <p class="text-xl">Create note</p>
        </div>
      </div>

      <CreateNoteModal
        :is-modal-active="createModalActive"
        @cancel-creating="toggleCreateModal"
        @submit-creating="toggleCreateModal"
      ></CreateNoteModal>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CreateNoteModal from '../organisms/CreateNoteModal.vue';
import AppIcon from '../atoms/AppIcon.vue';
import CreateNoteIcon from '../atoms/CreateNoteIcon.vue';

const createModalActive = ref(false);
const toggleCreateModal = () => {
  createModalActive.value = !createModalActive.value;
};
</script>

<style scoped></style>
