# ModalSelect
一个弹窗选择组件
<script setup>
import ModalSelect from '@/views/modalSelect/index.vue'
import ShowSearch from '@/views/modalSelect/showSearch.vue'
import CheckedKeys from '@/views/modalSelect/checkedKeys.vue'
import LabelAndValueField from '@/views/modalSelect/labelAndValueField.vue'
</script>

## 基础用法
基本使用
<ModalSelect />
::: details 查看代码
```vue
<template>
  <div class="box">
    <ModalSelect
      ref="modalSelectRef"
      v-model:checked-keys="checkedKeys"
      :title="title"
      :data="data"
      :confirmLoading="confirmLoading"
      :width="800"
      @ok="handleOk"
      @cancel="handleCancel"
      @register="register"
    >
    </ModalSelect>

    <a-button type="primary" @click="openModalSelect">打开modalSelect</a-button>
    <div>{{ checkedKeys }}</div>
  </div>
</template>

<script setup>
import { ref, unref } from 'vue';
import { ModalSelect, useModalSelect } from 'op-template';

/** state */
const modalSelectRef = ref(null);
const title = ref('标题');
const confirmLoading = ref(false);
const checkedKeys = ref([]);
const data = ref([
  {
    label: '111',
    value: 1,
  },
  {
    label: '222',
    value: 2,
  },
  {
    label: '333',
    value: 3,
  },
  {
    label: '444',
    value: 4,
  },
  {
    label: '555',
    value: 5,
  },
]);
const [register, { showModal, closeModal }] = useModalSelect();

/** computed */

/** watch */

/** lifecycle */

/** methods */
const handleOk = () => {
  closeModalSelect();
};
const handleCancel = () => {
  closeModalSelect();
};
const openModalSelect = () => {
  unref(modalSelectRef).showModal();
};
const closeModalSelect = () => {
  unref(modalSelectRef).closeModal();
};
</script>

```
:::

## 是否显示搜索框
传递showSearch属性来控制搜索框的显示
<ShowSearch />
::: details 查看代码
```vue
<template>
  <div class="box">
    <ModalSelect
      ref="modalSelectRef"
      v-model:checked-keys="checkedKeys"
      :showSearch="false"
      :title="title"
      :data="data"
      :confirmLoading="confirmLoading"
      :width="800"
      @ok="handleOk"
      @cancel="handleCancel"
      @register="register"
    >
    </ModalSelect>

    <a-button type="primary" @click="openModalSelect">打开modalSelect</a-button>
    <div>{{ checkedKeys }}</div>
  </div>
</template>

<script setup>
import { ref, unref } from 'vue';
import { ModalSelect, useModalSelect } from 'op-template';

/** state */
const modalSelectRef = ref(null);
const title = ref('标题');
const confirmLoading = ref(false);
const checkedKeys = ref([]);
const data = ref([
  {
    label: '111',
    value: 1,
  },
  {
    label: '222',
    value: 2,
  },
  {
    label: '333',
    value: 3,
  },
  {
    label: '444',
    value: 4,
  },
  {
    label: '555',
    value: 5,
  },
]);
const [register, { showModal, closeModal }] = useModalSelect();

/** computed */

/** watch */

/** lifecycle */

/** methods */
const handleOk = () => {
  closeModalSelect();
};
const handleCancel = () => {
  closeModalSelect();
};
const openModalSelect = () => {
  unref(modalSelectRef).showModal();
};
const closeModalSelect = () => {
  unref(modalSelectRef).closeModal();
};
</script>

```
:::

## 回显数据
根据传递的checkedKeys属性来回显选中的数据
<CheckedKeys />
::: details 查看代码
```vue
<template>
  <div class="box">
    <ModalSelect
      ref="modalSelectRef"
      v-model:checked-keys="checkedKeys"
      :showSearch="false"
      :title="title"
      :data="data"
      :confirmLoading="confirmLoading"
      :width="800"
      @ok="handleOk"
      @cancel="handleCancel"
      @register="register"
    >
    </ModalSelect>

    <a-button type="primary" @click="openModalSelect">打开modalSelect</a-button>
  </div>
</template>

<script setup>
import { ref, unref } from 'vue';
import { ModalSelect, useModalSelect } from 'op-template';

/** state */
const modalSelectRef = ref(null);
const title = ref('标题');
const confirmLoading = ref(false);
const checkedKeys = ref([1, 2]);
const data = ref([
  {
    label: '111',
    value: 1,
  },
  {
    label: '222',
    value: 2,
  },
  {
    label: '333',
    value: 3,
  },
  {
    label: '444',
    value: 4,
  },
  {
    label: '555',
    value: 5,
  },
]);
const [register, { showModal, closeModal }] = useModalSelect();

/** computed */

/** watch */

/** lifecycle */

/** methods */
const handleOk = () => {
  closeModalSelect();
};
const handleCancel = () => {
  closeModalSelect();
};
const openModalSelect = () => {
  unref(modalSelectRef).showModal();
};
const closeModalSelect = () => {
  unref(modalSelectRef).closeModal();
};
</script>

```
:::

## 设置数据的label和value字段
传递labelField和valueField字段
<LabelAndValueField />
::: details 查看代码
```vue
<template>
  <div class="box">
    <ModalSelect
      ref="modalSelectRef"
      v-model:checked-keys="checkedKeys"
      :showSearch="false"
      :title="title"
      :data="data"
      labelField="name"
      valueField="id"
      :confirmLoading="confirmLoading"
      :width="800"
      @ok="handleOk"
      @cancel="handleCancel"
      @register="register"
    >
    </ModalSelect>

    <a-button type="primary" @click="openModalSelect">打开modalSelect</a-button>
  </div>
</template>

<script setup>
import { ref, unref } from 'vue';
import { ModalSelect, useModalSelect } from 'op-template';

/** state */
const modalSelectRef = ref(null);
const title = ref('标题');
const confirmLoading = ref(false);
const checkedKeys = ref([1, 2]);
const data = ref([
  {
    name: '111',
    id: 1,
  },
  {
    name: '222',
    id: 2,
  },
  {
    name: '333',
    id: 3,
  },
  {
    name: '444',
    id: 4,
  },
  {
    name: '555',
    id: 5,
  },
]);
const [register, { showModal, closeModal }] = useModalSelect();

/** computed */

/** watch */

/** lifecycle */

/** methods */
const handleOk = () => {
  closeModalSelect();
};
const handleCancel = () => {
  closeModalSelect();
};
const openModalSelect = () => {
  unref(modalSelectRef).showModal();
};
const closeModalSelect = () => {
  unref(modalSelectRef).closeModal();
};
</script>

```
:::



## API
| 属性 |类型  |默认值  |说明  |
| --- | --- | --- | --- |
|title | [String, Slot] | - | 标题 |
|width | [String, Number] | '700px' | 弹窗宽度 |
|onOk | Function | - | 点击确认按钮回调 |
|onCancel | Function | - | 点击取消按钮回调 |
|okText | String | - | 确认按钮文字 |
|cancelText | String | - | 取消按钮文字 |
|confirmLoading | Boolean | false | 确认按钮loading, 在回调里面支持防抖|
|loading | Boolean | false | 列表loading |
|showSearch | Boolean | true | 是否显示搜索 |
|placeholder | String | '' | 搜索placeholder |
|checkedKeys | Array | [] | 选中的keys |
|data | Array | [] | 可选择的数据 |
|labelField | String | 'label' | 可选择的数据中label显示的字段 |
|valueField | String | 'value' | 可选择的数据中value取值的字段 |

[更多API请参考ant-design-vue的Modal组件](https://3x.antdv.com/components/modal-cn#API)