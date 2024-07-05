<template>
    <v-navigation-drawer v-model="_drawer" temporary>
        <v-list>
            <v-list-item title="DynamicQR"></v-list-item>
        </v-list>
        <v-divider class="border-opacity-75"></v-divider>
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
        return {};
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
    updated() {},
    unmounted() {},
    methods: {}
};
</script>

<style scoped></style>
