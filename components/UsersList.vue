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
  <div>
    <h1>Пользователи</h1>
    <ul>
      <user-item
          v-for="user in usersStore.users"
          :key="user.id"
          :user-id="user.id"
          :user-name="user.name"
          v-model="favoriteUsers"
          @load-posts="handleLoadPosts"
      />
    </ul>
    <posts-list :selected-user="usersStore.selectedUser" :is-loading="usersStore.isLoading" :posts="usersStore.posts" />
  </div>
</template>
