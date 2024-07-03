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
import CustomRangePicker from '@/components/customRangePicker/index.vue';
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

<style scoped lang="less"></style>
