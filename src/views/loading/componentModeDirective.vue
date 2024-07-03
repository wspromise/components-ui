<template>
  <div
    class="loading-wrap"
    v-loading.fullscreen="loadingRef"
    loading-tip="加载中..."
    title="Loading组件示例"
  >
    <div class="loading-inner">
      <a-button type="primary" @click="openDirectiveLoading">
        打开指令Loading
      </a-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

/** state */
const loadingRef = ref(false);

/** computed */

/** watch */

/** lifecycle */

/** methods */

function openDirectiveLoading() {
  loadingRef.value = true;
  setTimeout(() => {
    loadingRef.value = false;
  }, 2000);
}
</script>

<style scoped lang="less"></style>
