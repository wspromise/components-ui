# CustomModal
一个基于ant-design-vue的Modal组件实现扩展的Modal组件
<script setup>
import CustomModal from '@/views/customModal/index.vue'
import CustomModalRef from '@/views/customModal/customModalRef.vue'
import CustomModalCallback from '@/views/customModal/customModalCallback.vue'
import ConfirmLoading from '@/views/customModal/confirmLoading.vue'
</script>

## 基础用法
通过插槽传递弹窗内容
<CustomModal />
::: details 查看代码
```vue
<template>
  <CustomModal
    :title="title"
    v-model:visible="visible"
    :zIndex="1000"
    :width="500"
    okText="确定"
    cancelText="取消"
  >
    <template #content>
      <div>12345</div>
    </template>
  </CustomModal>

  <a-button class="btn-confirm" type="primary" @click="openModal"
    >打开弹窗</a-button
  >
</template>

<script setup>
import { ref } from 'vue';
import { CustomModal } from 'op-template';
/** props */

/** emits */

/** state */
const title = ref('标题');
const visible = ref(false);
/** computed */

/** watch */

/** life cycle function */

/** methods */
const openModal = () => {
  visible.value = true;
};
</script>

<style lang="less" scoped></style>

```
:::

## 另一种方式打开或关闭弹窗
通过ref获取组件实例调用打开或关闭弹窗的方法
<CustomModalRef />
::: details 查看代码
```vue
<template>
  <CustomModal
    ref="customModalRef"
    :title="title"
    :zIndex="1000"
    :width="500"
    okText="确定"
    cancelText="取消"
  >
    <template #content>
      <div>12345</div>
    </template>
  </CustomModal>

  <a-button class="btn-confirm" type="primary" @click="openModal">
    打开弹窗
  </a-button>
</template>

<script setup>
import { ref, unref } from 'vue';
import CustomModal from 'op-template';
/** props */

/** emits */

/** state */
const title = ref('标题');
const customModalRef = ref(null);
/** computed */

/** watch */

/** life cycle function */

/** methods */
const openModal = () => {
  unref(customModalRef).showModal();
};
const closeModal = () => {
  unref(customModalRef).closeModal();
};
</script>
```
:::


## 弹窗回调
点击确认或取消按钮触发传递的回调函数
<CustomModalCallback />
::: details 查看代码
```vue
<template>
  <CustomModal
    ref="customModalRef"
    :title="title"
    :zIndex="1000"
    :width="500"
    okText="确定"
    cancelText="取消"
    @Ok="handleOk"
    @cancel="handleCancel"
  >
    <template #content>
      <div>12345</div>
    </template>
  </CustomModal>

  <a-button class="btn-confirm" type="primary" @click="openModal"
    >打开弹窗</a-button
  >
</template>

<script setup>
import { ref, unref } from 'vue';
import CustomModal from 'op-template';
/** props */

/** emits */

/** state */
const title = ref('标题');
const customModalRef = ref(null);

/** computed */

/** watch */

/** life cycle function */

/** methods */
const openModal = () => {
  unref(customModalRef).showModal();
};
const handleOk = () => {
  alert('点击了确定');
};
const handleCancel = () => {
  alert('点击了取消');
};
</script>
```
:::

## ConfirmLoading
控制确认按钮loading,一般调用接口的时候使用
<ConfirmLoading />
::: details 查看代码
```vue
<template>
  <CustomModal
    ref="customModalRef"
    :title="title"
    :zIndex="1000"
    :width="500"
    okText="确定"
    cancelText="取消"
    :confirmLoading="confirmLoading"
    @Ok="handleOk"
  >
    <template #content>
      <div>12345</div>
    </template>
  </CustomModal>

  <a-button class="btn-confirm" type="primary" @click="openModal">
    打开弹窗
  </a-button>
</template>

<script setup>
import { ref, unref } from 'vue';
import CustomModal from 'op-template';
/** props */

/** emits */

/** state */
const title = ref('标题');
const customModalRef = ref(null);
const confirmLoading = ref(false);
/** computed */

/** watch */

/** life cycle function */

/** methods */
const openModal = () => {
  unref(customModalRef).showModal();
};
const closeModal = () => {
  unref(customModalRef).closeModal();
};
const handleOk = async () => {
  await new Promise((resolve, reject) => {
    confirmLoading.value = true;
    setTimeout(() => {
      resolve();
      confirmLoading.value = false;
    }, 3000);
  });
};
</script>
```
:::


## API
| 属性 |类型  |默认值  |说明  |
| --- | --- | --- | --- |
|title | [String, Slot] | - | 标题 |
|visible（v-model） | Boolean | - | 对话框是否可见 |
|zIndex | Number | 1000 | 设置 Modal 的 z-index |
|onOk | Function | - | 点击确认按钮回调 |
|onCancel | Function | - | 点击取消按钮回调 |
|confirmLoading | Boolean | - | 确认按钮loading, 在回调里面支持防抖|
|isCloseModal | Boolean | true | 执行完回调后是否需要关闭弹窗 |
|content | Slot | - | 弹框内容 |
|cancelText | String | - | 取消按钮文字 |
|okText | String | - | 确认按钮文字 |

[更多API请参考ant-design-vue的Modal组件](https://3x.antdv.com/components/modal-cn#API)