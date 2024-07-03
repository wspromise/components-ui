<template>
  <div
    :class="prefixCls"
    :style="{
      transition: '0.3s all',
      bottom: footerBottom,
    }"
  >
    <div style="float: left">
      <slot name="extra">{{ extra }}</slot>
    </div>
    <div style="text-align: center">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'FooterBar',
  props: {
    footerBottom: {
      type: String,
      default: '0',
    },
    prefixCls: {
      type: String,
      default: 'ant-pro-footer-toolbar',
    },
    extra: {
      type: [String, Object], //扩展信息提示
      default: '',
    },
  },
});
</script>
<style scoped lang="less">
.ant-pro-footer-toolbar {
  position: absolute;
  width: 100%;
  bottom: 0;
  right: 0;
  height: 97px;
  box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.03);
  background: #fff;
  border-top: 1px solid #ececec;
  padding: 30px 24px;
  z-index: 9;

  &:after {
    content: '';
    display: block;
    clear: both;
  }
}
</style>
