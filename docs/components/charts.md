# Charts
一个基于echarts封装的图表组件
<script setup>
import Charts from '@/src/views/charts/index.vue'
import ShowEmpty from '@/src/views/charts/showEmpty.vue'
import IsInitCharts from '@/src/views/charts/isInitCharts.vue'
import Themes from '@/src/views/charts/themes.vue'
</script>

## 基本用法
<Charts />
::: details 查看代码
::: code-group
```vue [charts.vue]
<template>
 <Charts isInitCharts :options="options" :width="'100%'" :height="'371px'" />
</template>

<script setup>
import { reactive } from 'vue';
import Charts from '../../components/charts/charts.vue';
import { optionToContent } from './echartTable.js';
/** props */

/** emits */

/** state */
const options = reactive({
  color: ['#35AD62', '#FFD566', '#FF9900', '#EBACA2'],
  toolbox: {
    show: true,
    feature: {
      dataView: {
        emphasis: {
          iconStyle: {
            borderColor: '#02993b',
          },
        },
        readOnly: true,
        title: '数据视图',
        lang: ['数据视图', '关闭'],
        optionToContent: function (opt) {
          return optionToContent(opt, '时间');
        },
      },
      saveAsImage: {
        emphasis: {
          iconStyle: {
            borderColor: '#02993b',
          },
        },
        title: '保存为图片',
      },
    },
  },
  legend: {
    bottom: 0,
    // data: ['去重正式交易笔数', '成功笔数', '去重失败笔数', '去重成功率']
  },
  grid: {
    left: '10px',
    right: '10px',
    containLabel: true,
  },
  tooltip: {
    trigger: 'axis',
  },
  // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
  xAxis: {
    type: 'category',
    data: [],
  },
  // 声明一个 Y 轴，数值轴。
  yAxis: [
    {
      splitLine: {
        show: false,
      },
      type: 'value',
    },
    {
      splitLine: {
        show: false,
      },
      type: 'value',
      axisLabel: {
        formatter: function (value, index) {
          return value.toFixed(2) + '%';
        },
      },
    },
  ],
  // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
  series: [
    {
      name: '去重正式交易笔数',
      type: 'bar',
      barGap: 0,
      countUnit: '1',
      barMaxWidth: 35,
      smooth: true,
      showSymbol: false,
      data: [1, 2, 3],
    },
    {
      name: '成功笔数',
      type: 'bar',
      countUnit: '1',
      barMaxWidth: 35,
      smooth: true,
      showSymbol: false,
      data: [1.5, 2.5, 3.5],
    },
    {
      name: '去重失败笔数',
      type: 'bar',
      countUnit: '1',
      barMaxWidth: 35,
      smooth: true,
      showSymbol: false,
      data: [2, 1, 3],
    },
    {
      name: '去重成功率',
      unit: '%',
      barMaxWidth: 35,
      barMinWidth: 10,
      type: 'line',
      smooth: true,
      yAxisIndex: 1,
      showSymbol: false,
      data: [1, 2, 3],
      tooltip: {
        valueFormatter: function (value) {
          return value.toFixed(2) + '%';
        },
      },
    },
  ],
});
</script>

```

```js [echartTable.js]
const format = num => {
  return (Number(num).toFixed(2) + '').replace(
    /\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,
    '$&,'
  );
};
export const optionToContent = (opt, title, cardType) => {
  let axisData = opt.xAxis[0].data; // 坐标数据
  let series = opt.series; // 折线图数据
  if (cardType) {
    series.unshift({
      countUnit: '1',
      name: '卡种',
      data: cardType,
    });
  }
  let result = '';
  let tdHeaders = `<td style="padding: 0 20px;line-height:24px;border:1px solid #999;text-align:left">${title}`; // 表头
  series.forEach(function (item) {
    tdHeaders +=
      '<td style="padding: 0 20px;line-height:24px;border:1px solid #999;text-align:left">' +
      item.name +
      '</td>';
  });
  let table =
    '<div style="overflow-y:auto;height: 100%;width:100%;"><table style="text-align:center; border-collapse:collapse;"><tbody><tr>' +
    tdHeaders +
    '</tr>';
  let tdBodys = '';
  // 表数据
  for (let i = 0, l = axisData.length; i < l; i++) {
    for (let j of series) {
      if (j.countUnit === '1') {
        tdBodys +=
          '<td style="padding: 0 20px;line-height:24px;border:1px solid #999;text-align:center" >' +
          j.data[i] +
          '</td>'; //组装表数据
      } else {
        tdBodys +=
          '<td style="padding: 0 20px;line-height:24px;border:1px solid #999;text-align:center">' +
          `${format(j.data[i])}${j.unit || ''}` +
          '</td>'; //组装表数据
      }
    }
    if (axisData[i] && axisData[i].length > 50) {
      result = axisData[i].substring(0, 50) + '......';
    } else {
      result = axisData[i];
    }
    table +=
      '<tr><td style="padding: 0 20px;line-height:24px;border:1px solid #999;text-align:left">' +
      result +
      '</td>' +
      tdBodys +
      '</tr>';
    tdBodys = '';
  }
  table += '</tbody></table></div>';
  return table;
};
```
:::

