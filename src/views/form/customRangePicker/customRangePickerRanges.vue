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
import CustomRangePicker from '@/src/components/customRangePicker/index.vue';
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

<style scoped lang="less"></style>
