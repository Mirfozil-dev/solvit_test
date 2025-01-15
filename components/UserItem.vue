<script setup lang="ts">
const props = defineProps<{
  userName: string,
  userId: number,
}>()

const emit = defineEmits<{
  (e: 'loadPosts', id: number): void
}>()

const favorites = defineModel<number[]>({
  required: true,
})

function loadUserPosts(userId: number) {
  emit("loadPosts", userId)
}

function addToFavorite(userId: number) {
  const i = favorites.value.findIndex((id: number) => id === userId)
  if (i > -1) {
    favorites.value.splice(i, 1)
  } else {
    favorites.value.push(userId)
  }
}

const isFavorite = computed(() => {
  return favorites.value.includes(props.userId)
})
</script>

<template>
  <li
      class="user-item"
      :class="{ 'is-favorite': isFavorite }"
      @click="loadUserPosts(userId)"
  >
    {{ userName }}
    <button class="favorite-btn" @click.stop="addToFavorite(userId)">
      {{ isFavorite ? 'Удалить из избранных' : 'Добавить в избранное' }}
    </button>
  </li>
</template>

<style scoped lang="scss">
.user-item {
  cursor: pointer;
  list-style: none;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  &.is-favorite {
    background-color: #ffe4e4;
    border-color: #ff8f8f;
  }

  .favorite-btn {
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #0056b3;
    }
  }
}

@media (max-width: 768px) {
  .user-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .favorite-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
