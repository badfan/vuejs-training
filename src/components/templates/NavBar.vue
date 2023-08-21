<script setup lang="ts">
import CreateNoteModal from '../organisms/CreateNoteModal.vue';
import AppIcon from '../atoms/AppIcon.vue';
import CreateNoteIcon from '../atoms/CreateNoteIcon.vue';
import { ref } from 'vue';

const modal = ref();

const openCreateNoteModal = () => {
  modal.value.toggleCreateNoteModal();
};
</script>

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
          @click="openCreateNoteModal()"
        >
          <CreateNoteIcon />
          <p class="text-xl">Create note</p>
        </div>
      </div>

      <CreateNoteModal ref="modal" />
    </nav>
  </header>
</template>

<style scoped></style>
