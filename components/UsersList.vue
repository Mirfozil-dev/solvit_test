<script setup lang="ts">
import { useUsersStore } from '~/stores/users';
import { ref } from 'vue';
import PostsList from "~/components/PostsList.vue";
import UserItem from "~/components/UserItem.vue";

const usersStore = useUsersStore();
const favoriteUsers = ref<number[]>([])

await usersStore.fetchUsers();

const handleLoadPosts = (userId: number) => {
  usersStore.selectUser(userId)
}
</script>

<template>
  <div class="app-container">
    <h1 class="title">Список пользователей</h1>
    <div class="content-container">
      <ul class="users-list">
        <user-item
            v-for="user in usersStore.users"
            :key="user.id"
            :user-id="user.id"
            :user-name="user.name"
            v-model="favoriteUsers"
            @load-posts="handleLoadPosts"
        />
      </ul>
      <posts-list
          :selected-user="usersStore.selectedUser"
          :is-loading="usersStore.isLoading"
          :posts="usersStore.posts"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;

  .title {
    text-align: center;
    font-size: 2rem;
    color: #333;
    margin-bottom: 20px;
  }

  .content-container {
    display: flex;
    max-height: 500px;
    gap: 20px;

    .users-list {
      flex: 1;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 10px;
      background-color: #f9f9f9;
      overflow-y: auto;
      margin: 0;
    }
  }
}

@media (max-width: 768px) {
  .content-container {
    flex-direction: column;
  }

  .users-list {
    margin-bottom: 20px;
  }

  .title {
    font-size: 1.5rem;
  }
}
</style>
