<template>
  <div>
    <SelectPlus
      style="width: 300px"
      v-model:value="value"
      mode="multiple"
      :buttons="true"
      :options="options"
      placeholder="Please Select"
      @change="handleChange"
      @selectChange="handleSelectChange"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SelectPlus from '@/src/components/select/index.vue';

const value = ref([]);
const options = ref([
  {
    label: '111',
    value: '1',
  },
  {
    label: '222',
    value: '2',
  },
]);
const handleChange = (val, options) => {};
const handleSelectChange = (val, options) => {};
</script>
