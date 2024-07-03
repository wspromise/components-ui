<template>
  <div>
    <ApiSelect
      style="width: 300px"
      :api="getSelectList"
      resultField="options"
      labelField="name"
      valueField="id"
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
import { ApiSelect } from '@/src/components/BasicForm/index.js';

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
  return {
    options: [
      {
        name: '444',
        id: '4',
      },
      {
        name: '555',
        id: '5',
      },
      {
        name: '666',
        id: '6',
      },
    ],
  };
};
</script>

<style scoped lang="less"></style>
