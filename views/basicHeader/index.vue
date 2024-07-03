<template>
  <div class="basic-header-container">
    <BasicHeader
      userName="arvin123"
      getLocale="zh-cn"
      :handleChangeLocale="handleChangeLocale"
      :handleSignOut="handleSignOut"
    >
    </BasicHeader>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BasicHeader } from '../../components/BasicLayout';
/** props */

/** emits */

/** state */
/** computed */

/** watch */

/** life cycle function */

/** methods */
const handleChangeLocale = () => {};
const handleSignOut = () => {};
</script>

<style lang="less" scoped></style>
