<template>
  <div class="loading-wrap" loading-tip="加载中..." title="Loading组件示例">
    <div class="loading-inner">
      <a-button type="primary" @click="openCompAbsolute">
        容器内 Loading
      </a-button>

      <Loading
        :loading="compState.loading"
        :absolute="compState.absolute"
        :theme="compState.theme"
        :background="compState.background"
        :tip="compState.tip"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { Loading } from '@/src/components/Loading';

/** state */
const compState = reactive({
  absolute: false,
  loading: false,
  theme: 'dark',
  background: 'rgba(111,111,111,.7)',
  tip: '加载中...',
});

/** computed */

/** watch */

/** lifecycle */

/** methods */
function openLoading(absolute) {
  compState.absolute = absolute;
  compState.loading = true;
  setTimeout(() => {
    compState.loading = false;
  }, 3000);
}

function openCompAbsolute() {
  openLoading(true);
}
</script>

<style scoped lang="less">
.loading-inner {
  position: relative;
  height: 100px;
}
</style>
