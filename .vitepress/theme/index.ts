// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import { ConfigProvider } from 'ant-design-vue';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import DefaultTheme from 'vitepress/theme'
import './style.css'
import './custom.scss'
import './theme.less'
import './style/global.less'


import { setupGlobDirectives } from '../../directives/index.js'

export default {
    extends: DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            // https://vitepress.dev/guide/extending-default-theme#layout-slots
        })
    },
    async enhanceApp({ app, router, siteData }) {
        // ...
        import("ant-design-vue").then((module) => {
            app.use(module.default as any);
        });

        // 注册全局指令
        setupGlobDirectives(app)
        dayjs.locale('zh-cn');
        ConfigProvider.config({
            theme: {
                primaryColor: '#28a745',
            },
        });
    }
} satisfies Theme
