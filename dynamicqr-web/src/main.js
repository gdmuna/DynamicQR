// Vue
import { createApp } from 'vue';

// Vue-Router
import router from '@/router';

// Pinia
import { createPinia } from 'pinia';
const pinia = createPinia();
import store from '@/stores/store';

// Vuetify
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
const vuetify = createVuetify({
    icons: {
        defaultSet: 'mdi'
    }
});

// Vuesax
import Vuesax from 'vuesax-alpha';
import 'vuesax-alpha/theme-chalk/index.css';
import 'vuesax-alpha/theme-chalk/dark/css-vars.css';

// App Entry
import App from '@/App.vue';

// global styles
import '@/style.css';

// api
import api from '@/api/api';

const app = createApp(App)
    .use(router)
    .use(pinia)
    .use(store)
    .use(vuetify)
    .use(Vuesax, {
        colors: {
            primary: 'rgb(36, 159, 253)',
            success: 'rgb(23, 201, 100)',
            danger: 'rgb(242, 19, 93)',
            warning: 'rgb(255, 130, 0)',
            dark: 'rgb(36, 33, 69)'
        }
    })
    .use(api)
    .mount('#app');
