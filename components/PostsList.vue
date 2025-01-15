<script setup lang="ts">
import type { Post, User } from "~/types";

defineProps<{
  selectedUser: User | null,
  posts: Post[],
  isLoading: boolean;
}>()

</script>

<template>
  <div v-if="isLoading" class="loading">Идёт загрузка...</div>

  <div v-else-if="posts.length">
    <h2>Публикации пользователя {{ selectedUser?.name }}</h2>
    <ul>
      <li
          v-for="post in posts" :key="post.id"
          class="post-item"
      >
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>