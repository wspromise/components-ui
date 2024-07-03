<template>
  <a-config-provider :locale="zhCN">
    <div class="date-range-wrap">
      <a-form-item-rest>
        <a-date-picker
          :value="startTime"
          @update:value="val => (startTime = val ? val : '')"
          v-bind="computedStartTimeProps"
          @change="
            (date, dateString) => handleChange(date, dateString, 'startTime')
          "
        >
          <template v-if="isNeedRangePresets" #renderExtraFooter>
            <ul class="ant-picker-ranges">
              <li
                v-for="(range, rangeName) in computedRanges"
                :key="rangeName"
                class="ant-picker-preset"
                @click="handleClickRangePreset(range, rangeName)"
              >
                <span class="ant-tag ant-tag-blue">{{ rangeName }}</span>
              </li>
            </ul>
          </template>
        </a-date-picker>
        <span class="separator">-</span>
        <a-date-picker
          :value="endTime"
          @update:value="val => (endTime = val ? val : '')"
          v-bind="computedEndTimeProps"
          @change="
            (date, dateString) => handleChange(date, dateString, 'endTime')
          "
        >
          <template v-if="isNeedRangePresets" #renderExtraFooter>
            <ul class="ant-picker-ranges">
              <li
                v-for="(range, rangeName) in computedRanges"
                :key="rangeName"
                class="ant-picker-preset"
                @click="handleClickRangePreset(range, rangeName)"
              >
                <span class="ant-tag ant-tag-blue">{{ rangeName }}</span>
              </li>
            </ul>
          </template>
        </a-date-picker>
      </a-form-item-rest>
    </div>
  </a-config-provider>
</template>

<script setup>
import { computed, ref, unref, watch } from 'vue';
import dayjs from 'dayjs';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { traverseRanges } from './utils';
// import { useI18n } from 'vue-i18n';
import {
  ODPTranslate,
  isSameValue,
  validatorDateRange,
} from '../../utils/common';
import { computedPresetTimeRanges } from '../BasicForm/src/utils';

/** props */
const props = defineProps({
  // 时间范围
  value: {
    type: Array,
    default: () => [],
  },
  // 公共配置
  dateProps: { type: Object, default: () => ({}) },

  // 特殊需要可以单独配置
  // 开始时间的props
  startTimeProps: { type: Object, default: () => ({}) },
  // 结束时间的props
  endTimeProps: { type: Object, default: () => ({}) },
  // 时间范围change事件
  onRangeChange: {
    type: Function,
  },
  // 限制时间范围的时长
  timeLength: {
    type: Number,
  },
  // 时间范围错误信息
  errorMsg: {
    type: String,
  },
  // 时间限制函数
  limitTimeFn: {
    type: Function,
  },
  // 预设时间
  range: {
    type: Object,
    default: () => ({}),
  },
  // 预设时间范围
  ranges: {
    type: Object,
    default: () => ({}),
  },
  // 是否需要时间范围预设
  isNeedRangePresets: {
    type: Boolean,
    default: true,
  },
});
const emits = defineEmits(['update:value', 'change', 'rangeChange']);
/** state */
// const { t } = useI18n();
// 开始时间和结束时间
const startTime = ref(props.value[0]);
const endTime = ref(props.value[1]);

/** computed */
const computedDateProps = computed(() => {
  let {
    valueFormat = 'YYYY-MM-DD HH:mm:ss',
    showTime = true,
    ...otherProps
  } = props.dateProps;
  let config = {
    valueFormat,
    showTime,
    ...otherProps,
  };
  return config;
});

// 计算开始时间props
const computedStartTimeProps = computed(() => ({
  ...computedDateProps.value,
  ...props.startTimeProps,
}));

// 计算结束时间props
const computedEndTimeProps = computed(() => ({
  ...computedDateProps.value,
  ...props.endTimeProps,
}));

// 快捷时间范围
const timeRange = computedPresetTimeRanges.value(
  unref(computedStartTimeProps).valueFormat,
  unref(computedEndTimeProps).valueFormat
);

// 计算预设时间
const computedRanges = computed(() => {
  let { disabledDate } = props.dateProps;
  if (Object.keys(props.ranges).length)
    return traverseRanges(props.ranges, disabledDate);
  let rangesConfig = {
    [ODPTranslate('timeRangeInfo.today')]: Object.values(timeRange[0]),
    [ODPTranslate('timeRangeInfo.thisWeek')]: Object.values(timeRange[5]),
    [ODPTranslate('last7Days')]: Object.values(timeRange[7]),
    [ODPTranslate('thisMonth')]: Object.values(timeRange[30]),
    [ODPTranslate('lastMonth')]: Object.values(timeRange[60]),
    [ODPTranslate('thisYear')]: Object.values(timeRange[365]),
    ...props.range,
  };
  return traverseRanges(rangesConfig, disabledDate);
});
/** watch */
watch(
  () => props.value,
  dateRange => {
    if (!isSameValue(dateRange, [startTime.value, endTime.value])) {
      startTime.value = dateRange[0];
      endTime.value = dateRange[1];
    }
  },
  {
    deep: true,
  }
);

/** methods */
// 日期范围发生变化/日期面板变化时的回调
const handleChange = (date, dateString, type) => {
  date = date ? date : '';

  if (unref(startTime) && unref(endTime)) {
    if (
      dayjs(unref(startTime)).isAfter(dayjs(unref(endTime))) ||
      dayjs(unref(endTime)).isBefore(dayjs(unref(startTime)))
    ) {
      [endTime.value, startTime.value] = [unref(startTime), unref(endTime)];
    }
  }

  let { timeLength, errorMsg: msg, limitTimeFn } = props;

  timeLength &&
    validatorDateRange({
      value: [unref(startTime), unref(endTime)],
      timeLength,
      msg,
    });

  // 时间限制
  limitTimeFn &&
    limitTimeFn({
      date, // 开始时间或结束时间的日期
      dateString, // 开始时间或结束时间的日期
      type, // 标记是开始时间触发还是结束时间触发 'startTime' | 'endTime'
      startTime: unref(startTime), // 开始时间
      endTime: unref(endTime), // 结束时间
      value: [unref(startTime), unref(endTime)], // 日期范围
    });

  emits('update:value', [unref(startTime), unref(endTime)]);
  emits('change', [unref(startTime), unref(endTime)]);
  emits('rangeChange', {
    date,
    dateString,
    type,
    startTime: unref(startTime),
    endTime: unref(endTime),
    value: [unref(startTime), unref(endTime)],
  });
};

// 点击时间范围预设
const handleClickRangePreset = (range, rangeName) => {
  if (range) {
    startTime.value = range[0];
    endTime.value = range[1];
    handleChange(unref(startTime), unref(startTime), 'startTime');
    handleChange(unref(endTime), unref(endTime), 'endTime');
  }
};

// 暴露数据供外部通过ref使用
defineExpose({
  startTime, // 开始时间
  endTime, // 结束时间
  computedDateProps, // 公共的日期props
  computedStartTimeProps, // 开始时间props
  computedEndTimeProps, // 结束时间props
  handleChange, // change event
  computedRanges, // 预设时间范围
});
</script>

<style scoped lang="less">
@import './index.less';
</style>
