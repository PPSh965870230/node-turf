<template>
    <v-app id="node-turf-app">

        <page-header @changeNavDrawerShow="changeNavDrawerShow"></page-header>

        <v-navigation-drawer app v-model="showNavigationDraw" class="turf-page-drawer">
            <v-list>
                <v-list-item v-for="item in 100" :key="item" @click="getItem(item)">{{ item }}</v-list-item>
            </v-list>
        </v-navigation-drawer>

        <!--主页面-->
        <v-main class="turf-page-main" id="turf-main-page">
            <v-container class="turf-page-main-content">
                <v-list>
                    <v-list-item v-for="item in 100">{{item + content}}</v-list-item>
                </v-list>
            </v-container>
        </v-main>

        <!--Cookies请求提醒-->
        <cookies-motion></cookies-motion>

        <!--返回顶部-->
        <return-top></return-top>
    </v-app>
</template>

<script>

    import PageHeader from "./components/PageHeader";
    import CookiesMotion from "./components/CookiesMotion";
    import ReturnTop from "./components/ReturnTop";

    export default {
        name: "App",
        components: {ReturnTop, CookiesMotion, PageHeader},
        data() {
            return {
                showNavigationDraw: true,
                content: "",
            }
        },
        methods: {
            // 控制抽屉展示
            changeNavDrawerShow() {
                this.showNavigationDraw = !this.showNavigationDraw;
            },
            getItem(text) {
                this.content = text;
            },
        }
    };
</script>

<style>
    @import url("assets/css/common.css");
</style>
