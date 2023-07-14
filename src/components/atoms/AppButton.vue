<script setup lang="ts">
import type { Component } from 'vue';

defineProps<{
  text?: string;
  icon?: Component;
}>();
</script>

<template>
  <button
    class="text-black bg-white hover:text-white hover:bg-todo-black duration-150 rounded-full"
  >
    {{ text }}
    <component :is="icon" v-if="icon" />
  </button>
</template>

<style scoped></style>
