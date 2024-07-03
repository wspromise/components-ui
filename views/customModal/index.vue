<template>
  <CustomModal
    :title="title"
    v-model:visible="visible"
    :zIndex="1000"
    :width="500"
    okText="确定"
    cancelText="取消"
  >
    <template #content>
      <div>12345</div>
    </template>
  </CustomModal>

  <a-button class="btn-confirm" type="primary" @click="openModal"
    >打开弹窗</a-button
  >
</template>

<script setup>
import { ref } from 'vue';
import CustomModal from '@/components/Modal/index.vue';
/** props */

/** emits */

/** state */
const title = ref('标题');
const visible = ref(false);
/** computed */

/** watch */

/** life cycle function */

/** methods */
const openModal = () => {
  visible.value = true;
};
</script>

<style lang="less" scoped></style>
