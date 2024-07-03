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
