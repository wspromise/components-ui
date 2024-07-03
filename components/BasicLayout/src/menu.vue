<template>
  <div>
    <div class="menu">
      <a-tabs
        v-model:activeKey="menuActive"
        tab-position="top"
        class="menu-item"
        @change="e => menuChange(computedFormatMenuData[e])"
      >
        <a-tab-pane
          v-for="(item, i) in computedFormatMenuData"
          :key="i"
          :tab="locale.includes('zh') ? item.moduleNameCn : item.moduleNameEn"
        ></a-tab-pane>
      </a-tabs>

      <div class="menu-main">
        <div class="menu-list-container" :style="isCollapsed.subMenuStyle">
          <div class="menu-list-inner" :style="menuListHeight">
            <a-menu
              v-for="(subItem, i) in subMenuList"
              :key="subItem.id"
              v-model:selectedKeys="selectedKeys"
              v-model:openKeys="openKeys"
              mode="inline"
              :class="['menu-nav', { 'menu-nav-collapsed': collapsed }]"
            >
              <Menus
                :menu="subItem"
                :showMenuIcon="showMenuIcon"
                @setSelectedKeys="setSelectedKeys"
                @setOpenKeys="setOpenKeys"
                :showMessageList="showMessageList"
              />
            </a-menu>
          </div>

          <iconpark-icon
            class="collapsed-icon"
            size="40"
            @click="handleCollapsed"
            :name="isCollapsed.icon"
          ></iconpark-icon>
        </div>
        <div class="solt" :style="getMainStyle">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, unref, watch, onMounted, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import {
  getZoom,
  isExternalLink,
  getStore,
  setStore,
} from '../../../utils/common';
import Menus from './menus.vue';
import { traverse } from './utils';

const props = defineProps({
  //判断是哪个项目监听的事件
  onListenMenuCollapsed: {
    type: Function,
  },
  permissionMenu: {
    type: Array,
    default: () => [],
  },
  extraPermissionMenu: {
    type: Array,
    default: () => [],
  },
  showMenuIcon: {
    type: Boolean,
    default: false,
  },
  childrenField: {
    type: String,
    default: 'treeNodeList',
  },
  // 是否显示国际化
  showLang: {
    type: Boolean,
    default: true,
  },
  showMessageList: {
    type: Object,
    default: {},
  },
});
const emit = defineEmits(['listenMenuCollapsed']);
const selectedKeys = ref(['']);
const openKeys = ref(['']);
const route = useRoute();
const router = useRouter();
const { locale } = props.showLang ? useI18n() : { locale: 'zh-cn' };
const collapsed = ref(false);
const menuActive = ref(0);
const menuChange = item => {
  let url = item.children[0];
  if (!url || url.moduleType === 2) {
    url = item;
  }
  navigateTo(url);
};
const handleCollapsed = () => {
  collapsed.value = !collapsed.value;
  //监听wpms 展开收缩
  props.onListenMenuCollapsed && emit('listenMenuCollapsed', collapsed.value);
};
const hnaldeTraverse = ({ childrenField, permissionMenu }) => {
  const traverse = (data, parent = null, level = 0) => {
    return data.reduce((p, item, index) => {
      const children = item[childrenField];
      const hasChildren = children && children.length > 0;
      const isLeaf = !hasChildren;
      const parentId =
        item.moduleParentId !== undefined ? item.moduleParentId : item.parentId;
      const id = item.moduleId !== undefined ? item.moduleId : item.id;

      const node = {
        id,
        parentId,
        isLeaf,
        level,
        parentKeys: [],
        childrenKeys: [],
        children: [],
        ...item,
      };
      level === 0 && (node.activeKey = index);

      if (parent) {
        const parentKey = parent.id;
        node.parentKeys = [parentKey, ...parent.parentKeys];
      }

      if (hasChildren) {
        const menuNodeChildren = traverse(children, node, level + 1);
        const childrenKeys = menuNodeChildren.reduce((p, node) => {
          const keys = node.childrenKeys;
          p.push(...keys, node.id);
          return p;
        }, []);
        node.children = menuNodeChildren;
        node.childrenKeys = childrenKeys;
      }

      p.push(node);
      return p;
    }, []);
  };
  const result = traverse(permissionMenu);
  return result;
};
// 标准化菜单数据
const computedFormatMenuData = computed(() => {
  const { permissionMenu, childrenField } = props;
  return hnaldeTraverse({ childrenField, permissionMenu });
});
// 生成菜单Map
const computedMenuMap = computed(() => {
  const menuMap = new Map();
  traverse(unref(computedFormatMenuData), item => {
    let { id, routerUrl } = item;
    id && menuMap.set(id, item);
    routerUrl !== undefined && menuMap.set(routerUrl, item);
  });
  return menuMap;
});
// 标准化额外的菜单数据
const computedFormatExtraMenuData = computed(() => {
  const { extraPermissionMenu, childrenField } = props;
  return hnaldeTraverse({ childrenField, permissionMenu: extraPermissionMenu });
});

