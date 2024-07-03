import { computed, unref } from 'vue';
// import { isNumber } from '@/components/BasicTable/src/hooks/is';
import { isNumber } from '../../../BasicTable/src/hooks/is';


export const useItemLabelWidth = (schemaItemRef, propsRef) => {
    return computed(() => {
        const schemaItem = unref(schemaItemRef);

        //单个的设置
        const { labelCol = {}, wrapperCol = {} } = schemaItem.itemProps || {};
        const { labelWidth, disabledLabelWidth } = schemaItem;

        // 全局的设置
        const {
            labelWidth: globalLabelWidth,
            labelCol: globalLabelCol,
            wrapperCol: globWrapperCol,
        } = unref(propsRef);

        //如果全局设置labelWidth 就全部设置
        if ((!globalLabelWidth && !labelWidth && !globalLabelCol) || disabledLabelWidth) {
            labelCol.style = {
                textAlign: 'left',
            };
            return { labelCol, wrapperCol };
        }

        let width = labelWidth || globalLabelWidth;
        const col = { ...globalLabelCol, ...labelCol };
        const wrapCol = { ...globWrapperCol, ...wrapperCol };

        if (width) {
            width = isNumber(width) ? `${width}px` : width;
        }

        return {
            labelCol: { style: { width }, ...col },
            wrapperCol: { style: { width: `calc(100% - ${width})` }, ...wrapCol },
        }
    })
}