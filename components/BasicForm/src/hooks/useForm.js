import { ref, unref, nextTick, watch } from 'vue';
import { getDynamicProps } from '../utils'


export const useForm = (props) => {
    const formRef = ref(null);
    const loadedRef = ref(false);

    //获取ref
    async function getForm () {
        const form = unref(formRef);
        if (!form) {
            console.error('未获取表单实例');
            return
        }
        await nextTick();
        return form;
    }

    function register (instance) {
        if (unref(loadedRef) && instance === unref(formRef)) return;

        formRef.value = instance;
        loadedRef.value = true;

        watch(
            () => props,
            () => {
                props && instance.setProps(getDynamicProps(props));
            },
            {
                immediate: true,
                deep: true,
            }
        );
    }

    const methods = {
        setProps: async (formProps) => {
            const form = await getForm();
            form.setProps(formProps);
        },
        //重置表单值 
        resetFields: async () => {
            getForm().then(async (form) => {
                await form.resetFields();
            });
        },
        //清除表单值 
        clearFieldsValue: async () => {
            getForm().then(async (form) => {
                await form.clearFieldsValue();
            });
        },
        // 设置表单字段值
        setFieldsValue: async (values, isValidate = true) => {
            const form = await getForm();
            form.setFieldsValue(values, isValidate);
        },
        //根据field字段名删除Schema  field : string | string[]
        removeSchemaByFiled: async (field) => {
            const form = await getForm();
            form.removeSchemaByFiled(field);
        },
        //插入到指定 filed 后面，如果没传指定 field，则插入到最后,当 first = true 时插入到第一个位置  prefixField: string | undefined,
        appendSchemaByField: async (
            schema,
            prefixField,
            first
        ) => {
            const form = await getForm();
            form.appendSchemaByField(schema, prefixField, first);
        },
        //获取表单值
        getFieldsValue: () => {
            return unref(formRef)?.getFieldsValue();
        },
        //校验指定表单项nameList? :[]
        validateFields: async (nameList) => {
            const form = await getForm();
            return form.validateFields(nameList);
        },
        //校验整个表单
        validate: async (nameList) => {
            const form = await getForm();
            return form.validate(nameList);
        },
        //清除验证 name?: string | string[]  可以清楚单独的某一个 或者多个 不传就清除全部
        clearValidate: async (name) => {
            const form = await getForm();
            form.clearValidate(name);
        },
        submit: async () => {
            const form = await getForm();
            return form.submit();
        },
        getAllSchema: async () => {
            const form = await getForm();
            return form.getAllSchema();
        },
        handleToggleAdvanced: async (start) => {
            const form = await getForm();
            return form.handleToggleAdvanced(start);
        },
    }

    return [register, methods];
}