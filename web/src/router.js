// Vue Router
import Vue from 'vue';
import VueRouter from 'vue-router';

import Start from "../src/components/content/Start";

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/',
            component: Start
        }
    ]
})