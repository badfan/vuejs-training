<script setup lang="ts">
defineProps<{
  name: string;
}>();
</script>

<template>
  <label class="w-64 px-1.5 py-0.5 mx-2 my-1.5 rounded-lg text-sm">
    {{ name }}
  </label>
</template>

<style scoped></style>
