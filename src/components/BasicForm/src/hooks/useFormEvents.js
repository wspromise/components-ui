import { unref, toRaw, nextTick } from 'vue';
// import { isFunction, isString } from '@/components/BasicTable/src/hooks/is';
import { isFunction, isString } from '../../../BasicTable/src/hooks/is';
import { dateUtil, handleInputNumberValue } from '../utils.js';
import { cloneDeep } from 'lodash-es';
import { dateItemType } from '../componentMap.js';

export const useFormEvents = ({
    emit,
    getProps,
    formModel,
    getSchema,
    defaultValueRef,
    formElRef,
    schemaRef,
    handleFormValues,
}) => {
    //重置表单值 ()=> Promise<any>
    async function resetFields () {
        const { resetFunc, submitOnReset } = unref(getProps);
        resetFunc && isFunction(resetFunc) && (await resetFunc());

        const formEl = unref(formElRef);
        if (!formEl) return;

        Object.keys(formModel).forEach((key) => {
            formModel[key] = defaultValueRef.value[key];
        });
        clearValidate();
        emit('reset', toRaw(formModel));
        submitOnReset && handleSubmit();
    }

     //清除表单值 ()=> Promise<any>
    async function clearFieldsValue () {
        const { resetFunc, submitOnReset } = unref(getProps);
        resetFunc && isFunction(resetFunc) && (await resetFunc());

        const formEl = unref(formElRef);
        if (!formEl) return;

        Object.keys(formModel).forEach((key) => {
            formModel[key] = undefined;
        });
        clearValidate();
        emit('reset', toRaw(formModel));
        submitOnReset && handleSubmit();
    }

    //设置表单字段值 <T>(values: T) => Promise<void>
    async function setFieldsValue (values, isValidate = true) {
        const fields = unref(getSchema)
            .map((item) => item.field)
            .filter(Boolean);

        const validKeys = [];
        Object.keys(values).forEach((key) => {
            const schema = unref(getSchema).find((item) => item.field === key);
            let value = values[key];

            const hasKey = Reflect.has(values, key);

            value = handleInputNumberValue(schema?.component, value);
            if (hasKey && fields.includes(key)) {
                if (itemIsDateType(key)) {
                    if (Array.isArray(value)) {
                        const arr = [];
                        for (const ele of value) {
                            arr.push(dateUtil(ele));
                        }
                        formModel[key] = arr;
                    } else {
                        formModel[key] = dateUtil(value);
                    }
                } else {
                    formModel[key] = value;
                }
                validKeys.push(key);
            }
        });
        isValidate && validateFields(validKeys);
    }


    //根据field字段名删除Schema  fields: string | string[]
    async function removeSchemaByFiled (fields) {
        const schemaList = cloneDeep(unref(getSchema));
        if (!fields) return;

        let fieldList = isString(fields) ? [fields] : fields;
        if (isString(fields)) {
            fieldList = [fields];
        }
        for (const field of fieldList) {
            _removeSchemaByFiled(field, schemaList);
        }
        schemaRef.value = schemaList;
    }
    function _removeSchemaByFiled (field, schemaList) {
        if (isString(field)) {
            const index = schemaList.findIndex((schema) => schema.field === field);
            if (index !== -1) {
                schemaList.splice(index, 1);
            }
        }
    }

    //插入到指定 filed 后面，如果没传指定 field，则插入到最后,当 first = true 时插入到第一个位置
    async function appendSchemaByField (schema, prefixField, first = false) {
        const schemaList = cloneDeep(unref(getSchema));

        const index = schemaList.findIndex((schema) => schema.field === prefixField);
        const hasInList = schemaList.some((item) => item.field === prefixField || schema.field);

        if (!hasInList) return;

        if (!prefixField || index === -1 || first) {
            first ? schemaList.unshift(schema) : schemaList.push(schema);
            schemaRef.value = schemaList;
            return;
        }
        if (index !== -1) {
            schemaList.splice(index + 1, 0, schema);
        }
        schemaRef.value = schemaList;
    }

    function getAllSchema () {
        return unref(getSchema)
    }



    // 展开收起
    function handleToggleAdvanced (start) {
        let schemaList = cloneDeep(unref(getSchema));
        let formModelList = cloneDeep(unref(formModel));

        schemaList = schemaList.map((v, i) => {
            return {
                ...v,
                fold: (i + 1) > start ? !v.fold : !!v.fold,
            }
        })
        schemaRef.value = schemaList;

        if (defaultValueRef.value) {
            for (let key in defaultValueRef.value) {
                if (defaultValueRef.value[key] !== formModelList[key]) {
                    nextTick(() => {
                        setFieldsValue({
                            [key]: formModelList[key]
                        }, false)
                    })
                }
            }
        }

    }

    //获取表单值 () => Recordable;
    function getFieldsValue () {
        const formEl = unref(formElRef);
        if (!formEl) return {};
        return handleFormValues(toRaw(unref(formModel)));
    }

    //是不是时间
    function itemIsDateType (key) {
        return unref(getSchema).some((item) => {
            return item.field === key ? dateItemType.includes(item.component) : false;
        });
    }

    //校验指定表单项nameList? :[]
    async function validateFields (nameList) {
        return unref(formElRef).validateFields(nameList);
    }

    // 校验整个表单
    async function validate (nameList) {
        return await unref(formElRef).validate(nameList);
    }

    //清除验证
    async function clearValidate (name) {
        await unref(formElRef).clearValidate(name);
    }

    //Submit
    async function handleSubmit (e) {
        e && e.preventDefault();
        const { submitFunc } = unref(getProps);
        if (submitFunc && isFunction(submitFunc)) {
            await submitFunc();
            return;
        }
        const formEl = unref(formElRef);
        if (!formEl) return;
        try {
            const values = await validate();
            const res = handleFormValues(values);
            emit('submit', res);
        } catch (error) { }
    }

    return {
        handleSubmit,
        clearValidate,
        validate,
        validateFields,
        getFieldsValue,
        appendSchemaByField,
        removeSchemaByFiled,
        resetFields,
        clearFieldsValue,
        setFieldsValue,
        getAllSchema,
        handleToggleAdvanced
    };
}