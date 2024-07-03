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
import CustomRangePicker from '@/src/components/customRangePicker/index.vue';
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

<style scoped lang="less"></style>
