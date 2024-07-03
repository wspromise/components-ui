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
/** computed */

/** watch */

/** life cycle function */

/** methods */
</script>

<style lang="less" scoped></style>
