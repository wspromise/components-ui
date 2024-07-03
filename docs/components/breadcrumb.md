# Breadcrumb
一个自定义的面包屑组件
<script setup>
import Breadcrumb from '@/src/views/breadcrumb/index.vue'
</script>

## 用法
传递breadList面包屑数据
<Breadcrumb />
::: details 查看代码
```vue
<template>
  <div class="breadcrumb-container">
    <Breadcrumb :breadList="breadList" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Breadcrumb } from 'op-template';

/** props */

/** emits */

/** state */
const breadList = ref(['信息中心', '交易查询', '正式交易']);
/** computed */

/** watch */

/** life cycle function */

/** methods */
</script>

```
:::

## API
| 属性 |类型  |默认值  |说明  |
| --- | --- | --- | --- |
|breadList | Array | [] | 面包屑数据, 例如["交易查询", "正式交易"] |

