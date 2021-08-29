<template>
  <v-app id="node-turf-app">

    <page-header @changeNavDrawerShow="changeNavDrawerShow"></page-header>

    <v-navigation-drawer app v-model="showNavigationDraw" class="turf-page-drawer" :class="mobileClass">
      <div class="turf-page-drawer-title" :style="{display: displayDrawerTitle}">Node Turf 文档</div>
      <v-list>
        <v-list-group
            :value="true"
            prepend-icon="mdi-account-circle"
        >
          <template v-slot:activator>
            <v-list-item-title>Users</v-list-item-title>
          </template>

          <v-list-group
              :value="true"
              no-action
              sub-group
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Admin</v-list-item-title>
              </v-list-item-content>
            </template>

          </v-list-group>

          <v-list-group
              no-action
              sub-group
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Actions</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
                v-for="([title, icon], i) in cruds"
                :key="i"
                link
            >
              <v-list-item-title v-text="title"></v-list-item-title>

              <v-list-item-icon>
                <v-icon v-text="icon"></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <!--主页面-->
    <v-main class="turf-page-main" id="turf-main-page">
      <v-container class="turf-page-main-content">
        <v-scroll-y-transition mode="out-in">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </v-scroll-y-transition>
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
      cruds: [
        ['Create', 'mdi-plus-outline'],
        ['Read', 'mdi-file-outline'],
        ['Update', 'mdi-update'],
        ['Delete', 'mdi-delete'],
      ],
    }
  },
  computed: {
    displayDrawerTitle() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 'block';
        case 'sm':
          return 'block';
        case 'md':
          return 'block';
        default:
          return 'none';
      }
    },
    mobileClass() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 'mobile-page-drawer';
        case 'sm':
          return 'mobile-page-drawer';
        case 'md':
          return 'mobile-page-drawer';
        default:
          return '';
      }
    },
  },
  watch: {},
  methods: {
    // 控制抽屉展示
    changeNavDrawerShow() {
      this.showNavigationDraw = !this.showNavigationDraw;
    },
  },
  mounted() {
  },
};
</script>

<style>
@import url("assets/css/common.css");
</style>
