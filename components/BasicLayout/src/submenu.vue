<template>
  <a-sub-menu :class="['op-sub-menu', {'icon-op-sub-menu': showMenuIcon && menu.moduleIconName}]" :key="menu.id" popupClassName="odp-menu-submenu-popup">
    <template #expandIcon>
      <iconpark-icon
        :name="subMenuSelectIcon"
        class="sub-menu-select-icon"
        size="12"
      ></iconpark-icon>
    </template>
    <template v-slot:title>
      <span class="icon-wrap" v-if="showMenuIcon && menu.moduleIconName">
        <iconpark-icon :name="menu.moduleIconName" size="22"></iconpark-icon>
      </span>
      <span class="sub-menu">
          {{
            locale.includes('zh')
                ? menu.moduleNameCn
                : menu.moduleNameEn
          }}  
            <div class="op-template-message" v-if="menu.totalValue&&menu.totalValue!==0&&menu.totalValue!=='00'">
                {{  menu.totalValue > 99 ? '99+':menu.totalValue}}
    </div>
         
      </span>
   
    </template>
    <slot></slot>
  </a-sub-menu>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
const props = defineProps({
  menu: {
    type: Object,
    default() {
      return {};
    },
  },

  routeChildren: {
    type: Object,
    default() {
      return null;
    },
  },

  showMenuIcon: {
    type: Boolean,
    default: false
  }
});
const subMenuSelectIcon = ref('icon-a-Frame13213144032');
</script>
<style lang="less">
.icon-wrap {
  margin-right: 8px;
  display: flex;
  align-items: center;
}

.op-sub-menu.ant-menu-submenu {
    &.ant-menu-submenu-selected .ant-menu-submenu-title {
        font-weight: 700;
        color: #28A745 !important;

        &.sub-menu-select-icon {
            color: #28A745 !important;
        }
    }

    &.ant-menu-submenu-open .ant-menu-submenu-title {
        .sub-menu-select-icon {
            transform: rotate(180deg);
        }
    }

    &.icon-op-sub-menu .ant-menu-sub.ant-menu-inline .op-menu-item{
        padding-left: 55px !important;
    }
    
    .ant-menu-submenu-title {
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

        .ant-menu-title-content{
            display: flex;
            align-items: center;
        }

        .sub-menu-select-icon {
            transition: transform .2s;
        }
    
        &::after {
            display: none;
        }

        &:hover {
           color: #62bd75;
        }
        
        .menu-active-img {
            width: 16px;
            height: 64px;
            position: absolute;
            left: 0;
            top: 0;
        }
    }
} 
.op-template-message {
    width: 28px;
    height: 16px;
    background: #62bd75;
    color: #fff;
    text-align: center;
    line-height: 16px;
    font-size: 12px;
    border-radius: 3px;
    position: absolute;
    right: 60px;
    top: 50%;
    transform: translate(0, -50%);
    font-weight: normal;
  }
</style>
