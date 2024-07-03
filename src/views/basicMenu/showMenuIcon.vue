<template>
  <div class="basic-menu-container">
    <BasicMenu :showMenuIcon="showMenuIcon"></BasicMenu>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BasicMenu } from '../../components/BasicLayout';
/** props */

/** emits */

/** state */
const showMenuIcon = ref(false);

/** computed */

/** watch */

/** life cycle function */

/** methods */
</script>

<style lang="less" scoped></style>
