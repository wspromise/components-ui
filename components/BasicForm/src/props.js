import dayjs from 'dayjs';
export const basicProps = {
    mergeDynamicData: {
        type: Object,
        default: null,
    },
    model: {
        type: Object,
        default: null,
    },
    // 标签宽度  固定宽度
    labelWidth: {
        type: [Number, String],
        default: 0,
    },
    schemas: {
        type: Array,
        default: () => [],
    },
    baseRowStyle: {
        type: Object,
        default: null,
    },
    baseColProps: {
        type: Object,
        default: null,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    layout: {
        type: String,
        default: 'horizontal', //'horizontal', 'vertical', 'inline'
    },
    wrapperCol: {
        type: Object,
        default: null,
    },
    labelAlign: {
        type: String,
        default: 'left',
    },
    //将表单内时间区域的值映射成 2 个字段
    fieldMapToTime: {
        type: Array,
        default: () => [],
    },
    //转化时间
    transformDateFunc: {
        type: Function,
        default: (date, transformDateFormat) => {
            transformDateFormat = transformDateFormat || 'YYYY-MM-DD HH:mm:ss'
            return dayjs.isDayjs(date) ? dayjs(date).format(transformDateFormat) : date;
        },
    },
};
