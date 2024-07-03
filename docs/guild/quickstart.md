# 快速开始
本节将介绍如何在项目中使用 Oceanpayment UI


## vue.config.js配置文件（如果使用了vue-cli）
> [!NOTE]
> 在配置文件中添加 <code>transpileDependencies: ['/op-template/']</code>选项，将其转义成ES5的低级语法，更好的兼容浏览器。
## 在项目main.js中设置表格的配置
```
import { opGlobalConfig } from 'op-template'
opGlobalConfig.tableConfig({
    showListSetting: true, // 是否显示列表设置
    menuFieldsList: api1, // 获取表格列表设置的接口 
    menuFieldsSave: api2 // 保存表格列表设置的接口
})
```

## 在项目main.js中设置表单的配置
```
import { opGlobalConfig } from 'op-template'
opGlobalConfig.searchFormConfig({
    openSearchCache: 1 // 是否开启搜索缓存（0-关闭 1-开启）
})
```

## 在项目main.js中引入全局样式
```
import 'op-template/src/assets/style/global.less'
```

## 用法

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