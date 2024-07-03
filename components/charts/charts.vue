<template>
  <div class="echarts-container">
    <div class="echarts-header">
      <slot name="header"></slot>
    </div>
    <div
      v-if="isEmpty && !!showEmpty"
      class="no-data-wrap no-data flex flex-cent"
      :style="computedStyle"
    >
      <div class="no-data-wrap">
        <img
          class="no-data-image"
          src="@/images/no-data.png"
          width="151"
          height="123"
          alt=""
        />
        <span class="empty-first-line">
          {{ ODPTranslate('noDataFirstLine') }}
        </span>
        <span class="empty-second-line">{{
          ODPTranslate('noDataSecondLine')
        }}</span>
      </div>
    </div>
    <div v-else ref="chartsRef" :style="computedStyle"></div>
  </div>
</template>

<script setup>
import { nextTick, ref, watchEffect, computed } from 'vue';
import * as echarts from 'echarts'; // 引入echarts
import { ODPTranslate } from '../../utils/common';
// import { getZoom } from '@/utils/common.js';
/** props */
const props = defineProps({
  options: {
    type: Object,
    default: () => ({}),
  },

  themes: {
    type: String,
    default: '',
  },

  style: {
    type: Object,
    default: () => ({}),
  },

  isInitCharts: {
    type: Boolean,
    default: false,
  },
  showEmpty: {
    type: [Boolean, String],
    default: false,
  },
  //设备像素比  默认1  用于提高清晰度
  devicePixelRatio: {
    type: Number,
    default: 1,
  },
});
/** computed */
// let { echartsZoom } = getZoom();
const computedStyle = computed(() => ({
  width: '100%',
  height: '346px',
  //   zoom: echartsZoom,
  ...props.style,
}));

/** state */
const isEmpty = ref(false);
const chartsRef = ref(null);
const theme = ref(null);
let Chart = null;

// 绘制折线图
const drawChart = () => {
  Chart && Chart.dispose();
  // 父组件传来的实例参数 devicePixelRatio
  Chart = echarts.init(chartsRef.value, theme.value, {
    devicePixelRatio: props.devicePixelRatio,
  }); // 初始化echarts实例

  Chart.setOption(props.options);
  typeof window !== 'undefined' &&
    window.addEventListener('resize', () => {
      //页面大小变化后Echarts也更改大小
      Chart.resize();
    });
};

watchEffect(() => {
  const isInit = props.isInitCharts;
  if (isInit) {
    let { themes } = props;

    theme.value = themes;
    if (props.options && props.options.series[0].data.length > 0) {
      //怎么重新渲染图表
      nextTick(() => {
        drawChart();
      });
      isEmpty.value = false;
    } else {
      isEmpty.value = true;
    }
  }
});
</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 100%;
}
.echarts-header {
  padding: 10px 0 0;
  font-size: 12px;
  font-weight: bold;
  color: #0c1e5b;
}
.no-data-wrap {
  padding: 38px 0 35px;
  .no-data-image {
    margin: 0 auto 26px;
    display: block;
    text-align: center;
  }

  .empty-first-line,
  .empty-second-line {
    margin: 13px auto;
    display: block;
    text-align: center;
    font-size: 12px;
    font-weight: 400;
    line-height: 13px;
    color: #666;
  }
}
.no-data {
  display: flex;
  flex-direction: column;
  align-items: center; /*垂直居中*/
  justify-content: center; /*水平居中*/
}
</style>
