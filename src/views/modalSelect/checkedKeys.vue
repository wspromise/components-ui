<template>
  <div class="box">
    <ModalSelect
      ref="modalSelectRef"
      v-model:checked-keys="checkedKeys"
      :title="title"
      :data="data"
      :confirmLoading="confirmLoading"
      :width="800"
      @ok="handleOk"
      @cancel="handleCancel"
      @register="register"
    >
    </ModalSelect>

    <a-button type="primary" @click="openModalSelect">打开modalSelect</a-button>
  </div>
</template>

<script setup>
import { ref, unref } from 'vue';
import ModalSelect, { useModalSelect } from '@/src/components/modalSelect';

/** state */
const modalSelectRef = ref(null);
const title = ref('标题');
const confirmLoading = ref(false);
const checkedKeys = ref([1, 2]);
const data = ref([
  {
    label: '111',
    value: 1,
  },
  {
    label: '222',
    value: 2,
  },
  {
    label: '333',
    value: 3,
  },
  {
    label: '444',
    value: 4,
  },
  {
    label: '555',
    value: 5,
  },
]);
const [register, { showModal, closeModal }] = useModalSelect();

/** computed */

/** watch */

/** lifecycle */

/** methods */
const handleOk = () => {
  closeModalSelect();
};
const handleCancel = () => {
  closeModalSelect();
};
const openModalSelect = () => {
  unref(modalSelectRef).showModal();
};
const closeModalSelect = () => {
  unref(modalSelectRef).closeModal();
};
</script>

<style scoped lang="less"></style>
