import { unref } from 'vue';
import { dateUtil } from '../utils.js';
// import { isArray, isFunction, isObject, isString, isNullOrUnDef } from '@/components/BasicTable/src/hooks/is';
import { isArray, isFunction, isObject, isString, isNullOrUnDef } from '../../../BasicTable/src/hooks/is';


export const useFormValues = ({
    getProps,
    defaultValueRef,
    getSchema,
    formModel,
    transformDateFuncRef
}) => {
    //处理表单值
    function handleFormValues (values) {
        if (!isObject(values)) {
            return {};
        }
        const res = {};
        for (const item of Object.entries(values)) {
            let [, value] = item;
            const [key] = item;
            if ((isArray(value) && value.length === 0) || isFunction(value)) {
                continue;
            }
            const transformDateFunc = unref(transformDateFuncRef);

            if (isObject(value)) {
                // 根据valueFormat 格式化时间
                let transformDateItem = unref(getSchema).find(v => v.field === key)
                let transformDateFormat = 'YYYY-MM-DD HH:mm:ss'
                if (transformDateItem) {
                    let coms = transformDateItem.componentProps
                    transformDateFormat = isFunction(coms) ? coms({ schema: getSchema.value, formModel }).valueFormat : coms.valueFormat
                }

                value = transformDateFunc(value, transformDateFormat);
            }
            if (isArray(value) && value[0]._isAMomentObject && value[1]._isAMomentObject) {
                value = value.map((item) => transformDateFunc(item, transformDateFormat));
            }
            // 删除空格
            if (isString(value)) {
                value = value.trim();
            }
            res[key] = value;
        }
        return handleRangeTimeValue(res);
    }

    //处理时间间隔参数
    function handleRangeTimeValue (values) {
        const fieldMapToTime = unref(getProps).fieldMapToTime;

        if (!fieldMapToTime || !Array.isArray(fieldMapToTime)) {
            return values;
        }

        for (const [field, [startTimeKey, endTimeKey], format = 'YYYY-MM-DD'] of fieldMapToTime) {
            if (!field || !startTimeKey || !endTimeKey || !values[field]) {
                continue;
            }

            const [startTime, endTime] = values[field];

            values[startTimeKey] = dateUtil(startTime).format(format);
            values[endTimeKey] = dateUtil(endTime).format(format);
            Reflect.deleteProperty(values, field);
        }
        return values;
    }

    //初始化
    function initDefault () {
        const schemas = unref(getSchema);
        const obj = {};
        try {
            schemas.forEach((item) => {
                const { defaultValue } = item;
                if (!isNullOrUnDef(defaultValue)) {
                    obj[item.field] = defaultValue;
                    formModel[item.field] = defaultValue;
                }
            });
            defaultValueRef.value = obj;
        } catch (error) {

        }
    }
    return { handleFormValues, initDefault };
}