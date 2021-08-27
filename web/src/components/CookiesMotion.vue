<template>
    <v-bottom-sheet hide-overlay persistent v-model="showBottomSheet">
        <v-sheet
                class="turf-page-bottom-sheet"
        >
            <span class="turf-page-motion-msg">
                {{motionText}}
                <a aria-label="learn more about cookies" role="button" tabindex="0" class="msg-link" href=""
                   target="_blank">Learn more</a>
            </span>
            <div class="turf-page-cookies-motion-confirm">
                <a aria-label="deny cookies" role="button" @click="declineCookies" tabindex="0" class="cc-btn cc-deny">Decline</a>
                <a aria-label="allow cookies" role="button" @click="allowCookies" tabindex="0" class="cc-btn cc-allow">Allow
                    cookies</a>
            </div>
        </v-sheet>
    </v-bottom-sheet>
</template>

<script>
    export default {
        name: "CookiesMotion",
        data() {
            return {
                showBottomSheet: true,
                motionText: 'This website uses cookies to ensure you get the best experience on our website.',
            }
        },
        methods: {
            // 关闭使用Cookies提醒
            declineCookies() {
                this.showBottomSheet = false;
            },
            // 同意使用Cookies
            allowCookies() {
                localStorage.setItem('Cookies', 'test');
                this.declineCookies();
            }
        },
        created() {
            let Cookies = localStorage.getItem('Cookies');
            if (Cookies) {
                this.showBottomSheet = false;
            }
        }
    }
</script>

<style scoped>

</style>
