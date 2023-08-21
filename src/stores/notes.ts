import { ref } from 'vue';

export interface Note {
  id: number;
  name: string;
  todos: Todo[];
  done: boolean;
}

export interface Todo {
  id: number;
  name: string;
  done: boolean;
  inputChange: boolean;
}

interface CreateNoteFormData {
  noteName: string;
  todos: Todo[];
}

const notes = ref<Note[]>([]);

const defaultFormData: CreateNoteFormData = {
  noteName: '',
  todos: [{ id: 0, name: '', done: false, inputChange: false }],
};

const noteID = ref(0);
const todoID = ref(0);
const deleteID = ref(0);
const isChanged = ref(false);

function addFormTodoItem(todos: Todo[]) {
  todoID.value++;
  todos.push({
    id: todoID.value,
    name: '',
    done: false,
    inputChange: false,
  });
}

function deleteNoteItem(todos: Todo[], id: number) {
  if (todos.length === 1) {
    return;
  }
  const index = todos.findIndex((t) => t.id == id);
  todos.splice(index, 1);
}

function createNote(formData: CreateNoteFormData) {
  if (formData.noteName.trim() === '') {
    clearForm(formData);
    return;
  }
  for (const todo of formData.todos) {
    if (todo.name.trim() === '') {
      clearForm(formData);
      return;
    }
  }

  noteID.value = Number(localStorage.getItem('note_id'));

  notes.value.push({
    id: noteID.value,
    name: formData.noteName,
    todos: formData.todos,
    done: false,
  });

  noteID.value++;
  localStorage.setItem('note_id', noteID.value.toString());
  localStorage.setItem('notes', JSON.stringify(notes.value));
}

function clearForm(formData: CreateNoteFormData) {
  todoID.value = 0;
  formData.noteName = '';
  formData.todos = [
    { id: todoID.value, name: '', done: false, inputChange: false },
  ];
}

function deleteNote() {
  const index = notes.value.findIndex((n) => n.id == deleteID.value);
  notes.value.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(notes.value));
}

function saveNoteChanges(note: Note, index: number) {
  notes.value[index] = note;
  isChanged.value = false;
  localStorage.setItem('notes', JSON.stringify(notes.value));
}

function addTodoField(note: Note) {
  const length = note.todos.length;
  note.todos.push({
    id: note.todos[length - 1].id + 1,
    name: '',
    done: false,
    inputChange: false,
  });
}

export {
  notes,
  defaultFormData,
  noteID,
  deleteID,
  isChanged,
  addFormTodoItem,
  deleteNoteItem,
  createNote,
  clearForm,
  deleteNote,
  saveNoteChanges,
  addTodoField,
};
