<template>
  <div class="modal-select-container">
    <CustomModal
      v-model:visible="visible"
      class="select-modal-box"
      :destroyOnClose="true"
      :title="title"
      :width="width"
      @cancel="handleCancel"
      @ok="onOk"
      :okText="okText"
      :cancelText="cancelText"
      :confirm-loading="confirmLoading"
    >
      <template #content>
        <a-spin :spinning="loading">
          <div class="modal-select-wrap">
            <div class="select-wrap">
              <a-input
                v-if="showSearch"
                v-model:value="searchText"
                class="search-input"
                :placeholder="placeholder"
                @keyup.enter="handleSearch"
              >
                <template #suffix>
                  <div class="render-search-icon" @click="handleSearch">
                    <slot name="render-search-icon">
                      <iconpark-icon
                        name="Frame1321315598"
                        size="14"
                      ></iconpark-icon>
                    </slot>
                  </div>
                </template>
              </a-input>

              <a-checkbox-group
                v-model:value="checkedKeys"
                @change="handleCheckboxGroupChange"
              >
                <template v-for="item in selectDataList" :key="item.value">
                  <a-col v-show="!item.hidden" :span="24">
                    <a-checkbox
                      class="modal-select-checkbox"
                      :value="item.value"
                      :disabled="item.disabled"
                      @change="handleCheckboxChange($event, item)"
                    >
                      <!-- 前缀 -->
                      <span class="render-prefix">
                        <slot
                          name="render-prefix"
                          :data="{
                            option: item.originData,
                            checked: item.checked,
                          }"
                        >
                          <iconpark-icon
                            name="Frame-8o980fbi"
                            size="20"
                          ></iconpark-icon>
                        </slot>
                      </span>

                      <span class="render-label">
                        <slot
                          name="render-label"
                          :data="{
                            option: item.originData,
                            checked: item.checked,
                          }"
                        >
                          {{ item.label }}
                        </slot>
                      </span>

                      <!-- 后缀 -->
                      <span class="render-suffix">
                        <slot
                          name="render-suffix"
                          :data="{
                            option: item.originData,
                            checked: item.checked,
                          }"
                        ></slot>
                      </span>
                    </a-checkbox>
                  </a-col>
                </template>
              </a-checkbox-group>
            </div>

            <div class="selected-wrap">
              <div class="selected-content">
                <div class="title">
                  {{ ODPTranslate('selectedContent') }}
                </div>
                <div class="selected-count">
                  {{ computedSelectedData.length }}
                </div>
              </div>
              <div class="selected-list-wrap">
                <div
                  class="selected-list-inner"
                  v-for="data in computedSelectedData"
                  :key="data.value"
                >
                  <div
                    :class="['render-deselect', { disabled: data.disabled }]"
                    @click="handleDeselect(data)"
                  >
                    <slot
                      name="render-deselect"
                      :data="{
                        option: data.originData,
                        checked: data.checked,
                      }"
                    >
                      <iconpark-icon
                        name="Frame1321316010"
                        size="20"
                      ></iconpark-icon>
                    </slot>
                  </div>

                  <div class="render-selected-label">
                    <slot
                      name="render-selected-label"
                      :data="{
                        option: data.originData,
                        checked: data.checked,
                      }"
                    >
                      {{ data.label }}
                    </slot>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a-spin>
      </template>
    </CustomModal>
  </div>
</template>

<script setup>
import { ref, unref, watch, computed, onMounted, watchEffect } from 'vue';
import CustomModal from '../Modal/index.vue';
import { traverse } from './utils';
import i18n from '../../i18n';
import { ODPTranslate } from '../../utils/common.js';

