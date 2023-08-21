<script setup lang="ts">
import AppModal from '../atoms/AppModal.vue';
import AppButton from '../atoms/AppButton.vue';
import { ref } from 'vue';
import { isChanged } from '../../stores/notes';
import { useRouter } from 'vue-router';

const isExitModalActive = ref(false);
const router = useRouter();

const emits = defineEmits(['save-note-changes']);

const toggleExitModal = () => {
  if (isChanged.value) isExitModalActive.value = !isExitModalActive.value;
  else router.push({ name: 'home' });
};

const handleSaving = () => {
  emits('save-note-changes');
  router.push({ name: 'home' });
};

defineExpose({
  toggleExitModal,
});
</script>

<template>
  <AppModal :is-modal-active="isExitModalActive">
    <div
      v-if="isExitModalActive"
      class="pt-16 pb-16 bg-white self-start m-auto mt-64 max-w-md rounded-lg"
    >
      <p class="text-2xl text-center">Note has been changed</p>
      <p class="text-2xl text-center">Do you want to save the changes?</p>
      <div class="flex justify-center mt-1">
        <div>
          <AppButton
            class="text-white mt-4 py-2 px-6 bg-neutral-500 border"
            text="Yes"
            @click="handleSaving()"
          />
        </div>
        <div>
          <AppButton
            class="mt-4 ml-4 py-2 px-6 border border-white"
            text="No"
            @click="router.push({ name: 'home' })"
          />
        </div>
      </div>
    </div>
  </AppModal>
</template>

<style scoped></style>
