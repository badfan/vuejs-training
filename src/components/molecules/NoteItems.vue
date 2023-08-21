<script setup lang="ts">
import {
  deleteNoteItem,
  isChanged,
  Note,
  notes,
  Todo,
} from '../../stores/notes';
import CreateNoteInput from '../atoms/CreateNoteInput.vue';
import NoteItemCheckbox from '../atoms/NoteItemCheckbox.vue';
import NoteItemLabel from '../atoms/NoteItemLabel.vue';
import { ref, watch } from 'vue';

const props = defineProps<{
  note: Note;
  index: number;
}>();

const tempNote = ref(props.note);

defineEmits(['delete-note']);

watch(
  tempNote.value.todos,
  (newValue: Todo[]) => {
    isChanged.value = true;
    for (const todo of newValue) {
      if (!todo.done) {
        notes.value[props.index].done = false;
        return;
      }
    }
    notes.value[props.index].done = true;
  },
  { deep: true }
);
</script>

<template>
  <div v-for="todo in note.todos" :key="todo.id" class="flex items-center">
    <div class="flex items-center">
      <NoteItemCheckbox v-model:done="todo.done" />
      <NoteItemLabel
        v-if="todo.done && !todo.inputChange"
        :name="todo.name"
        for="checkbox"
        class="font-medium text-green-600"
      />
      <NoteItemLabel
        v-else-if="!todo.done && !todo.inputChange"
        :name="todo.name"
        for="checkbox"
      />
      <CreateNoteInput
        v-else
        v-model:input-value="todo.name"
        :placeholder="todo.name"
        class="w-64 placeholder-neutral-300 text-sm px-4 py-0.5 mx-2 my-1.5"
      />
      <button class="text-sm" @click="todo.inputChange = !todo.inputChange">
        <i class="fa-solid fa-pen"></i>
      </button>
      <button class="ml-2 text-sm" @click="deleteNoteItem(note.todos, todo.id)">
        <i class="fa-solid fa-trash text-sm"></i>
      </button>
    </div>
  </div>
</template>

<style scoped></style>
