<script setup lang="ts">
import { deleteID, notes } from '../../stores/notes';
import { onMounted, ref } from 'vue';
import AppButton from '../atoms/AppButton.vue';
import DeleteNoteModal from '../organisms/DeleteNoteModal.vue';
import NoteItemLabel from '../atoms/NoteItemLabel.vue';
import NoteItemCheckbox from '../atoms/NoteItemCheckbox.vue';

const modal = ref();

const openDeleteNoteModal = (id: number) => {
  deleteID.value = id;
  modal.value.toggleDeleteNoteModal();
};

onMounted(() => {
  let ls = localStorage.getItem('notes');
  if (ls != null) {
    notes.value = JSON.parse(ls) || [];
  }
});
</script>

<template>
  <div
    v-if="notes.length === 0"
    class="flex items-center justify-center h-64 text-white text-3xl"
  >
    You don't have any saved notes
  </div>
  <div v-else class="container grid grid-cols-2 content-center gap-4 py-4">
    <div v-for="(note, i) in notes" :key="note.id" class="place-self-center">
      <div class="flex flex-col p-8 gap-2 bg-white text-black rounded-lg">
        <div class="flex flex-row">
          <div class="flex items-center text-xl pl-1">
            {{ note.name }}
          </div>
          <div class="flex items-center flex-1 justify-end">
            <AppButton
              class="py-0.5 px-2"
              text="✕"
              @click="openDeleteNoteModal(note.id)"
            />
          </div>
        </div>
        <div
          v-for="(todo, j) in note.todos"
          :key="todo.id"
          class="flex items-center"
        >
          <div v-if="j < 2" class="flex items-center">
            <NoteItemCheckbox v-model:done="todo.done" disabled />
            <NoteItemLabel
              v-if="todo.done"
              :name="todo.name"
              for="checkbox"
              class="font-medium text-green-600"
            />
            <NoteItemLabel v-else :name="todo.name" for="checkbox" />
          </div>
        </div>
        <div class="flex items-center">
          <div v-if="note.todos.length > 2" class="pl-4 text-sm">
            and {{ note.todos.length - 2 }} more todo(s)
          </div>
          <div class="flex flex-1 justify-end">
            <RouterLink
              :to="{
                name: 'noteEdit',
                params: {
                  id: i,
                },
              }"
              class="text-sm py-0.5 px-4 bg-white border border-neutral-800 hover:text-white hover:bg-todo-black duration-150 rounded-full"
            >
              Edit
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
    <DeleteNoteModal ref="modal" />
  </div>
</template>

<style scoped></style>
