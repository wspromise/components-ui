<template>
  <div class="header">
    <div class="layout-header-left">
      <iconpark-icon
        size="22"
        name="Frame1321316234"
        class="white menu-icon"
        @click="goCenter"
      ></iconpark-icon>
      <div class="menu-line"></div>
      <img class="logo" src="../../../assets/images/logo.png" alt="" />
      <span class="tips">{{ getTips() }}</span>
    </div>
    <div class="layout-header-right">
      <!-- 帮助中心 -->
      <slot name="help-center"></slot>
      <!-- 消息 -->
      <slot name="message"></slot>
      <div v-if="showFullScreen" class="icon-bg">
        <a-tooltip placement="bottom">
          <iconpark-icon
            v-show="!flag"
            size="20"
            name="Frame1321315606"
            class="full-screen analytics-menu-item white"
            @click="controlFullScreen"
          ></iconpark-icon>
          <iconpark-icon
            size="20"
            name="Frame1321315605"
            v-show="flag"
            class="full-screen analytics-menu-item white"
            @click="controlFullScreen"
          ></iconpark-icon>
          <template #title>全屏模式</template>
        </a-tooltip>
      </div>
      <div v-if="showFullScreen" class="menu-line"></div>
      <!-- 控制台 -->
      <slot name="controlBoard"></slot>
      <!-- 设置 -->
      <slot name="setting"></slot>
      <a-dropdown v-if="showLang" v-model:visible="visible">
        <div class="ant-dropdown-link" @click.prevent>
          <span class="current-lang">
            {{ langMap[getLocale] }}
          </span>
          <iconpark-icon name="Frame-1-7on38ohk" class="white"></iconpark-icon>
        </div>
        <template #overlay>
          <a-menu @click="handleChangeLocale($event)">
            <a-menu-item v-for="(lang, key) in langMap" :key="key"
              ><span class="lang-change">{{ lang }}</span></a-menu-item
            >
          </a-menu>
        </template>
      </a-dropdown>
      <div v-if="showLang" class="menu-line"></div>
      <!-- 账户号 -->
      <slot name="account-number"></slot>
      <div v-if="showUserInfo" class="user-name-wrap analytics-menu-item">
        <iconpark-icon
          size="24"
          class="user-icon white"
          name="Frame1321315282"
        ></iconpark-icon>

        <a-tooltip class="user-inner" placement="bottom">
          <template #title>{{ userName }}</template>
          <span class="user-name">{{ userName }}</span>
        </a-tooltip>
      </div>
      <div v-if="showUserInfo" class="menu-line"></div>
      <div v-if="showLogout" class="icon-bg exit-button">
        <a-tooltip class="user-inner" placement="bottom">
          <template #title>退出登录</template>
          <iconpark-icon
            class="odpm-cursor hover-style white"
            :size="24"
            name="Frame1321315607"
            @click="handleSignOut"
          ></iconpark-icon>
        </a-tooltip>
      </div>
    </div>
  </div>
</template>

<script setup>
import { h, ref } from 'vue';
import { Modal } from 'ant-design-vue';
import dayjs from 'dayjs';
import {
  controlFullScreen,
  listenFullScreen,
  ODPTranslate,
  toCenterSysUrlMap,
  setStore,
} from '../../../utils/common';
const props = defineProps({
  userName: {
    type: String,
    default: '',
  },
  getLocale: {
    type: String,
    default: '',
  },
  handleChangeLocale: {
    type: Function,
  },
  handleSignOut: {
    type: Function,
  },
  // 是否显示全屏
  showFullScreen: {
    type: Boolean,
    default: true,
  },
  // 是否显示国际化
  showLang: {
    type: Boolean,
    default: true,
  },
  // 是否显示用户信息
  showUserInfo: {
    type: Boolean,
    default: true,
  },
  // 是否显示退出登录
  showLogout: {
    type: Boolean,
    default: true,
  },
});
const visible = ref(false);
const flag = ref(false);
const langMap = {
  'zh-cn': 'CN',
  'en-us': 'EN',
};
listenFullScreen(e => {
  if (typeof document === 'undefined') return;
  const {
    fullscreenElement,
    webkitFullscreenElement,
    mozFullScreenElement,
    webkitIsFullScreen,
    mozFullScreen,
  } = document;

  const fullScreeningElement =
    fullscreenElement ||
    webkitFullscreenElement ||
    mozFullScreenElement ||
    webkitIsFullScreen ||
    mozFullScreen;
  flag.value = !!fullScreeningElement;
});

