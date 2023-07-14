<script setup lang="ts">
import { useRouter } from 'vue-router';
import AppModal from '../atoms/AppModal.vue';
import AppButton from '../atoms/AppButton.vue';

const emits = defineEmits(['undo-changes', 'submit-changes']);
defineProps({
  modalActive: {
    type: Boolean,
    default: false,
  },
});

const router = useRouter();

const submitChanges = () => {
  router.push({ name: 'home' });
  emits('submit-changes');
};

const undoChanges = () => {
  router.push({ name: 'home' });
  emits('undo-changes');
};
</script>

<template>
  <AppModal>
    <div
      v-if="modalActive"
      class="pt-16 pb-16 bg-white self-start m-auto mt-64 max-w-md rounded-lg"
    >
      <p class="text-2xl text-center">Note has been changed</p>
      <p class="text-2xl text-center">Do you want to save the changes?</p>
      <div class="flex justify-center mt-1">
        <div>
          <AppButton
            class="text-white mt-4 py-2 px-6 bg-neutral-500 border"
            text="Yes"
            @click="submitChanges"
          />
          <button
            class="text-white mt-4 py-2 px-6 bg-neutral-500 border hover:bg-todo-black duration-150 rounded-full"
            @click="submitChanges"
          >
            Yes
          </button>
        </div>
        <div>
          <AppButton
            class="mt-4 ml-4 py-2 px-6 border border-white"
            text="No"
            @click="undoChanges"
          />
          <button
            class="text-black mt-4 ml-4 py-2 px-6 bg-white border border-white hover:text-white hover:bg-todo-black duration-150 rounded-full"
            @click="undoChanges"
          >
            No
          </button>
        </div>
      </div>
    </div>
  </AppModal>
</template>

<style scoped></style>
