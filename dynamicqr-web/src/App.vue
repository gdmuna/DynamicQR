<template>
    <v-app>
        <!-- 菜单栏 -->
        <MenuDrawer v-model="drawer"></MenuDrawer>
        <v-btn v-if="$route.meta.showMenuDrawer" class="fixed top-5 left-5 z-10" icon="" @click="drawer = true">
            <v-icon icon="mdi-menu-open"></v-icon>
        </v-btn>
        <!-- 主要内容区域 -->
        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script lang="js">
import MenuDrawer from '@/components/MenuDrawer.vue';

export default {
    name: 'App',
    components: {
        MenuDrawer
    },
    data() {
        return {
            drawer: false
        };
    },
    created() {
        document.addEventListener('backbutton', this.goBack);
    },
    mounted() {},
    updated() {},
    unmounted() {
        document.removeEventListener('backbutton', this.goBack);
    },
    methods: {
        // 用户在移动端设备点击后退按钮时，返回上一条路由
        goBack() {
            this.$router.go(-1);
        },
        // 用户在移动端设备点击搜索按钮时，跳转到搜索页面
        goSearch() {
            this.$router.push('/search/search');
        }
    }
};
</script>

<style scoped></style>
