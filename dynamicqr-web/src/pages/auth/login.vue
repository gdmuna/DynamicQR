<template>
    <div class="main-container">
        <div class="w-full max-w-screen-sm h-full mx-auto px-10 py-10 flex-1">
            <img class="w-1/2 max-w-48 mx-auto my-10 bg-white rounded-lg" src="/logo.svg" />
            <v-form class="w-full max-w-sm mx-auto" @submit.prevent="login">
                <v-text-field v-model="user.account" label="用户名"></v-text-field>
                <v-text-field v-model="user.password" label="密码" :type="showPassword ? 'text' : 'password'" :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'" @click:append-inner="showPassword = !showPassword"></v-text-field>
                <v-btn class="mt-2" text="登录" type="submit" block></v-btn>
            </v-form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoginPage',
    components: {},
    data() {
        return {
            user: {
                account: null,
                password: null
            },
            showPassword: false
        };
    },
    created() {},
    mounted() {},
    updated() {},
    methods: {
        async login() {
            const result = await this.$api.auth.login({
                account: this.user.account,
                password: this.user.password
            });
            if (result) {
                this.$router.push('/manage');
            }
        }
    }
};
</script>

<style scoped></style>