## 暗黑主题
<Themes />
::: details 查看代码
```vue
<template>
    <Charts
      showEmpty
      isInitCharts
      :options="options"
      :width="'100%'"
      :height="'371px'"
       themes="dark"
    />
</template>

<script setup>
import { reactive } from 'vue';
import Charts from '../../components/charts/charts.vue';
import { optionToContent } from './echartTable.js';
/** props */

/** emits */

/** state */
const options = reactive({
  color: ['#35AD62', '#FFD566', '#FF9900', '#EBACA2'],
  toolbox: {
    show: true,
    feature: {
      dataView: {
        emphasis: {
          iconStyle: {
            borderColor: '#02993b',
          },
        },
        readOnly: true,
        title: '数据视图',
        lang: ['数据视图', '关闭'],
        optionToContent: function (opt) {
          return optionToContent(opt, '时间');
        },
      },
      saveAsImage: {
        emphasis: {
          iconStyle: {
            borderColor: '#02993b',
          },
        },
        title: '保存为图片',
      },
    },
  },
  legend: {
    bottom: 0,
    // data: ['去重正式交易笔数', '成功笔数', '去重失败笔数', '去重成功率']
  },
  grid: {
    left: '10px',
    right: '10px',
    containLabel: true,
  },
  tooltip: {
    trigger: 'axis',
  },
  // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
  xAxis: {
    type: 'category',
    data: [],
  },
  // 声明一个 Y 轴，数值轴。
  yAxis: [
    {
      splitLine: {
        show: false,
      },
      type: 'value',
    },
    {
      splitLine: {
        show: false,
      },
      type: 'value',
      axisLabel: {
        formatter: function (value, index) {
          return value.toFixed(2) + '%';
        },
      },
    },
  ],
  // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
  series: [
    {
      name: '去重正式交易笔数',
      type: 'bar',
      barGap: 0,
      countUnit: '1',
      barMaxWidth: 35,
      smooth: true,
      showSymbol: false,
      data: [],
    },
    {
      name: '成功笔数',
      type: 'bar',
      countUnit: '1',
      barMaxWidth: 35,
      smooth: true,
      showSymbol: false,
      data: [],
    },
    {
      name: '去重失败笔数',
      type: 'bar',
      countUnit: '1',
      barMaxWidth: 35,
      smooth: true,
      showSymbol: false,
      data: [],
    },
    {
      name: '去重成功率',
      unit: '%',
      barMaxWidth: 35,
      barMinWidth: 10,
      type: 'line',
      smooth: true,
      yAxisIndex: 1,
      showSymbol: false,
      data: [],
      tooltip: {
        valueFormatter: function (value) {
          return value.toFixed(2) + '%';
        },
      },
    },
  ],
});
</script>
```
:::


## 空图表
<ShowEmpty />
::: details 查看代码
```vue
<template>
    <Charts
        showEmpty
        isInitCharts
        :options="options"
        :width="'100%'"
        :height="'371px'"
    />
</template>

<script setup>
import { reactive } from 'vue';
import Charts from '../../components/charts/charts.vue';
import { optionToContent } from './echartTable.js';
/** props */

/** emits */

/** state */
const options = reactive({
  color: ['#35AD62', '#FFD566', '#FF9900', '#EBACA2'],
  toolbox: {
    show: true,
    feature: {
      dataView: {
        emphasis: {
          iconStyle: {
            borderColor: '#02993b',
          },
        },
        readOnly: true,
        title: '数据视图',
        lang: ['数据视图', '关闭'],
        optionToContent: function (opt) {
          return optionToContent(opt, '时间');
        },
      },
      saveAsImage: {
        emphasis: {
          iconStyle: {
            borderColor: '#02993b',
          },
        },
        title: '保存为图片',
      },
    },
  },
  legend: {
    bottom: 0,
    // data: ['去重正式交易笔数', '成功笔数', '去重失败笔数', '去重成功率']
  },
  grid: {
    left: '10px',
    right: '10px',
    containLabel: true,
  },
  tooltip: {
    trigger: 'axis',
  },
  // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
  xAxis: {
    type: 'category',
    data: [],
  },
  // 声明一个 Y 轴，数值轴。
  yAxis: [
    {
      splitLine: {
        show: false,
      },
      type: 'value',
    },
    {
      splitLine: {
        show: false,
      },
      type: 'value',
      axisLabel: {
        formatter: function (value, index) {
          return value.toFixed(2) + '%';
        },
      },
    },
  ],
  // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
  series: [
    {
      name: '去重正式交易笔数',
      type: 'bar',
      barGap: 0,
      countUnit: '1',
      barMaxWidth: 35,
      smooth: true,
      showSymbol: false,
      data: [],
    },
    {
      name: '成功笔数',
      type: 'bar',
      countUnit: '1',
      barMaxWidth: 35,
      smooth: true,
      showSymbol: false,
      data: [],
    },
    {
      name: '去重失败笔数',
      type: 'bar',
      countUnit: '1',
      barMaxWidth: 35,
      smooth: true,
      showSymbol: false,
      data: [],
    },
    {
      name: '去重成功率',
      unit: '%',
      barMaxWidth: 35,
      barMinWidth: 10,
      type: 'line',
      smooth: true,
      yAxisIndex: 1,
      showSymbol: false,
      data: [],
      tooltip: {
        valueFormatter: function (value) {
          return value.toFixed(2) + '%';
        },
      },
    },
  ],
});
</script>
```
:::


