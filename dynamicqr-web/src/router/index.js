import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: '',
        redirect: '/login'
    },
    {
        path: '/demo',
        name: 'demo',
        component: () => import('@/pages/demo/demo.vue'),
        meta: {
            title: '示例页面',
            showMenuDrawer: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/auth/login.vue'),
        meta: {
            title: '用户登录'
        }
    },
    {
        path: '/manage',
        name: 'manage',
        component: () => import('@/pages/qrcode/manage.vue'),
        meta: {
            title: '活码管理',
            showMenuDrawer: true
        }
    },
    {
        path: '/create',
        name: 'create',
        component: () => import('@/pages/qrcode/create.vue'),
        meta: {
            title: '活码创建',
            showMenuDrawer: true
        }
    },
    {
        path: '/show',
        name: 'show',
        component: () => import('@/pages/qrcode/show.vue'),
        meta: {
            title: 'DynamicQR'
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
