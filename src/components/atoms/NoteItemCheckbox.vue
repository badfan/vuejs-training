<script setup lang="ts">
defineProps<{
  done: boolean;
}>();

defineEmits(['update:done']);
</script>

<template>
  <input
    id="checkbox"
    type="checkbox"
    class="w-4 h-4 accent-green-600 rounded"
    :value="done"
    :checked="done"
    @change="$emit('update:done', ($event.target as HTMLInputElement).checked)"
  />
</template>

<style scoped></style>
