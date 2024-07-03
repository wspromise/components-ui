<template>
  <div>
    <ApiSelect
      style="width: 300px"
      :api="getSelectList"
      :params="params"
      v-model:value="apiSelectValue"
      placeholder="ApiSelect"
      @change="handleChange"
      @selectChange="handleSelectChange"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ApiSelect } from '@/components/BasicForm/index.js';

const params = ref({
  id: '1',
});
const apiSelectValue = ref([]);
const handleChange = (val, options) => {
  console.log(val, options, 'handleChange');
};
const handleSelectChange = (val, options) => {
  console.log(val, options, 'handleSelectChange');
};

const getSelectList = params => {
  return ['666', '777', '888'];
};
</script>

<style scoped lang="less"></style>
