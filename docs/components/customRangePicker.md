# CustomRangePicker
自定义时间范围组件，基于ant-design-vue的DatePicker日期选择框组件实现

## 基础用法
最简单的用法，在浮层中可以选择或者输入日期，如果开始时间大于结束时间则会自动调换位置。
<script setup>
import CustomRangePicker from '@/views/form/customRangePicker/customRangePicker.vue'
import CustomRangePickerSeparateSetting from '@/views/form/customRangePicker/customRangePickerSeparateSetting.vue'
import CustomRangePickerLimit from '@/views/form/customRangePicker/customRangePickerLimit.vue'
import CustomRangePickerLimitFn from '@/views/form/customRangePicker/customRangePickerLimitFn.vue'
import CustomRangePickerRanges from '@/views/form/customRangePicker/customRangePickerRanges.vue'
</script>

<CustomRangePicker />

::: details 查看代码
```vue
<template>
  <div>
    <CustomRangePicker
      v-model:value="range"
      :dateProps="{
        valueFormat: 'YYYY-MM-DD',
        showTime: true,
      }"
      @rangeChange="handleRangeChange"
    ></CustomRangePicker>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import CustomRangePicker from 'op-template';
/** state */
const range = ref([]);

/** computed */

/** watch */

/** lifecycle */

/** methods */
const handleRangeChange = e => {
  console.log(e);
};
</script>
```
:::

## 单独设置时间范围
可单独设置开始时间和结束时间props
<CustomRangePickerSeparateSetting />

::: details 查看代码
```vue
<template>
  <div>
    <CustomRangePicker
      v-model:value="range"
      :startTimeProps="{
        valueFormat: 'YYYY-MM-DD',
        showTime: true,
      }"
      :endTimeProps="{
        valueFormat: 'YYYY-MM-DD',
        showTime: false,
      }"
      @rangeChange="handleRangeChange"
    ></CustomRangePicker>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CustomRangePicker from 'op-template';
/** state */
const range = ref([]);

/** computed */

/** watch */

/** lifecycle */

/** methods */
const handleRangeChange = e => {
  console.log(e);
};
</script>

<style scoped lang="less"></style>

```
:::

## 限制时间范围
限制时间范围，可自定义提示语
<CustomRangePickerLimit />

::: details 查看代码
```vue
<template>
  <div>
    <CustomRangePicker
      v-model:value="range"
      :dateProps="{
        valueFormat: 'YYYY-MM-DD',
        showTime: true,
      }"
      :timeLength="180"
      errorMsg="时间范围不能超过半年"
      @rangeChange="handleRangeChange"
    ></CustomRangePicker>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CustomRangePicker from 'op-template';
import { showMsgWs } from '../../../utils/common';
/** state */
const range = ref([]);

/** computed */

/** watch */

/** lifecycle */

/** methods */
const handleRangeChange = e => {
  console.log(e);
};
</script>
```
:::

## 通过函数限制时间范围
使用limitTimeFn限制时间范围
<CustomRangePickerLimitFn />

::: details 查看代码
```vue
<template>
  <div>
    <CustomRangePicker
      v-model:value="range"
      :dateProps="{
        valueFormat: 'YYYY-MM-DD',
        showTime: true,
      }"
      :limitTimeFn="limitTimeFn"
      @rangeChange="handleRangeChange"
    ></CustomRangePicker>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CustomRangePicker from 'op-template';
import { showMsgWs } from '../../../utils/common';
/** state */
const range = ref([]);

/** computed */

/** watch */

/** lifecycle */

/** methods */
const handleRangeChange = e => {
  console.log(e);
};

const limitTimeFn = ({ date, dateString, type, startTime, endTime, value }) => {
  console.log(date, dateString, type, startTime, endTime, value);
  showMsgWs({
    type: 'warning',
    content: '请重新选择时间范围！',
  });
};
</script>
```
:::

## 自定义时间预设
传递ranges属性自定义时间预设，如果想要在原有时间预设基础上新增请传递range
<CustomRangePickerRanges />

::: details 查看代码
```vue
<template>
  <div>
      <CustomRangePicker
      v-model:value="range"
      :dateProps="{
          valueFormat: 'YYYY-MM-DD',
        showTime: true,
      }"
      :ranges="ranges"
    ></CustomRangePicker>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CustomRangePicker from 'op-template';
import { reactive } from 'vue';
import dayjs from 'dayjs';
/** state */
const range = ref([]);
// 自定义时间预设
const ranges = reactive({
  上个月: [
    dayjs().subtract(1, 'month').startOf('month').format('YYYY-MM-DD 00:00:00'),
    dayjs().subtract(1, 'month').endOf('month').format('YYYY-MM-DD 00:00:00'),
  ],
  本年: [
    dayjs().startOf('year').format('YYYY-MM-DD 00:00:00'),
    dayjs().endOf('year').format('YYYY-MM-DD 00:00:00'),
  ],
});
/** computed */

/** watch */

/** lifecycle */

/** methods */
</script>
```
:::

## API
| 属性 |类型  | 默认值  |说明
| --- | --- | --- | --- |
| value(v-model)|Array| [] |时间范围|
|dateProps  |Object  | 空对象 | 公共配置（同时作用于开始时间和结束时间）可选props支持ant-design-vue的 [DatePicker](https://www.antdv.com/components/date-picker-cn#api) 日期选择框的所有API |
| startTimeProps |object  | 空对象  | 开始时间的props， 可选props同上 |
| endTimeProps | object |  空对象  | 结束时间的props， 可选props同上 |
|onRangeChange  | Function | - | 时间范围change事件 |
|timeLength  | Number | - | 限制时间范围的时长, 目前系统中只有365、180、 30、 90有对应提示语，也可以通过设置errorMsg自定义提示语 |
|errorMsg  | string | - | 时间范围错误信息 |
|limitTimeFn  | Function | - |时间限制函数 <br /> <code>function({ date, dateString, type, startTime, endTime, value})</code> <br />:tada::解释<br /> date: 开始时间或结束时间的日期<br /> dateString: 开始时间或结束时间的日期<br />  type: 标记是开始时间触发还是结束时间触发，值为<code>'startTime'</code>或<code>'endTime'</code><br /> startTime: 开始时间<br/> endTime: 结束时间<br /> value: 日期范围|
|range | Object |<code>{本年(可以国际化)：['2024-01-01 00:00:00', '2024-12-31 23:59:59']}</code> | 预设时间（在原有默认的快捷选项后新增） |
|ranges | Object | {} （多个range），默认时间预设有今日、本周、近7日、本月、上个月、本年| 预设时间范围（如果传递则直接使用用户自定义的）|
|isNeedRangePresets | Boolean | true | 是否需要时间范围预设 |

[更多API请参考ant-design-vue的DatePicker组件](https://3x.antdv.com/components/date-picker-cn#API)

