# SelectPlus
一个支持全选和全不选操作的组件
<script setup>
import SelectPlus from '@/src/views/form/selectPlus.vue'
</script>

## 是否需要全选和全不选按钮
传递buttons属性，仅mode为'multiple'或'tags'生效
<SelectPlus />
::: details 查看代码
```vue
<template>
  <div>
    <SelectPlus
      style="width: 300px"
      v-model:value="value"
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
import { SelectPlus } from 'op-template';

const value = ref([]);
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
| 属性 |类型  |默认值 |说明  |
| --- | --- | --- | --- |
|mode | 'multiple', 'tags',  'combobox' | - | 设置 Select 的模式为多选或标签 |
|buttons | Boolean | - | 是否需要全选和取消按钮，<br />默认mode为multiple或tags 时有，combobox没有 |
|change  | Function | - | 选中 option，或 input 的 value 变化（combobox 模式下）时，调用此函数 |
|selectChange  | Function | - | 选中 option，或 input 的 value 变化（combobox 模式下）时，调用此函数 |

[更多API请参考ant-design-vue的Select组件](https://3x.antdv.com/components/select-cn#API)

