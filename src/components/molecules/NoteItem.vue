<script setup lang="ts">
import BinIcon from '../atoms/BinIcon.vue';
import { computed, ref } from 'vue';
import CreateNoteInput from '../atoms/CreateNoteInput.vue';
import AppButton from '../atoms/AppButton.vue';
defineProps<{
  itemId: number;
  itemName?: string;
}>();

const name = ref('');

defineEmits(['delete-note-item', 'update:itemName']);
</script>

<template>
  <li>
    <CreateNoteInput
      v-model:input-value="name"
      placeholder="e.g. make purchases"
      class="w-11/12 placeholder-neutral-300 text-sm mb-2"
      @update:input-value="$emit('update:itemName', $event.target.value)"
    />
    <AppButton
      class="ml-4 py-0.5 px-2"
      :icon="BinIcon"
      @click="$emit('delete-note-item', itemId)"
    />
  </li>
</template>

<style scoped></style>
