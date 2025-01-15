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

    <button @click.stop="addToFavorite(userId)">
      add to favorites
    </button>
  </li>
</template>

<style scoped>
.user-item {
  cursor: pointer;
  list-style: none;
  padding: 10px 0;

  &.is-favorite {
    background: #ff8f8f;
  }

  button {
    cursor: pointer;
  }
}
</style>