/** state */
const props = defineProps({
  // 弹窗标题
  title: {
    type: String,
    default: '',
  },
  // 弹窗宽度
  width: {
    type: [String, Number],
    default: '700px',
  },
  // 弹窗确认事件
  onOk: {
    type: Function,
  },
  // 弹窗取消事件
  onCancel: {
    type: Function,
  },
  // 确认按钮文本
  okText: {
    type: String,
    default: i18n.global.t('common.submit'),
  },
  // 取消按钮文本
  cancelText: {
    type: String,
    default: i18n.global.t('common.cancel'),
  },
  // 确认按钮loading
  confirmLoading: {
    type: Boolean,
    default: false,
  },
  // 列表loading
  loading: {
    type: Boolean,
    default: false,
  },
  // 是否显示搜索
  showSearch: {
    type: Boolean,
    default: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  // 选中的keys
  checkedKeys: {
    type: Array,
    default: () => [],
  },
  // 可选择的数据
  data: {
    type: Array,
    default: () => [],
  },
  labelField: {
    type: String,
    default: 'label',
  },
  valueField: {
    type: String,
    default: 'value',
  },
});
const emits = defineEmits(['update:checked-keys', 'register']);
const visible = ref(false);
// 搜索文本
const searchText = ref('');
// 选中的keys
const checkedKeys = ref([]);
// 下拉数据列表
const selectDataList = ref([]);

/** computed */
// 生成map映射
const computedSelectMap = computed(() => {
  const selectMap = new Map();
  traverse(unref(selectDataList), item => selectMap.set(item.value, item));
  return selectMap;
});

// 计算已选中的数据
const computedSelectedData = computed(() => {
  const selectMap = unref(computedSelectMap);
  const selectedData = [];
  traverse(unref(checkedKeys), key => {
    let data = selectMap.get(key);
    selectedData.push(data);
  });
  return selectedData;
});

/** watch */
// sync props checkedKeys
watch(
  () => unref(props.checkedKeys),
  keys => keys && (checkedKeys.value = keys),
  { immediate: true }
);
// 格式化为标准数据
watchEffect(() => {
  const { data, labelField, valueField } = props;
  const selectData = [];
  traverse(data, item => {
    let option = {
      label: item[labelField],
      value: item[valueField],
      hidden: false,
      checked: false,
      disabled: item.disabled,
      originData: item,
    };
    selectData.push(option);
  });
  selectDataList.value = selectData;
});
/** lifecycle */

/** methods */
// 弹窗事件
const showModal = () => {
  visible.value = true;
};

// 关闭弹窗
const closeModal = () => {
  // 清空搜索内容，重置列表
  if (props.showSearch) {
    searchText.value = '';
    handleSearch();
  }
  visible.value = false;
};
const handleCancel = () => {
  let { onCancel } = props;
  onCancel && onCancel();
  closeModal();
};

// 更新节点的隐藏状态
const doUpdateHiddenStatus = (node, hidden) => {
  node.hidden = hidden;
};

// 更新节点的选中状态
const doUpdateCheckedStatus = (node, checked) => {
  node.checked = checked;
};

// 搜索(操作数据的隐藏状态)
const handleSearch = () => {
  // 搜索内容
  const searchVal = unref(searchText).toLowerCase();
  const selectData = unref(selectDataList);
  traverse(selectData, item => {
    const label = String(item.label).toLowerCase();
    // 节点隐藏状态
    const hidden = !label.includes(searchVal);
    doUpdateHiddenStatus(item, hidden);
  });
};

// 取消选中
const handleDeselect = data => {
  const { value, disabled } = data;
  if (disabled) return;

  // 更新节点的选中状态
  const selectMap = unref(computedSelectMap);
  const node = selectMap.get(value);
  doUpdateCheckedStatus(node, false);

  // 更新组件内的checkedKeys
  const checkedKeysList = unref(checkedKeys);
  let newCheckedKeys = checkedKeysList.filter(key => key !== value);
  checkedKeys.value = newCheckedKeys;

  // 更新外部的checkedKeys
  handleCheckboxGroupChange();
};

const handleCheckboxGroupChange = () => {
  emits('update:checked-keys', unref(checkedKeys));
};

const handleCheckboxChange = (e, item) => {
  let checked = e.target.checked;
  doUpdateCheckedStatus(item, checked);
};

// 获取所有选中的key值
const getCheckedKeys = () => unref(checkedKeys);
// 获取所有选中的数据
const getCheckedDataList = () => unref(computedSelectedData);

const exposeMethods = {
  showModal,
  closeModal,
  getCheckedKeys,
  getCheckedDataList,
};
// 暴露方法供外部通过ref使用
defineExpose(exposeMethods);
onMounted(() => {
  emits('register', exposeMethods);
});
</script>

<style lang="less">
.select-modal-box {
  .ant-modal-body {
    padding: 0;
  }
}
</style>

<style scoped lang="less">
@import './index.less';
</style>