// 生成菜单Map
const computedExtraMenuMap = computed(() => {
  const menuMap = new Map();
  traverse(unref(computedFormatExtraMenuData), item => {
    let { id, routerUrl } = item;
    id && menuMap.set(id, item);
    routerUrl !== undefined && menuMap.set(routerUrl, item);
  });
  return menuMap;
});

const isCollapsed = computed(() => {
  if (collapsed.value) {
    return {
      //   subMenuStyle: 'width: 0px;',
      subMenuStyle: 'margin-left: -256px;',
      subMenuNavStyle: 'visibility: hidden;',
      icon: 'Frame1321316357',
    };
  } else {
    return {
      //   subMenuStyle: 'width: 256px;',
      subMenuStyle: 'margin-left: 0;',
      subMenuNavStyle: '',
      icon: 'Frame1321316355',
    };
  }
});

const subMenuList = computed(() => {
  // moduleType '菜单类型 1-菜单 2-按钮 3-链接 4-系统',
  try {
    let list = unref(computedFormatMenuData)[menuActive.value].children;
    return list && list.length && list[0].moduleType !== 2
      ? list
      : [unref(computedFormatMenuData)[menuActive.value]];
  } catch (error) {
    return [];
  }
});

let { floatBodyZoom } = getZoom();

const menuListHeight = {
  height: `calc(${
    100 / floatBodyZoom < 100 ? 100 : 100 / floatBodyZoom
  }vh - 130px)`,
};

const getMainStyle = computed(() => {
  let height = 100 / floatBodyZoom;
  return `max-height:calc(${height < 100 ? 100 : height}vh - 129px)`;
});

/** methods */
const setSelectedKeys = keys => {
  selectedKeys.value = keys;
  setStore('menuId', keys.toString());
};

const setOpenKeys = keys => {
  openKeys.value = keys;
};

const navigateTo = item => {
  let url = '';
  if (item.routerUrl) {
    url = item.routerUrl;
  } else if (item.children && item.children.length) {
    url = item.children[0].routerUrl;
  }

  if (url) {
    isExternalLink(url)
      ? typeof window !== 'undefined' && window.open(url)
      : router.push(url);
  }
};
const setSelect = () => {
  let menuMap = unref(computedMenuMap);
  // 获取菜单项
  let menuItem = menuMap.get(route.path);

  if (menuItem) {
    // 展开菜单
    setOpenKeys([menuItem.parentId]);

    // 通过parentKeys查最顶级的父级
    let { parentKeys, id } = menuItem;
    let rootParentKey = parentKeys[parentKeys.length - 1] ?? id;
    let rootParent = menuMap.get(rootParentKey);

    // 设置active
    rootParent && (menuActive.value = rootParent.activeKey);
  }
};
const updateMenuId = () => {
  let menuMap = unref(computedExtraMenuMap);
  // 获取菜单项
  let menuItem = menuMap.get(route.path);
  menuItem && setStore('menuId', menuItem.id);
};
watch(
  route,
  () => {
    setSelect();
    updateMenuId();
    nextTick(() => {
      let menuId = localStorage.getItem('menuId');
      let lastMenuId = localStorage.getItem('lastMenuId');
      // 判断是否切换了菜单
      if (menuId !== lastMenuId) {
        setStore('searchFormCacheData', {});
        // 同步新的menuId
        setStore('lastMenuId', menuId);
      }
    });
  },
  {
    immediate: true,
  }
);
onMounted(() => {
  setSelect();
});
</script>

<style scoped lang="less">
:deep(.menu) {
  .menu-item {
    height: 64px;
    background-color: #fff;
    box-shadow: 0px 18px 36px 0px rgba(0, 0, 0, 0.05);
    position: relative;
    z-index: 2;
    padding-left: 32px;
    .ant-tabs-nav {
      height: 100%;
    }
    .ant-tabs-tab-btn {
      padding: 5px 20px;
      font-size: 16px;
      color: #7c828f;
      &:hover {
        color: #62bd75;
      }
    }

    .ant-tabs-tab-active > .ant-tabs-tab-btn {
      color: #fff !important;
      background-color: #28a745;
      border-radius: 4px;
    }
    .ant-tabs-ink-bar {
      display: none;
    }
  }
  .menu-main {
    display: flex;
    .menu-list-container {
      width: 256px;
      transition: all 0.4s;
      min-height: 100%;
      background: #ffffff;
      position: relative;

      .menu-list-inner {
        overflow-y: auto;
        .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
          background-color: #f5f5f5;
        }
      }

      .collapsed-icon {
        cursor: pointer;
        position: absolute;
        color: #bfc5d3;
        top: 30%;
        right: -25px;
        &:hover {
          color: #62bd75;
        }
      }
    }
    .solt {
      flex: 1;
      width: 0;
      padding: 20px 20px 0;
      //   max-height: calc(100vh - 130px);
      overflow-y: auto;
    }

    .sub-menu-nav:hover {
      color: #62bd75;
    }
  }

  .menu-active {
    color: #fff !important;
    background-color: #62bd75;
    border-radius: 4px;
  }
  .sub-menu-active {
    font-weight: bold;
    color: #333333 !important;
    background-color: #f5f5f5;
  }
}
</style>
