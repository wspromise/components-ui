# FooterBar
一个底部的组件容器，通过默认插槽插入内容
<script setup>
import FooterBar from '@/views/footerBar/index.vue'
</script>

## 用法
传递footerBottom属性，控制距离底部距离
<FooterBar />
::: details 查看代码
```vue
<template>
  <div class="box">
    <FooterBar footerBottom="100px" extra="123">
      <a-button class="btn-return" @click="handleCancel">
        取消
      </a-button>
      <a-button
        class="btn-confirm"
        type="primary"
        @click.prevent="handleSubmit"
      >
      提交
      </a-button>
    </FooterBar>
  </div>
</template>

<script setup>
import {FooterBar} from 'op-template';
/** props */

/** emits */

/** state */

/** computed */

/** watch */

/** life cycle function */

/** methods */
const handleCancel = () => {};
const handleSubmit = () => {};
</script>

<style lang="less" scoped>
.box {
  position: relative;
  width: 100%;
  height: 200px;
  background-color: #ccc;
}
</style>

```
:::

## API
| 属性 |类型  |默认值  |说明  |
| --- | --- | --- | --- |
|footerBottom | String | '0px' | 距离容器底部的距离 |
|prefixCls | String | 'ant-pro-footer-toolbar' | 容器class名字 |
|extra | [String, Object] | - | 额外的信息展示 |