const getTips = () => {
  let todayTime = dayjs(new Date()).format('YYYY-MM-DD'); // 今日日期
  let now = new Date().getTime(); // 现在时间
  let time4 = new Date(`${todayTime} 04:00`).getTime(); // 今日4点时间
  let time9 = new Date(`${todayTime} 09:00`).getTime(); // 今日9点时间
  let time12 = new Date(`${todayTime} 12:00`).getTime();
  let time1330 = new Date(`${todayTime} 13:30`).getTime();
  let time1730 = new Date(`${todayTime} 17:30`).getTime();
  let time2230 = new Date(`${todayTime} 22:30`).getTime();
  if (now >= time4 && now < time9) {
    return ODPTranslate('earlyMorning');
  } else if (now >= time9 && now < time12) {
    return ODPTranslate('am');
  } else if (now >= time12 && now < time1330) {
    return ODPTranslate('noon');
  } else if (now >= time1330 && now < time1730) {
    return ODPTranslate('afternoon');
  } else if (now >= time1730 && now < time2230) {
    return ODPTranslate('sunset');
  } else {
    return ODPTranslate('night');
  }
};
const goCenter = () => {
  if (typeof window === 'undefined') return;
  try {
    window.location.href = `${toCenterSysUrlMap[process.env.VUE_APP_MODE]}`;
  } catch (error) {}
};
</script>

<style scoped lang="less">
.header {
  height: 65px;
  display: flex;
  line-height: 65px;
  align-items: center;
  font-size: 24px;
  justify-content: space-between;
  background: linear-gradient(90deg, #03993c 0%, #34ad62 100%);
  color: #fff;
  .layout-header-right {
    display: flex;
    align-items: center;
    .analytics-menu-item {
      display: flex;
      color: #fff;
      cursor: pointer;
    }

    .ant-dropdown-link {
      display: flex;
      align-items: center;
      font-size: 14px;
      height: 30px;
      cursor: pointer;
    }
  }
  .current-lang {
    margin-right: 10px;
    font-size: 14px;
    font-weight: bold;
    line-height: 30px;
    color: #fff;
  }
  .lang-change {
    color: #fff;
    font-size: 14px;
  }
  .user-name-wrap {
    display: flex;
    align-items: center;
    line-height: normal;
    .user-name {
      padding: 0 0 0 8px;
      font-size: 14px;
      font-weight: bold;
      color: #fff;
    }
  }
  .odpm-cursor {
    cursor: pointer;
  }
  .exit-button {
    line-height: normal;
    color: #778ba2;
    margin-right: 45px;
  }

  .white {
    color: #fff;
  }
  .menu-line {
    width: 1px;
    height: 16px;
    background-color: #fff;
    margin: 0 40px;
  }
  .layout-header-left {
    display: flex;
    align-items: center;
    .menu-icon {
      width: 16px;
      height: 16px;
      margin-left: 23px;
      cursor: pointer;
    }
    .menu-line {
      margin: 0 20px;
    }
    .logo {
      width: 153px;
    }
    .tips {
      font-size: 16px;
      margin-left: 40px;
    }
  }
  .icon-bg {
    width: 30px;
    height: 30px;
    background-color: rgba(255, 255, 255, 0);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
  }
  .icon-bg:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
}
</style>
