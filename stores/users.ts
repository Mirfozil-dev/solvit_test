import { ref, computed, watch } from 'vue';
import type { User, Post } from '~/types';

export const useUsersStore = defineStore('usersStore', () => {
    const users = ref<User[]>([]);
    const selectedUserId = ref<number | null>(null);
    const isLoading = ref(false);
    const posts = ref<Post[]>([]);

    const selectedUser = computed(() =>
        users.value.find(user => user.id === selectedUserId.value) || null
    );

    const fetchUsers = async () => {
        const { apiBaseUrl } = useRuntimeConfig().public;

        const { data, error } = await useFetch(`${apiBaseUrl}/users`);
        if (error.value) {
            console.error('Ошибка при загрузке пользователей', error.value);
            return;
        }

        users.value = (data.value as User[]) || [];
    };

    const fetchPosts = async (userId: number) => {
        const { apiBaseUrl } = useRuntimeConfig().public;
        isLoading.value = true;
        try {
            const data = await $fetch(`${apiBaseUrl}/posts?userId=${userId}`);
            posts.value = (data as Post[]) || [];
        } catch (error) {
            console.error('Ошибка при загрузке публикаций', error);
        } finally {
            isLoading.value = false;
        }
    };

    const selectUser = (userId: number | null) => {
        selectedUserId.value = userId;
    };

    watch(selectedUserId, async (newUserId) => {
        if (newUserId !== null) {
            await fetchPosts(newUserId);
        }
    });

    return {
        users,
        selectedUserId,
        isLoading,
        posts,
        selectedUser,
        fetchUsers,
        fetchPosts,
        selectUser,
    };
});
