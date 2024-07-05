<template>
    <v-navigation-drawer v-model="_drawer" temporary>
        <v-list>
            <v-list-item title="DynamicQR"></v-list-item>
        </v-list>
        <v-list>
            <v-list-item>
                <v-card variant="flat" color="blue-lighten-2" block>
                    <div class="flex flex-row justify-start items-center">
                        <v-icon class="fa-duotone fa-user rounded-lg bg-blue-50 m-2 p-4" color="blue-lighten-2" size="small"></v-icon>
                        <div class="px-2">{{ nickName }}</div>
                    </div>
                </v-card>
            </v-list-item>
        </v-list>
        <v-divider class="border-opacity-75"></v-divider>
        <template #append>
            <div class="p-2">
                <v-btn color="blue-lighten-4" flat block @click="logout()">退出登录</v-btn>
            </div>
        </template>
    </v-navigation-drawer>
</template>

<script lang="js">
export default {
    name: 'MenuDrawer',
    components: {},
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:value'],
    data() {
        return {
            nickName: null
        };
    },
    computed: {
        _drawer: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('update:value', val);
            }
        }
    },
    created() {},
    mounted() {},
    async updated() {
        await this.getUserInfo();
    },
    unmounted() {},
    methods: {
        async getUserInfo() {
            const account = localStorage.getItem('account');
            const userInfo = await this.$api.user.getUserInfo({ account });
            this.nickName = userInfo.nickName;
        },
        async logout() {
            this._drawer = false;
            this.$store.user = {};
            localStorage.removeItem('account');
            localStorage.removeItem('token');
            this.$router.push('/login');
        }
    }
};
</script>

<style scoped></style>