## 可控的渲染图表
<IsInitCharts />
::: details 查看代码
```vue
<template>
  <Charts
    :isInitCharts="isInitCharts"
    :options="options"
    :width="'100%'"
    :height="'371px'"
  />
  <a-button type="primary" @click="handleRenderEcharts">渲染echarts</a-button>
</template>

<script setup>
import { reactive, ref } from 'vue';
import Charts from '../../components/charts/charts.vue';
import { optionToContent } from './echartTable.js';
/** props */

/** emits */

/** state */
const isInitCharts = ref(false);
const options = reactive({
  color: ['#35AD62', '#FFD566', '#FF9900', '#EBACA2'],
  toolbox: {
    show: true,
    feature: {
      dataView: {
        emphasis: {
          iconStyle: {
            borderColor: '#02993b',
          },
        },
        readOnly: true,
        title: '数据视图',
        lang: ['数据视图', '关闭'],
        optionToContent: function (opt) {
          return optionToContent(opt, '时间');
        },
      },
      saveAsImage: {
        emphasis: {
          iconStyle: {
            borderColor: '#02993b',
          },
        },
        title: '保存为图片',
      },
    },
  },
  legend: {
    bottom: 0,
    // data: ['去重正式交易笔数', '成功笔数', '去重失败笔数', '去重成功率']
  },
  grid: {
    left: '10px',
    right: '10px',
    containLabel: true,
  },
  tooltip: {
    trigger: 'axis',
  },
  // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
  xAxis: {
    type: 'category',
    data: [],
  },
  // 声明一个 Y 轴，数值轴。
  yAxis: [
    {
      splitLine: {
        show: false,
      },
      type: 'value',
    },
    {
      splitLine: {
        show: false,
      },
      type: 'value',
      axisLabel: {
        formatter: function (value, index) {
          return value.toFixed(2) + '%';
        },
      },
    },
  ],
  // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
  series: [
    {
      name: '去重正式交易笔数',
      type: 'bar',
      barGap: 0,
      countUnit: '1',
      barMaxWidth: 35,
      smooth: true,
      showSymbol: false,
      data: [1, 2, 3],
    },
    {
      name: '成功笔数',
      type: 'bar',
      countUnit: '1',
      barMaxWidth: 35,
      smooth: true,
      showSymbol: false,
      data: [1.5, 2.5, 3.5],
    },
    {
      name: '去重失败笔数',
      type: 'bar',
      countUnit: '1',
      barMaxWidth: 35,
      smooth: true,
      showSymbol: false,
      data: [2, 1, 3],
    },
    {
      name: '去重成功率',
      unit: '%',
      barMaxWidth: 35,
      barMinWidth: 10,
      type: 'line',
      smooth: true,
      yAxisIndex: 1,
      showSymbol: false,
      data: [1, 2, 3],
      tooltip: {
        valueFormatter: function (value) {
          return value.toFixed(2) + '%';
        },
      },
    },
  ],
});
/** methods */
const handleRenderEcharts = () => {
  isInitCharts.value = true;
};
</script>
```
:::

## API
| 属性 |类型  |默认值 |说明  |
| --- | --- | --- | --- |
|options | Object | {} | echarts配置 |
|themes | String | - | 颜色主题 'dark' |
|style  | Object | {} | echarts样式 |
|isInitCharts | Boolean | false | 是否一上来就初始化echarts |
|showEmpty | [Boolean, String] | false | 是否显示数据为空的提示语 |
|devicePixelRatio | Number | 1 | 设备像素比  默认1  用于提高清晰度 |

[更多API和配置请参考echarts官网](https://echarts.apache.org/zh/index.html)

