import { defineStore } from 'pinia';

export const userStore = defineStore('userStore', {
    state: () => ({
        account: null,
        nickName: null
    })
});
