<template>
  <a-menu-item
    :key="routeChildren.id"
    @click.capture="handleLink"
    style="display: flex"
    :class="[
      'op-menu-item',
      {
        'menu-item-active': menuActive(menu),
        'padding-menu-item': !(
          showMenuIcon &&
          menu.moduleIconName &&
          menu.parentKeys &&
          menu.parentKeys.length < 2
        ),
      },
    ]"
  >
    <template #icon>
      <iconpark-icon
        v-if="
          showMenuIcon &&
          menu.moduleIconName &&
          menu.parentKeys &&
          menu.parentKeys.length < 2
        "
        :name="menu.moduleIconName"
        size="22"
      ></iconpark-icon>
    </template>
    <span
      :title="locale.includes('zh') ? menu.moduleNameCn : menu.moduleNameEn"
    >
      {{ locale.includes('zh') ? menu.moduleNameCn : menu.moduleNameEn }}
    </span>
    <div class="op-menu-item-message" v-if="getMessage.show">
      {{ getMessage.count > 99 ? '99+' : getMessage.count }}
    </div>
    <img
      v-show="menuActive(menu)"
      class="menu-active-img"
      src="../../../assets/images/selected-submenu-icon.png"
      alt=""
    />
  </a-menu-item>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import { isExternalLink } from '../../../utils/common';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const { t, locale } = useI18n();

const props = defineProps({
  menu: {
    type: Object,
    default() {
      return null;
    },
  },
  routeChildren: {
    type: Object,
    default: () => null,
  },
  onSetSelectedKeys: {
    type: Function,
  },
  onSetOpenKeys: {
    type: Function,
  },
  showMenuIcon: {
    type: Boolean,
    default: false,
  },
  showMessageList: {
    type: Object,
    default: {},
  },
});

const getMessage = computed(() => {
  let key = props.menu.routerUrl.slice(1);
  let count = props.showMessageList[key];
  return {
    show: [undefined, null, 0, '0', ''].includes(count) ? false : true,
    count,
  };
});

const handleLink = () => {
  // moduleType '菜单类型 1-菜单 2-按钮 3-链接 4-系统',
  const { moduleType, routerUrl } = props.routeChildren;
  if (moduleType === 3) {
    if (typeof window === 'undefined') return;
    if (isExternalLink(routerUrl)) window.open(routerUrl);
    else if (route.path !== routerUrl) window.open(routerUrl);
  } else {
    if (isExternalLink(routerUrl) && typeof window !== 'undefined')
      window.open(routerUrl);
    else if (route.path !== routerUrl) router.push(routerUrl);
  }
};

const menuActive = item => {
  try {
    if (
      item.routerUrl === route.path ||
      item.routerUrl === route.fullPath ||
      item.routerUrl === route.matched[route.matched.length - 2].path
    ) {
      props.onSetSelectedKeys([item.id]);
    }
    return (
      item.routerUrl === route.path ||
      item.routerUrl === route.matched[route.matched.length - 2].path
    );
  } catch (error) {
    return false;
  }
};
</script>

<style lang="less">
.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
  background-color: #f5f5f5;
}

.op-menu-item {
  margin: 0 !important;
  padding: 0 20px 0 25px !important;
  width: 100%;
  height: 64px;
  min-height: 64px !important;
  position: relative;
  box-sizing: border-box;
  line-height: 64px;
  font-size: 14px;
  color: #333;
  padding-left: 64px;
  padding: 0 20px 0 64px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  cursor: pointer;

  &.padding-menu-item {
    // padding-left: 55px !important;
  }

  &:hover {
    color: #62bd75;
  }

  &::after {
    display: none;
  }

  &.menu-item-active {
    font-weight: 700;
    color: #28a745 !important;
    background-color: #f5f5f5 !important;
  }

  .menu-active-img {
    width: 16px;
    height: 64px;
    position: absolute;
    left: 0;
    top: 0;
  }
  .op-menu-item-message {
    width: 28px;
    height: 16px;
    background: #62bd75;
    color: #fff;
    text-align: center;
    line-height: 16px;
    font-size: 12px;
    border-radius: 3px;
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translate(0, -50%);
    font-weight: normal;
  }
}
</style>
