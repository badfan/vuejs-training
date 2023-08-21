<script setup lang="ts">
import CreateNoteInput from '../atoms/CreateNoteInput.vue';
import { ref } from 'vue';
import {
  addFormTodoItem,
  clearForm,
  createNote,
  defaultFormData,
  deleteNoteItem,
} from '../../stores/notes';
import BinIcon from '../atoms/BinIcon.vue';
import AppButton from '../atoms/AppButton.vue';
import AddTodoIcon from '../atoms/AddTodoIcon.vue';

const emits = defineEmits(['toggle-modal']);

const handleCreating = () => {
  createNote(formData.value);
  emits('toggle-modal');
};

const handleCanceling = () => {
  clearForm(formData.value);
  emits('toggle-modal');
};

const formData = ref(defaultFormData);
</script>

<template>
  <form class="creating-form" @submit.prevent="handleCreating()">
    <label for="note-title" class="block mb-2 font-medium">Note title</label>
    <CreateNoteInput
      v-model:input-value="formData.noteName"
      class="block placeholder-neutral-300 w-full"
      placeholder="e.g. cases for a week"
    />
    <p class="mb-2 mt-2 font-medium">Todo list</p>
    <ul v-for="todo in formData.todos" :key="todo.id" class="list-disc">
      <li>
        <CreateNoteInput
          v-model:input-value="todo.name"
          placeholder="e.g. make purchases"
          class="w-11/12 placeholder-neutral-300 text-sm mb-2"
        />
        <AppButton
          class="ml-4 py-0.5 px-2"
          :icon="BinIcon"
          @click="deleteNoteItem(formData.todos, todo.id)"
        />
      </li>
    </ul>
    <div class="flex justify-between mt-5">
      <div>
        <AppButton
          class="text-white text-sm py-2 px-6 bg-neutral-500"
          type="submit"
          text="Create"
        />
      </div>
      <div>
        <AppButton
          class="text-sm py-2 px-3 bg-white border border-neutral-800"
          :icon="AddTodoIcon"
          @click="addFormTodoItem(formData.todos)"
        />
      </div>
      <div>
        <AppButton
          class="text-sm py-2 px-6 bg-white border-white"
          text="Cancel"
          @click="handleCanceling()"
        />
      </div>
    </div>
  </form>
</template>

<style scoped></style>
