<template>
  <div class="loading-wrap" loading-tip="加载中..." title="Loading组件示例">
    <div class="loading-inner">
      <a-button type="primary" @click="openFnFullLoading">
        全屏 Loading
      </a-button>
    </div>
  </div>
</template>

<script setup>
import { createVNode } from 'vue';
import { useLoading } from '@/src/components/Loading';
/** state */

/** computed */

/** watch */

/** lifecycle */

/** methods */
const [openFullLoading, closeFullLoading] = useLoading({
  //   tip: '加载中...',
  tip: createVNode('div', undefined, '3333333'),
});

function openFnFullLoading() {
  openFullLoading();

  setTimeout(() => {
    closeFullLoading();
  }, 2000);
}
</script>

<style scoped lang="less"></style>
