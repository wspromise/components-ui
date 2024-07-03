import { unref, computed } from 'vue';
import i18n from '../../../i18n';
import dayjs from 'dayjs';
// import { isObject, isFunction, isNumber } from '@/components/BasicTable/src/hooks/is';
import { isObject, isFunction, isNumber } from '../../BasicTable/src/hooks/is';
import { message } from 'ant-design-vue';
import { ODPTranslate } from '../../../utils/common';

//深度合并
export function deepMerge(src = {}, target = {}) {
  let key = '';
  for (key in target) {
    src[key] = isObject(src[key])
      ? deepMerge(src[key], target[key])
      : (src[key] = target[key]);
  }
  return src;
}

//获取动态属性
export const getDynamicProps = props => {
  const ret = {};
  Object.keys(props).map(key => {
    ret[key] = unref(props[key]);
  });
  return ret;
};

//获取插槽
export const getSlot = (slots, slot = 'default', data) => {
  if (!slots || !Reflect.has(slots, slot)) {
    return null;
  }
  if (!isFunction(slots[slot])) {
    console.error(`必须是一个function`);
    return null;
  }
  const slotFn = slots[slot];
  if (!slotFn) return null;
  return slotFn(data);
};

export const dateUtil = dayjs;

export function handleInputNumberValue(component, val) {
  if (!component) return val;
  if (
    ['Input', 'InputPassword', 'InputSearch', 'InputTextArea'].includes(
      component
    )
  ) {
    return val && isNumber(val) ? `${val}` : val;
  }
  return val;
}

export function getPopupContainer(node) {
  const body = typeof document !== 'undefined' ? document.body : {};
  return node ? (node.parentNode ? node.parentNode : body) : body;
}

/**
 * 日期范围发生变化的回调
 * @param {*} dates 日期数组
 * @param {*} modelRef 表单字段
 * @param {*} dateRanage string类型， 时间范围字段
 * @returns
 */
export const handleRangePickerChange = (
  dates,
  modelRef,
  dateRanage,
  callback
) => {
  if (!dates) {
    modelRef[dateRanage] = [];
    callback && callback();
    return false;
  }
  let [startTime, endTime] = dates;
  let diff = startTime && endTime ? dayjs(endTime).diff(startTime, 'day') : 0;
  if (diff > 365) {
    message.warning(ODPTranslate('limitDateOneYear'));
    return false;
  } else {
    modelRef[dateRanage] = dates;
    callback && callback();
    return true;
  }
};

// 计算预设时间范围
export const computedPresetTimeRanges = computed(
  () =>
    (
      startTimeFormat = 'YYYY-MM-DD 00:00:00',
      endTimeFormat = 'YYYY-MM-DD 23:59:59',
      endTime
    ) => {
      // 默认结束时间是今天
      !endTime && (endTime = dayjs().format(endTimeFormat));

      return {
        // 今日
        0: {
          startTime: dayjs().format(startTimeFormat),
          endTime,
        },
        //本周
        5: {
          startTime: dayjs().startOf('week').format(startTimeFormat),
          endTime: dayjs().endOf('week').format(endTimeFormat),
        },
        // 近7日
        7: {
          startTime: dayjs().subtract(6, 'day').format(startTimeFormat),
          endTime,
        },

        // 本月
        30: {
          startTime: dayjs().startOf('month').format(startTimeFormat),
          endTime: dayjs().endOf('month').format(endTimeFormat),
        },
        // 上个月
        60: {
          startTime: dayjs()
            .subtract(1, 'month')
            .startOf('month')
            .format(startTimeFormat),
          endTime: dayjs()
            .subtract(1, 'month')
            .endOf('month')
            .format(endTimeFormat),
        },
        // 三个月
        90: {
          startTime: dayjs()
            .subtract(3, 'month')
            .startOf('month')
            .format(startTimeFormat),
          endTime: dayjs()
            .subtract(3, 'month')
            .endOf('month')
            .format(endTimeFormat),
        },
        // 本年
        365: {
          startTime: dayjs().startOf('year').format(startTimeFormat),
          endTime: dayjs().endOf('year').format(endTimeFormat),
        },

        // 昨天
        yesterday: {
          startTime: dayjs()
            .subtract(1, 'day')
            .endOf('day')
            .format(startTimeFormat),
          endTime: dayjs()
            .subtract(1, 'day')
            .endOf('day')
            .format(endTimeFormat),
        },
      };
    }
);
