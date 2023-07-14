<script setup lang="ts">
import { notes } from '../../stores/notes';
import { onMounted, ref, watch } from 'vue';
import AppButton from '../atoms/AppButton.vue';
import AppModal from '../atoms/AppModal.vue';
import CreateNoteInput from '../atoms/CreateNoteInput.vue';
import AddTodoIcon from '../atoms/AddTodoIcon.vue';
import NoteItem from '../molecules/NoteItem.vue';

const emits = defineEmits(['cancel-creating', 'submit-creating']);
defineProps({
  isModalActive: {
    type: Boolean,
    default: false,
  },
});

const note_id = ref(0);
const todo_id = ref(0);

const formData = ref({
  noteName: '',
  todoList: [{ id: todo_id.value, name: '', done: false, inputChange: false }],
});

const deleteNoteItem = (id: number) => {
  if (formData.value.todoList.length === 1) {
    return;
  }
  const index = formData.value.todoList.findIndex((t) => t.id == id);
  formData.value.todoList.splice(index, 1);
};
const cancelCreating = () => {
  todo_id.value = 0;
  formData.value.noteName = '';
  formData.value.todoList = [{ id: todo_id.value, name: '', done: false }];
  emits('cancel-creating');
};
const addTodoFieldToModal = () => {
  todo_id.value++;
  formData.value.todoList.push({ id: todo_id.value, name: '', done: false });
};
const handleCreating = () => {
  debugger;
  if (formData.value.noteName.trim() === '') {
    return;
  }
  for (const todo of formData.value.todoList) {
    if (todo.name.trim() === '') {
      return;
    }
  }

  notes.value.push({
    id: note_id.value,
    name: formData.value.noteName,
    todoList: formData.value.todoList,
    done: false,
  });

  todo_id.value = 0;
  formData.value.noteName = '';
  formData.value.todoList = [
    { id: todo_id.value, name: '', done: false, inputChange: false },
  ];
  note_id.value++;

  emits('submit-creating');
};

watch(note_id, (newValue) => {
  localStorage.setItem('note_id', newValue.toString());
});

watch(
  notes,
  (newValue) => {
    localStorage.setItem('notes', JSON.stringify(newValue));
  },
  { deep: true }
);

onMounted(() => {
  note_id.value = Number(localStorage.getItem('note_id'));
});
</script>

<template>
  <AppModal :is-modal-active="isModalActive">
    <div
      v-if="isModalActive"
      class="p-8 bg-white self-start m-auto mt-64 max-w-screen-sm rounded-lg"
    >
      <h1 class="text-xl mb-2 text-center">CREATE NOTE</h1>
      <div>
        <form class="creating-form" @submit.prevent="handleCreating">
          <label for="note-title" class="block mb-2 font-medium"
            >Note title</label
          >
          <CreateNoteInput
            v-model:input-value="formData.noteName"
            class="block placeholder-neutral-300 w-full"
            placeholder="e.g. cases for a week"
          />
          <p class="mb-2 mt-2 font-medium">Todo list</p>
          <ul
            v-for="todo in formData.todoList"
            :key="todo.id"
            class="list-disc"
          >
            <NoteItem
              v-model:item-name="todo.name"
              v-model:item-id="todo.id"
              @delete-note-item="deleteNoteItem"
            />
          </ul>
          <div class="flex justify-between mt-5">
            <div>
              <AppButton
                class="text-white text-sm py-2 px-6 bg-neutral-500"
                type="submit"
                text="Create"
                @submit="handleCreating"
              />
            </div>
            <div>
              <AppButton
                class="text-sm py-2 px-3 bg-white border border-neutral-800"
                :icon="AddTodoIcon"
                @click="addTodoFieldToModal"
              />
            </div>
            <div>
              <AppButton
                class="text-sm py-2 px-6 bg-white border-white"
                text="Cancel"
                @click="cancelCreating"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  </AppModal>
</template>

<style scoped></style>
