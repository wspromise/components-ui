<template>
  <div class="box">
    <ModalSelect
      ref="modalSelectRef"
      v-model:checked-keys="checkedKeys"
      :title="title"
      :data="data"
      labelField="name"
      valueField="id"
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
const checkedKeys = ref([]);
const data = ref([
  {
    name: '111',
    id: 1,
  },
  {
    name: '222',
    id: 2,
  },
  {
    name: '333',
    id: 3,
  },
  {
    name: '444',
    id: 4,
  },
  {
    name: '555',
    id: 5,
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
