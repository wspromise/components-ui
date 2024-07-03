<template>
  <div class="asdasd">
    <h2>Form API</h2>
    <h3>useForm</h3>
    <a-divider style="color: #44c087" orientation="left"
      >#Props（ant官方文档内的 props 也都支持）</a-divider
    >
    <a-button class="mr-20" type="primary" @click="setLabelAlign"
      >设置对齐方式labelAlign</a-button
    >
    <a-button class="mr-20" type="primary" @click="setDisabled">{{
      `设置${disabled ? '启用' : '禁用'}`
    }}</a-button>

    layout：<a-radio-group v-model:value="layout" class="mr-20">
      <a-radio-button value="horizontal">Horizontal</a-radio-button>
      <a-radio-button value="vertical">Vertical</a-radio-button>
    </a-radio-group>
    <a-button class="mr-20" type="primary" @click="setDistribution"
      >修改布局</a-button
    >
    <br />
    <br />
    <a-divider style="color: #44c087" orientation="left">#Methods</a-divider>
    <a-button class="mr-20" type="primary" @click="getValue"
      >getFieldsValue 获取表单值</a-button
    >
    <a-button class="mr-20" type="primary" @click="setValue"
      >setFieldsValue 设置表单值</a-button
    >
    <a-button class="mr-20" type="primary" @click="checkFields"
      >validateFields 校验指定表单项(string | string[])</a-button
    >
    <a-button class="mr-20" type="primary" @click="checkAll"
      >validate 校验整个表单</a-button
    >
    <a-button class="mr-20" type="primary" @click="checkClear"
      >clearValidate 清空校验</a-button
    >
    <br />
    <br />
    <a-divider style="color: #44c087" orientation="left">#动态表单</a-divider>

    <div class="flex">
      <div class="tips-box">
        <a-button class="mr-20" type="primary" @click="del"
          >removeSchemaByFiled 根据 field 删除</a-button
        >
        <p>(field: string | string[]) => Promise</p>
      </div>
      <div class="tips-box">
        <a-button class="mr-20" type="primary" @click="add"
          >appendSchemaByField 插入到指定 filed 后面，</a-button
        >
        <p>
          ( schema, prefixField: string | undefined, first?: boolean | undefined
          ) => Promise
        </p>
        <p>
          如果没传指定 field，则插入到最后,当 first = true 时插入到第一个位置
        </p>
      </div>
    </div>
    <br />
    <br />
    <br />
    <BasicForm @register="register"></BasicForm>

    <FooterBar>
      <a-button class="mr-20 btn" @click="resetFields">重置</a-button>
      <a-button class="mr-20 btn" type="primary" @click="submitForm"
        >提交</a-button
      >
    </FooterBar>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';
import { BasicForm, useForm } from '@/components/BasicForm/index.js';
import FooterBar from '@/components/FooterBar/index.vue';

import { formMethodsSchemas } from './data.js';
import { message } from 'ant-design-vue';

export default defineComponent({
  name: '',
  components: { BasicForm, FooterBar },
  setup(props, { emit }) {
    /** state */
    const labelAlign = ref('right');
    const disabled = ref(false);
    const layout = ref('vertical');
    const baseColProps = reactive({
      span: 8,
    });
    const wrapperCol = reactive({ span: 24 });

    const [
      register,
      {
        getFieldsValue,
        resetFields,
        setFieldsValue,
        validateFields,
        validate,
        clearValidate,
        removeSchemaByFiled,
        appendSchemaByField,
      },
    ] = useForm({
      labelWidth: 200, // label 宽度，表单内所有组件适用，可以单独在某个项覆盖或者禁用
      schemas: formMethodsSchemas,
      actionColOptions: {
        span: 24,
      },
      baseColProps, //配置所有选子项的 ColProps，不需要逐个配置，子项也可单独配置优先与全局
      //   labelCol: {  }, //整个表单通用 LabelCol 配置
      wrapperCol, //整个表单通用 wrapperCol 配置
      labelAlign, //right,left  默认right
      disabled,
      layout,
      fieldMapToTime: [
        // CustomRangePicker为时间组件在表单内的字段，startTime，endTime为转化后的开始时间与结束时间
        ['CustomRangePicker', ['startTime', 'endTime'], 'YYYY-MM-DD HH:mm:ss'],
      ],
    });
    /** computed */

    /** watch */

    /** lifecycle */

    /** methods */
    const setLabelAlign = () => {
      labelAlign.value = labelAlign.value === 'right' ? 'left' : 'right';
    };
    const setDisabled = () => {
      disabled.value = !disabled.value;
    };
    const setDistribution = () => {
      if (baseColProps.span === 8) {
        baseColProps.span = 24;
        wrapperCol.span = 12;
      } else {
        baseColProps.span = 8;
        wrapperCol.span = 24;
      }
    };
    //获取表单值
    const getValue = () => {
    //   console.log(getFieldsValue());
    };
    //设置表单值
    const setValue = () => {
      setFieldsValue({
        disabled: 'disableddisableddisabled',
        field1: 'aasdasdasdadasdasd',
        field2: ['2'],
        field3: 1,
        field4: ['Apple', 'Pear'],
      });
    };
    //校验指定表单项
    const checkFields = () => {
      //可以传 单个字符串 或者多个数组 string | string[]
      //   validateFields('disabled');
      validateFields(['disabled', 'field1']);
    };
    //校验整个表单
    const checkAll = () => {
      validate();
    };
    //提交
    const submitForm = async () => {
      try {
        await validateFields();
        message.success('校验通过');
      } catch (error) {
        message.error('校验不通过');
      }
    };
    //清空校验
    const checkClear = () => {
      clearValidate();
    };

    //删除
    const del = async () => {
      await removeSchemaByFiled('field4');
    };
    //新增
    let index = 0;
    const add = () => {
      index++;
      appendSchemaByField(
        {
          field: 'add' + index,
          label: '在ApiSelect后面插入' + index,
          component: 'Input',
          colProps: {
            span: 12,
          },
        },
        'field2'
      );
    };

    return {
      register,
      submitForm,
      setLabelAlign,
      setDisabled,
      disabled,
      layout,
      setDistribution,
      getValue,
      resetFields,
      setValue,
      checkFields,
      checkAll,
      checkClear,
      add,
      del,
    };
  },
});
</script>

<style scoped lang="less">
.mr-20 {
  margin-right: 50px;
}
.btn {
  width: 120px;
}
.tips-box {
  display: inline-block;
}
p {
  margin: 0;
}
.flex {
  display: flex;
}
</style>
