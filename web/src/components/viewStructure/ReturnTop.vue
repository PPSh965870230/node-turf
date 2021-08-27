<template>
    <v-fab-transition>
        <v-btn
                fab
                bottom
                left
                class="turf-page-go-top"
                @click="goToTop"
                v-show="showGoToTopBtn"
                title="返回顶部"
        >
            <template>
                <svg viewBox="0 0 24 24" role="img" aria-hidden="true" class="v-icon__svg" style="color: #fff;">
                    <path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"></path>
                </svg>
            </template>
        </v-btn>
    </v-fab-transition>
</template>

<script>
    export default {
        name: "ReturnTop",
        data() {
            return {
                showGoToTopBtn: false,
            }
        },
        methods: {
            goToTop() {
                document.documentElement.scrollTop = document.body.scrollTop = 0;
                // 注意： 这里不能写scrollTop=0,因为这样的话只是重新赋值，并不能设置滚动距离
            },
            // 初始化滚动
            initScrollListener() {
                let _this = this;
                let initScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                _this.showGoToTopBtn = initScrollTop >= 200;
                window.onscroll = function () {
                    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                    console.log(scrollTop);
                    _this.showGoToTopBtn = scrollTop >= 200;
                }
            },
        },
        mounted() {
            this.initScrollListener();
        }
    }
</script>

<style scoped>

</style>
