<template>
  <div class="w-basic-form">
    <Form
      v-bind="{ ...$attrs, ...$props, ...getProps }"
      ref="formElRef"
      :model="formModel"
    >
      <Row :style="getRowWrapStyle" :gutter="24">
        <slot name="formHeader"></slot>

        <template v-for="schema in getSchema" :key="schema.field">
          <transition :name="transitionName" mode="out-in">
            <FormItem
              :formActionType="formActionType"
              :schema="schema"
              :formProps="getProps"
              :allDefaultValues="defaultValueRef"
              :formModel="formModel"
              :setFormModel="setFormModel"
            >
              <template #[item]="data" v-for="item in Object.keys($slots)">
                <slot :name="item" v-bind="data"></slot>
              </template>
            </FormItem>
          </transition>
        </template>
        <slot name="formFooter"></slot>
      </Row>
    </Form>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  unref,
  computed,
  onMounted,
  toRefs,
  watch,
  reactive,
} from 'vue';
import { Form, Row } from 'ant-design-vue';
import { dateItemType } from './componentMap.js';
import { deepMerge } from './utils.js';
import FormItem from './components/FormItem.vue';
import { dateUtil } from './utils.js';
import { useFormEvents } from './hooks/useFormEvents';
import { useFormValues } from './hooks/useFormValues';
import { basicProps } from './props';

export default defineComponent({
  name: 'BasicForm',
  components: { Form, Row, FormItem },
  emits: ['advanced-change', 'reset', 'submit', 'register'],
  props: basicProps,
  setup(props, { emit }) {
    /** state */
    const formModel = reactive({});
    const propsRef = ref({});
    const schemaRef = ref(null);
    const transitionName = ref('');
    const formElRef = ref(null);
    const defaultValueRef = ref({});

    const getProps = computed(() => {
      return { ...props, ...unref(propsRef) };
    });

    const getRowWrapStyle = computed(() => {
      const { baseRowStyle = {} } = unref(getProps);
      return baseRowStyle;
    });

    const getSchema = computed(() => {
      const schemas = unref(schemaRef) || unref(getProps).schemas;
      try {
        for (const schema of schemas) {
          const { defaultValue, component } = schema;
          // 时间字段
          if (defaultValue && dateItemType.includes(component)) {
            if (!Array.isArray(defaultValue)) {
              schema.defaultValue = dateUtil(defaultValue);
            } else {
              const def = [];
              defaultValue.forEach((item) => {
                def.push(dateUtil(item));
              });
              schema.defaultValue = def;
            }
          }
        }
      } catch (error) {}
      return schemas;
    });

    const { transformDateFunc } = toRefs(props);

    const { handleFormValues, initDefault } = useFormValues({
      getProps,
      defaultValueRef,
      getSchema,
      formModel,
      transformDateFuncRef: transformDateFunc,
    });

    const {
      handleSubmit,
      setFieldsValue,
      clearValidate,
      validate,
      validateFields,
      getFieldsValue,
      appendSchemaByField,
      removeSchemaByFiled,
      resetFields,
      clearFieldsValue,
      getAllSchema,
      handleToggleAdvanced,
    } = useFormEvents({
      emit,
      getProps,
      formModel,
      getSchema,
      defaultValueRef,
      formElRef: formElRef,
      schemaRef: schemaRef,
      handleFormValues,
    });

    watch(
      () => unref(getProps).model,
      () => {
        const { model } = unref(getProps);
        if (!model) return;
        setFieldsValue(model);
      },
      {
        immediate: true,
      }
    );

    watch(
      () => getSchema.value,
      (schema) => {
        //第一次getSchema 为undefined 获取到值 之后需要再一次初始化
        try {
          if (schema.length) {
            initDefault();
          }
        } catch (error) {}
      }
    );

    const setProps = async (formProps) => {
      //合并
      propsRef.value = deepMerge(unref(propsRef) || {}, formProps);
    };

    const setFormModel = (key, value) => {
      formModel[key] = value;
    };

    const formActionType = {
      setProps,
      getFieldsValue,
      setFieldsValue,
      resetFields,
      clearFieldsValue,
      removeSchemaByFiled,
      appendSchemaByField,
      clearValidate,
      validateFields,
      validate,
      submit: handleSubmit,
      getAllSchema,
      handleToggleAdvanced,
    };
    onMounted(() => {
      //初始化
      initDefault();
      emit('register', formActionType);
      setTimeout(() => {
        transitionName.value = 'slide-fade';
      }, 800);
    });

    return {
      getRowWrapStyle,
      formElRef,
      getSchema,
      formModel,
      defaultValueRef,
      getProps,
      formElRef,
      formActionType,
      setFormModel,
      ...formActionType,
      transitionName,
    };
  },
});
</script>

<style scoped lang="less">
.w-basic-form {
  :deep(.ant-form-item-control-input-content) {
    display: flex;
    align-items: center;
  }
  :deep(.ant-slider) {
    width: 100%;
  }
  :deep(.ant-form-item) {
    &-label label::after {
      margin: 0 6px 0 2px;
    }

    &-with-help {
      margin-bottom: 0;
    }

    &:not(.ant-form-item-with-help) {
      margin-bottom: 20px;
    }

    &.suffix-item {
      .ant-form-item-children {
        display: flex;
      }

      .suffix {
        display: inline-block;
        padding-left: 6px;
      }
    }
  }

  :deep(.ant-form-explain) {
    font-size: 14px;
  }

  :deep(&--compact) {
    :deep(.ant-form-item) {
      margin-bottom: 8px !important;
    }
  }
}
.slide-fade-enter-active {
  transition: all 0.6s cubic-bezier(1, 0.5, 0.8, 1);
  max-height: 300px;
  overflow: hidden;
}

.slide-fade-leave-active {
  transition: all 0.4s ease-out;
  max-height: 300px;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  max-height: 1px;
  overflow: hidden;
}
</style>
