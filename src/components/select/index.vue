<template>
  <a-select
    showArrow
    allowClear
    :getPopupContainer="triggerNode => triggerNode.parentNode"
    v-bind="$attrs"
    :mode="mode"
    :style="style"
    :placeholder="placeholder"
    :max-tag-count="maxTagCount"
    :dropdown-class-name="computedDropdownClassName"
    :optionFilterProp="fieldNames.label"
    :field-names="fieldNames"
    @change="handleChange"
  >
    <template
      v-if="['multiple', 'tags'].includes(mode)"
      #dropdownRender="{ menuNode: menu }"
    >
      <div v-if="buttons && $attrs.options?.length" class="operation-buttons">
        <a-button
          type="primary"
          class="select-all"
          @click="handleSelect(true)"
          >{{ ODPTranslate('selectAll') }}</a-button
        >
        <a-button @click="handleSelect(false)">{{
          ODPTranslate('cancel')
        }}</a-button>
      </div>

      <v-nodes :vnodes="menu" />
    </template>

    <template
      v-for="(slotItem, index) in getSlotList"
      :key="index"
      #[slotItem]="slotsParams"
    >
      <slot :name="slotItem" :slotsParams="slotsParams"></slot>
    </template>
  </a-select>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  components: {
    VNodes: (_, { attrs }) => {
      return attrs.vnodes;
    },
  },
});
</script>

<script setup>
import { computed, useAttrs } from 'vue';
import { useFilterSlots } from '../hooks/usefilterSlots';
// import { useI18n } from 'vue-i18n';
import { ODPTranslate } from '../../utils/common';

/** props */
// const { t } = useI18n();
const attrs = useAttrs();
const props = defineProps({
  // 设置 Select 的模式为多选或标签
  mode: {
    type: String,
    default: 'combobox',
  },
  // 设置下拉框样式
  style: {
    type: Object,
    default: { minWidth: '200px' },
  },
  // 选择框默认文字
  placeholder: {
    type: String,
    default: '',
  },
  // 最多显示多少个 tag
  maxTagCount: {
    type: [Number, String],
    default: 1,
  },
  // 自定义节点 label、value、options 的字段
  fieldNames: {
    type: Object,
    default: () => ({ label: 'label', value: 'value' }),
  },
  // change事件
  onChange: {
    type: Function,
  },
  // 是否需要按钮
  buttons: {
    type: Boolean,
    default: true,
  },
});

/** state */
const emits = defineEmits(['update:value']);
const slotList = [
  'clearIcon',
  'dropdownRender',
  'maxTagPlaceholder',
  'menuItemSelectedIcon',
  'notFoundContent',
  'option',
  'placeholder',
  'removeIcon',
  'suffixIcon',
  'tagRender',
  'label',
];
const { getSlotList } = useFilterSlots(slotList);

/** computed */
const computedDropdownClassName = computed(() =>
  props.mode === 'multiple'
    ? 'ant-select-multiple-dropdown'
    : 'ant-select-dropdown'
);

// 计算所有options的值
const computedAllOptionValue = computed(() => {
  const { options } = attrs;
  const { value } = props.fieldNames;

  if (options) {
    return options.map(item => item[value]);
  }
});

/** watch */

/** lifecycle */

/** methods */
// change事件
const handleChange = (value, option) => {
  emits('update:value', value);
  let { onChange } = props;
  onChange && onChange(value, option);
  attrs.onSelectChange && attrs.onSelectChange(value, option);
};
// 全选或取消全选
const handleSelect = selectType => {
  const { value = [] } = attrs;
  selectType ? value.push(...computedAllOptionValue.value) : value.splice(0);
  let uniqueValue = [...new Set(value)];
  handleChange(uniqueValue, selectType ? attrs.options : []);
};
</script>

<style scoped lang="less">
.ant-select-multiple-dropdown {
  .operation-buttons {
    padding: 2px 12px 8px;
    display: flex;
    justify-content: center;

    .ant-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50%;
      height: 30px;
      line-height: normal;
    }

    .select-all {
      margin-right: 15px;
    }
  }
}
</style>
