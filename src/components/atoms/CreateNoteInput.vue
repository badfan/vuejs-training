<script setup lang="ts">
defineProps<{
  placeholder: string;
  inputValue?: string;
}>();

defineEmits(['update:inputValue']);
</script>

<template>
  <input
    class="p-2 border border-neutral-300 rounded-lg focus:ring-neutral-800 focus:border-neutral-800"
    type="text"
    :placeholder="placeholder"
    :value="inputValue"
    required
    @input="
      $emit('update:inputValue', ($event.target as HTMLInputElement).value)
    "
  />
</template>

<style scoped></style>
