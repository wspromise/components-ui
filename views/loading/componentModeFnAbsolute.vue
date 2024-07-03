<template>
  <div class="loading-wrap" loading-tip="加载中..." title="Loading组件示例">
    <div class="loading-inner" ref="wrapEl">
      <a-button type="primary" @click="openFnWrapLoading">
        容器内 Loading
      </a-button>
    </div>
  </div>
</template>

<script setup>
import { ref, createVNode } from 'vue';
import { useLoading } from '@/components/Loading';
/** state */
const wrapEl = ref(null);
/** computed */

/** watch */

/** lifecycle */

/** methods */
const [openWrapLoading, closeWrapLoading] = useLoading({
  target: wrapEl,
  props: {
    // tip: '加载中...',
    tip: createVNode('div', undefined, '2222222222'),
    absolute: true,
  },
});

function openFnWrapLoading() {
  openWrapLoading();

  setTimeout(() => {
    closeWrapLoading();
  }, 2000);
}
</script>

<style scoped lang="less">
.loading-inner {
  position: relative;
  height: 100px;
}
</style>
