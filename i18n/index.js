import { createI18n } from 'vue-i18n';
import Qs from 'qs';
import zh_CN from './zh_CN';
import en_US from './en_US';
import { getStore, setStore } from '../utils/common';

// // 默认语言 -
// const lang = navigator.language || navigator.browserLanguage;
// const localLang = localStorage.getItem('lang')
// let default_lang = lang.slice(0, 2) === "zh" ? 'zh_CN' : 'en_US'
// if (localLang) {
//     default_lang = localLang
// } else {
//     localStorage.setItem('lang', default_lang)
// }

/**
 * 获取需要加载的语言
 */
const langMap = {
  zh: 'zh-cn',
  en: 'en-us',
};
export function getLang() {
  if (typeof window === 'undefined') return;
  // 获取url查询参数
  const paramsObj = Qs.parse(window.location.search.slice(1));
  const paramsLang = paramsObj.lang && paramsObj.lang.toLowerCase();
  const storeLang = getStore('lang') && getStore('lang').toLowerCase();
  // 获取浏览器本地语言
  const sysLang = (
    navigator.language || navigator.browserLanguage
  ).toLowerCase();
  const lang = paramsLang || storeLang || sysLang || 'zh-cn';
  const locale = langMap[lang.slice(0, 2)];
  setStore('lang', locale);
  return locale;
}

const i18n = createI18n({
  locale: getLang(),
  legacy: false,
  messages: {
    'zh-cn': zh_CN,
    'en-us': en_US,
  },
});
export default i18n; //对外暴露 i18n, 在 main.js 中挂载
