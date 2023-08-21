<script setup lang="ts">
import { addTodoField, notes, saveNoteChanges } from '../../stores/notes';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import ExitModal from '../organisms/ExitModal.vue';
import AddTodoIcon from '../atoms/AddTodoIcon.vue';
import AppButton from '../atoms/AppButton.vue';
import NoteItems from '../molecules/NoteItems.vue';

const route = useRoute();
const index = Number(route.params.id);
const tempNote = ref(JSON.parse(JSON.stringify(notes.value[index])));
const modal = ref();

const openExitModal = () => {
  modal.value.toggleExitModal();
};
</script>

<template>
  <div
    class="container w-1/3 py-7 mt-10 flex flex-col items-center gap-4 text-black bg-white rounded-lg"
  >
    <div class="flex w-full">
      <div class="flex flex-1 items-center justify-center">
        <p class="text-xl ml-3 text-center">{{ tempNote.name }}</p>
      </div>
      <div class="flex items-center justify-end">
        <button @click="openExitModal()">
          <i class="fa-sharp fa-solid fa-arrow-right-from-bracket text-xl"></i>
        </button>
      </div>
    </div>
    <div>
      <NoteItems :note="tempNote" :index="index" />
      <div class="mt-4">
        <AppButton
          class="text-white text-sm py-2 px-4 bg-neutral-500"
          type="submit"
          text="Save changes"
          @click="saveNoteChanges(tempNote, index)"
        />
        <AppButton
          class="text-sm py-2 px-3 ml-4 bg-white"
          :icon="AddTodoIcon"
          @click="addTodoField(tempNote)"
        />
      </div>
    </div>
    <ExitModal
      ref="modal"
      @save-note-changes="saveNoteChanges(tempNote, index)"
    />
  </div>
</template>

<style scoped></style>
