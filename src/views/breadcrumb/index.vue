<template>
  <div class="breadcrumb-container">
    <Breadcrumb :breadList="breadList" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Breadcrumb from '@/src/components/Breadcrumb/index.vue';

/** props */

/** emits */

/** state */
const breadList = ref(['信息中心', '交易查询', '正式交易']);
/** computed */

/** watch */

/** life cycle function */

/** methods */
</script>

<style lang="less" scoped></style>
