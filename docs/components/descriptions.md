# Descriptions
描述组件
<script setup>
import Descriptions from '@/views/descriptions/index.vue'
import UseDescription from '@/views/descriptions/useDescription.vue'
import HasColon from '@/views/descriptions/hasColon.vue'
import AFew from '@/views/descriptions/aFew.vue'
</script>

## 基本用法
可配置插槽和render
<Descriptions />
::: details 查看代码
```vue
<template>
  <div>
    <Descriptions
      title="Descriptions 可使用render"
      :columns="columns"
      :descData="descData"
    >
      <template #slotField="{ slotsDatas }">
        <span>slots插槽传入： {{ slotsDatas.slotField }}</span>
      </template>
    </Descriptions>
  </div>
</template>

<script setup>
import { Descriptions } from 'op-template';
import { HomeOutlined, SettingFilled } from '@ant-design/icons-vue';
const columns = [
  {
    label: 'a',
    field: 'a',
  },
  {
    label: 'b',
    field: 'b',
  },
  {
    label: 'slot',
    field: 'slotField',
    width: 100, //百分比宽度
    slot: true,
  },
  {
    label: 'render',
    field: 'c',
    render: ({ h, text, record }) => {
      //可使用render
      return h('div', {}, [
        h(HomeOutlined, { style: { marginRight: '30px' } }),
        h(SettingFilled),
      ]);
    },
  },
  {
    label: 'd',
    field: 'd',
    render: () => {
      return 'asdasdasd';
    },
  },
];
const descData = {
  a: 'value-a',
  b: 'value-b',
  c: 'value-c',
  d: 'value-d',
  slotField: 'slotslotslotslotslotslotslotslot',
};
</script>
```
:::

## Hooks用法
使用Hooks传入属性和方法
<UseDescription />
::: details 查看代码
```vue
<template>
  <div>
    <Descriptions @register="register">
      <template #slotField="{ slotsDatas }">
        <span>slots插槽传入： {{ slotsDatas.slotField }}</span>
      </template>
    </Descriptions>
  </div>
</template>

<script setup>
import { Descriptions, useDescription } from 'op-template';
import { HomeOutlined, SettingFilled } from '@ant-design/icons-vue';

/** state */
const columns = [
  {
    label: 'a',
    field: 'a',
  },
  {
    label: 'b',
    field: 'b',
  },
  {
    label: 'slot',
    field: 'slotField',
    width: 100, //百分比宽度
    slot: true,
  },
  {
    label: 'render',
    field: 'c',
    render: ({ h, text, record }) => {
      //可使用render
      return h('div', {}, [
        h(HomeOutlined, { style: { marginRight: '30px' } }),
        h(SettingFilled),
      ]);
    },
  },
  {
    label: 'd',
    field: 'd',
    render: () => {
      return 'asdasdasd';
    },
  },
];
const descData = {
  a: 'value-a',
  b: 'value-b',
  c: 'value-c',
  d: 'value-d',
  slotField: 'slotslotslotslotslotslotslotslot',
};
/** methods */
const [register] = useDescription({
  title: 'useDescription',
  descData,
  columns,
  config: {
    aFew: 1, //一行几个
    labelWidth: 120,
    hasColon: true, //是否显示冒号
  },
});
</script>
```
:::

## 是否显示冒号
<HasColon />
::: details 查看代码
```vue
<template>
  <div>
    <Descriptions @register="register">
      <template #slotField="{ slotsDatas }">
        <span>slots插槽传入 {{ slotsDatas.slotField }}</span>
      </template>
    </Descriptions>
  </div>
</template>

<script setup>
import { Descriptions, useDescription } from 'op-template';
import { HomeOutlined, SettingFilled } from '@ant-design/icons-vue';

/** state */
const columns = [
  {
    label: 'a',
    field: 'a',
  },
  {
    label: 'b',
    field: 'b',
  },
  {
    label: 'slot',
    field: 'slotField',
    width: 100, //百分比宽度
    slot: true,
  },
  {
    label: 'render',
    field: 'c',
    render: ({ h, text, record }) => {
      //可使用render
      return h('div', {}, [
        h(HomeOutlined, { style: { marginRight: '30px' } }),
        h(SettingFilled),
      ]);
    },
  },
  {
    label: 'd',
    field: 'd',
    render: () => {
      return 'asdasdasd';
    },
  },
];
const descData = {
  a: 'value-a',
  b: 'value-b',
  c: 'value-c',
  d: 'value-d',
  slotField: 'slotslotslotslotslotslotslotslot',
};
/** methods */
const [register] = useDescription({
  title: 'useDescription',
  descData,
  columns,
  config: {
    aFew: 1, //一行几个
    labelWidth: 120,
    hasColon: false, //是否显示冒号
  },
});
</script>
```
:::

## 一行排列几个
<AFew />
::: details 查看代码
```vue
<template>
  <div>
    <Descriptions @register="register">
      <template #slotField="{ slotsDatas }">
        <span>slots插槽传入： {{ slotsDatas.slotField }}</span>
      </template>
    </Descriptions>
  </div>
</template>

<script setup>
import { Descriptions, useDescription } from 'op-template';
import { HomeOutlined, SettingFilled } from '@ant-design/icons-vue';

/** state */
const columns = [
  {
    label: 'a',
    field: 'a',
  },
  {
    label: 'b',
    field: 'b',
  },
  {
    label: 'slot',
    field: 'slotField',
    width: 100, //百分比宽度
    slot: true,
  },
  {
    label: 'render',
    field: 'c',
    render: ({ h, text, record }) => {
      //可使用render
      return h('div', {}, [
        h(HomeOutlined, { style: { marginRight: '30px' } }),
        h(SettingFilled),
      ]);
    },
  },
  {
    label: 'd',
    field: 'd',
    render: () => {
      return 'asdasdasd';
    },
  },
];
const descData = {
  a: 'value-a',
  b: 'value-b',
  c: 'value-c',
  d: 'value-d',
  slotField: 'slotslotslotslotslotslotslotslot',
};
/** methods */
const [register] = useDescription({
  title: 'useDescription',
  descData,
  columns,
  config: {
    aFew: 2, //一行几个
    labelWidth: 120,
    hasColon: true, //是否显示冒号
  },
});
</script>
```
:::

## API
| 属性 |类型  |默认值 |说明  |
| --- | --- | --- | --- |
|columns | Array，具体项见[下表](#columns)| - | 描述列的配置描述 |
|title | Boolean | - | 是否需要全选和取消按钮，<br />默认mode为multiple或tags 时有，combobox没有 |
|change  | Function | - | 选中 option，或 input 的 value 变化（combobox 模式下）时，调用此函数 |
|selectChange  | Function | - | 选中 option，或 input 的 value 变化（combobox 模式下）时，调用此函数 |

## columns
| 属性 |类型  |默认值 |说明  |
| --- | --- | --- | --- |
|label | Any | - | 左侧label |
|field | String | - | 数据字段key |
|width | Number | - | 这一列长度百分比 |
|render | Function | - | render函数 |