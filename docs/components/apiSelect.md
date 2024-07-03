# ApiSelect
一个基于SelectPlus组件实现，可以通过请求配置，来远程加载数据的下拉框的组件

## 基础用法
传递api请求函数和params请求参数来获取接口返回的下拉框数据。
<script setup>
import ApiSelect from '@/src/views/form/apiSelect/apiSelect.vue'
import ApiSelectCustom from '@/src/views/form/apiSelect/apiSelectCustom.vue'
import ApiSelectAuto from '@/src/views/form/apiSelect/apiSelectAuto.vue'
import SelectPlus from '@/src/views/form/selectPlus.vue'
</script>

<ApiSelect />
::: details 查看代码

```vue
<template>
  <div>
    <ApiSelect
      style="width: 300px"
      :api="getSelectList"
      :params="params"
      v-model:value="apiSelectValue"
      mode="multiple"
      placeholder="ApiSelect"
      @change="handleChange"
      @selectChange="handleSelectChange"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ApiSelect } from 'op-template';

const params = ref({
  id: '1',
});
const apiSelectValue = ref([]);
const handleChange = (val, options) => {
  console.log(val, options, 'handleChange');
};
const handleSelectChange = (val, options) => {
  console.log(val, options, 'handleSelectChange');
};

const getSelectList = params => {
  return [
    {
      label: '111',
      value: '1',
    },
    {
      label: '222',
      value: '2',
    },
    {
      label: '333',
      value: '3',
    },
  ];
};
</script>

```
:::


## 自定义 label、value、options取值字段
传递resultField、labelField、valueField属性，方便数据结构转换。
<ApiSelectCustom />

::: details 查看代码
```vue
<template>
  <div>
    <ApiSelect
      style="width: 300px"
      :api="getSelectList"
      resultField="options"
      labelField="name"
      valueField="id"
      :params="params"
      v-model:value="apiSelectValue"
      placeholder="ApiSelect"
      @change="handleChange"
      @selectChange="handleSelectChange"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ApiSelect } from 'op-template';

const params = ref({
  id: '1',
});
const apiSelectValue = ref([]);
const handleChange = (val, options) => {
  console.log(val, options, 'handleChange');
};
const handleSelectChange = (val, options) => {
  console.log(val, options, 'handleSelectChange');
};

const getSelectList = params => {
  return {
    options: [
      {
        name: '111',
        id: '1',
      },
      {
        name: '222',
        id: '2',
      },
      {
        name: '333',
        id: '3',
      },
    ],
  };
};
</script>
```
:::

## 自动判断label和value字段取值
如果数组元素非对象则直接使用该值作为label和value字段
<ApiSelectAuto />
::: details 查看代码
```vue
<template>
  <div>
    <ApiSelect
      style="width: 300px"
      :api="getSelectList"
      :params="params"
      v-model:value="apiSelectValue"
      placeholder="ApiSelect"
      @change="handleChange"
      @selectChange="handleSelectChange"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ApiSelect } from 'op-template';

const params = ref({
  id: '1',
});
const apiSelectValue = ref([]);
const handleChange = (val, options) => {
  console.log(val, options, 'handleChange');
};
const handleSelectChange = (val, options) => {
  console.log(val, options, 'handleSelectChange');
};

const getSelectList = params => {
  return ['666', '777', '888'];
};
</script>
```
:::

## 是否需要全选和全不选按钮
传递buttons属性，仅mode为'multiple'或'tags'生效
<SelectPlus />
::: details 查看代码
```vue
<template>
  <div>
    <ApiSelect
      style="width: 300px"
      v-model:value="apiSelectValue"
      mode="multiple"
      :buttons="true"
      :options="options"
      placeholder="Please Select"
      @change="handleChange"
      @selectChange="handleSelectChange"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ApiSelect } from 'op-template';

const apiSelectValue = ref([]);
const options = ref([
  {
    label: '111',
    value: '1',
  },
  {
    label: '222',
    value: '2',
  },
]);
const handleChange = (val, options) => {
  console.log(val, options, 'handleChange');
};
const handleSelectChange = (val, options) => {
  console.log(val, options, 'handleSelectChange');
};
</script>

```
:::

## API
| 属性 |类型  |默认值  |说明  |
| --- | --- | --- | --- |
|api  |Promise  | - |数据接口，接受一个 Promise 对象  |
| params |object  |-  | 接口参数。此属性改变时会自动重新加载接口数据 |
|resultField  | string | - | 接口返回的字段，如果接口返回数组，可以不填。支持x.x.x格式 |
|labelField  | string | label | 下拉数组项内label显示文本的字段，支持x.x.x格式 |
|valueField  | string | value | 下拉数组项内value显示文本的字段，支持x.x.x格式 |
|mode | 'multiple', 'tags',  'combobox' | - | 设置 Select 的模式为多选或标签 |
|change  | Function | - | 选中 option，或 input 的 value 变化（combobox 模式下）时，调用此函数 |
|selectChange  | Function | - | 选中 option，或 input 的 value 变化（combobox 模式下）时，调用此函数 |

[更多API请参考ant-design-vue的Select组件](https://3x.antdv.com/components/select-cn#API)

