<template>
  <CustomModal
    ref="customModalRef"
    :title="title"
    :zIndex="1000"
    :width="500"
    okText="确定"
    cancelText="取消"
  >
    <template #content>
      <div>12345</div>
    </template>
  </CustomModal>

  <a-button class="btn-confirm" type="primary" @click="openModal">
    打开弹窗
  </a-button>
</template>

<script setup>
import { ref, unref } from 'vue';
import CustomModal from '@/src/components/Modal/index.vue';
/** props */

/** emits */

/** state */
const title = ref('标题');
const customModalRef = ref(null);
/** computed */

/** watch */

/** life cycle function */

/** methods */
const openModal = () => {
  unref(customModalRef).showModal();
};
const closeModal = () => {
  unref(customModalRef).closeModal();
};
</script>

<style lang="less" scoped></style>
