<template>
    <v-bottom-sheet hide-overlay persistent v-model="showBottomSheet">
        <v-sheet
                class="turf-page-bottom-sheet"
        >
            <span class="turf-page-motion-msg">
                {{motionText}}
                <a aria-label="learn more about cookies" role="button" tabindex="0" class="msg-link"
                   href="https://www.cookiesandyou.com/"
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
                this.setCookie('browser', this.getBrowserInfo(), 30);
                this.declineCookies();
            },
            // 获取浏览器IP
            getBrowserInfo() {
                let agent = navigator.userAgent.toLowerCase();

                let regStr_ie = /msie [\d.]+;/gi;
                let regStr_ff = /firefox\/[\d.]+/gi
                let regStr_chrome = /chrome\/[\d.]+/gi;
                let regStr_saf = /safari\/[\d.]+/gi;

                //IE
                if (agent.indexOf("msie") > 0) {
                    return agent.match(regStr_ie);
                }

                //firefox
                if (agent.indexOf("firefox") > 0) {
                    return agent.match(regStr_ff);
                }

                //Chrome
                if (agent.indexOf("chrome") > 0) {
                    return agent.match(regStr_chrome);
                }

                //Safari
                if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
                    return agent.match(regStr_saf);
                }
            },
            /**
             * 设置 Cookie
             * @param cname cookie 键名
             * @param cvalue cookie 键值
             * @param exdays cookie 存活时间 天
             */
            setCookie(cname, cvalue, exdays) {
                let d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                let expires = "expires=" + d.toGMTString();
                document.cookie = cname + "=" + cvalue + "; " + expires;
            },
            /**
             * 获取 Cookie
             * @param cname cookie 键名
             * @returns {string}
             */
            getCookie(cname) {
                let name = cname + "=";
                let ca = document.cookie.split(';');
                for (let i = 0; i < ca.length; i++) {
                    let c = ca[i].trim();
                    if (c.indexOf(name) === 0) {
                        return c.substring(name.length, c.length);
                    }
                }
                return "";
            }
        },
        created() {
            if (this.getCookie('browser')) {
                this.showBottomSheet = false;
            }
        }
    }
</script>

<style scoped>

</style>
