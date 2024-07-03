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
import CustomRangePicker from '@/components/customRangePicker/index.vue';
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
