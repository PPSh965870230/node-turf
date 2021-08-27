<template>
    <v-app id="node-turf-app">

        <page-header @changeNavDrawerShow="changeNavDrawerShow"></page-header>

        <v-navigation-drawer app v-model="showNavigationDraw" class="turf-page-drawer">
            <v-treeview
                    activatable
                    open-all
                    :items="items"
            ></v-treeview>
        </v-navigation-drawer>

        <!--主页面-->
        <v-main class="turf-page-main" id="turf-main-page">
            <v-container class="turf-page-main-content">
            </v-container>
        </v-main>

        <!--Cookies请求提醒-->
        <cookies-motion></cookies-motion>

        <!--返回顶部-->
        <return-top></return-top>
    </v-app>
</template>

<script>

    import PageHeader from "./components/viewStructure/PageHeader";
    import CookiesMotion from "./components/viewStructure/CookiesMotion";
    import ReturnTop from "./components/viewStructure/ReturnTop";

    export default {
        name: "App",
        components: {ReturnTop, CookiesMotion, PageHeader},
        data() {
            return {
                showNavigationDraw: true,
                content: "",
                items: [
                    {
                        id: 1,
                        name: 'Applications :',
                        children: [
                            {id: 2, name: 'Calendar : app'},
                            {id: 3, name: 'Chrome : app'},
                            {id: 4, name: 'Webstorm : app'},
                        ],
                    },
                    {
                        id: 5,
                        name: 'Documents :',
                        children: [
                            {
                                id: 6,
                                name: 'vuetify :',
                                children: [
                                    {
                                        id: 7,
                                        name: 'src :',
                                        children: [
                                            {id: 8, name: 'index : ts'},
                                            {id: 9, name: 'bootstrap : ts'},
                                        ],
                                    },
                                ],
                            },
                            {
                                id: 10,
                                name: 'material2 :',
                                children: [
                                    {
                                        id: 11,
                                        name: 'src :',
                                        children: [
                                            {id: 12, name: 'v-btn : ts'},
                                            {id: 13, name: 'v-card : ts'},
                                            {id: 14, name: 'v-window : ts'},
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: 15,
                        name: 'Downloads :',
                        children: [
                            {id: 16, name: 'October : pdf'},
                            {id: 17, name: 'November : pdf'},
                            {id: 18, name: 'Tutorial : html'},
                        ],
                    },
                    {
                        id: 19,
                        name: 'Videos :',
                        children: [
                            {
                                id: 20,
                                name: 'Tutorials :',
                                children: [
                                    {id: 21, name: 'Basic layouts : mp4'},
                                    {id: 22, name: 'Advanced techniques : mp4'},
                                    {id: 23, name: 'All about app : dir'},
                                ],
                            },
                            {id: 24, name: 'Intro : mov'},
                            {id: 25, name: 'Conference introduction : avi'},
                        ],
                    },
                ],
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
