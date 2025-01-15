<script setup lang="ts">
import type { Post, User } from "~/types";

defineProps<{
  selectedUser: User | null,
  posts: Post[],
  isLoading: boolean;
}>()
</script>

<template>
  <div class="posts-container">
    <div v-if="isLoading" class="loading">Загрузка данных...</div>

    <div v-else-if="posts.length">
      <h2 class="posts-title">
        Публикации пользователя {{ selectedUser?.name }}
      </h2>
      <ul class="posts-list">
        <li v-for="post in posts" :key="post.id" class="post-item">
          <h3 class="post-title">{{ post.title }}</h3>
          <p class="post-body">{{ post.body }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.posts-container {
  flex: 2;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background-color: #f9f9f9;
  overflow-y: auto;

  .loading {
    text-align: center;
    font-size: 1.2rem;
    color: #888;
  }

  .posts-title {
    margin-bottom: 20px;
    font-size: 1.5rem;
    color: #333;
  }

  .posts-list {
    list-style: none;
    padding: 0;
    margin: 0;

    .post-item {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 8px;
      margin-bottom: 10px;
      background-color: #fff;
      transition: box-shadow 0.3s;

      &:hover {
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      }

      .post-title {
        font-size: 1.2rem;
        margin-bottom: 5px;
      }

      .post-body {
        font-size: 1rem;
        color: #555;
      }
    }
  }

}

@media (max-width: 768px) {
  .posts-container {
    padding: 15px;
  }

  .posts-title {
    font-size: 1.2rem;
  }

  .post-title {
    font-size: 1rem;
  }

  .post-body {
    font-size: 0.9rem;
  }
}
</style>
