<template>
  <a-modal
    :visible="visible"
    :confirm-loading="confirmLoading"
    @ok="handleOkOrCancel('ok')"
    @cancel="handleOkOrCancel('cancel')"
    v-bind="$attrs"
  >
    <!-- 内容 -->
    <slot name="content"></slot>

    <!-- 关闭按钮 -->
    <template #closeIcon>
      <iconpark-icon
        class="close-icon"
        name="Frame1321316300"
        size="20"
      ></iconpark-icon>
    </template>

    <!-- 支持使用插槽插入 -->
    <template v-for="(slotItem, index) in getSlotList" :key="index" #[slotItem]>
      <slot :name="slotItem"></slot>
    </template>
  </a-modal>
</template>

<script setup>
import { ref } from 'vue';
import { useFilterSlots } from '../hooks/usefilterSlots';

/** props */
const props = defineProps({
  onOk: {
    type: Function,
  },

  onCancel: {
    type: Function,
  },

  confirmLoading: {
    type: Boolean,
  },

  // 执行完回调后是否需要关闭弹窗
  isCloseModal: {
    type: Boolean,
    default: true,
  },
});

/** state */
const visible = ref(false);
const slotList = ['cancelText', 'closeIcon', 'footer', 'okText', 'title'];
const [getSlotList] = useFilterSlots(slotList);
const callbackMap = { ok: props.onOk, cancel: props.onCancel };

/** methods */
// 显示弹窗
const showModal = () => {
  visible.value = true;
};

// 隐藏弹窗
const closeModal = () => {
  visible.value = false;
};

// 点击确定或遮罩层或右上角叉或取消按钮的回调
const handleOkOrCancel = async callbackType => {
  if (props.confirmLoading) return;
  const callback = callbackMap[callbackType];
  try {
    callback && (await callback());
  } catch (error) {}
  props.isCloseModal && closeModal();
};

/** lifecycle */

/** computed */

/** watch */

// 暴露方法供外部通过ref使用
defineExpose({
  showModal,
  closeModal,
});
</script>

<style lang="less">
// 弹窗样式
.ant-modal {
  .ant-modal-header {
    background: #e8e8e8;
    padding: 12px 20px;
    .ant-modal-title {
      font-weight: bold;
      color: #404040;
      font-size: 15px;
    }
  }
  .close-icon {
    color: #28a745;
  }
  .ant-modal-footer {
    // background: #f0f3f8;
    // padding: 0;
    // padding: 22px 0;
    // display: flex;
    // align-items: center;
    // justify-content: center;
  }
  .ant-modal-close {
    // margin-top: 8px;
  }
}
</style>
