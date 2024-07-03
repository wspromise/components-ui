<template>
  <div>
    <BasicForm @register="register">
      <template #slotName="{ model, field }">
        <!-- slot方式 -->
        <a-form-item-rest>
          <a-input-group compact>
            <a-select v-model:value="model['pay']" style="width: 40%">
              <a-select-option value="zfb"> 支付宝 </a-select-option>
              <a-select-option value="yl"> 银联 </a-select-option>
            </a-select>
            <a-input v-model:value="model[field]" style="width: 60%" />
          </a-input-group>
        </a-form-item-rest>
      </template>
    </BasicForm>
  </div>
</template>

<script setup>
import { h } from 'vue';
import { Divider } from 'ant-design-vue';
import { SmileTwoTone } from '@ant-design/icons-vue';
import { BasicForm, useForm } from '@/components/BasicForm/index.js';

const line = text => {
  return h(
    Divider,
    { orientation: 'left', style: { color: '#44c087' } },
    () => `#${text}`
  );
};

const getSelectList = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          value: '1',
          label: '1',
        },
        {
          value: '2',
          label: '2',
        },
        {
          value: '3',
          label: '3',
        },
        {
          value: '4',
          label: '4',
        },
        {
          value: '5',
          label: '5',
        },
      ]);
    }, 2000);
  });
};

const schemas = [
  {
    field: 'lineInput1',
    component: 'Input',
    colProps: {
      span: 24,
    },
    componentProps: {},
    render: ({ model }) => {
      return line('基础字段');
    },
  },
  {
    field: 'field1',
    component: 'Input',
    label: 'Input',
    colProps: {
      span: 18,
    },
    componentProps: {
      placeholder: '自定义placeholder',
      onChange: e => {
        // console.log(e);
      },
    },
  },
  {
    field: 'InputNumber',
    component: 'InputNumber',
    label: 'InputNumber',
    colProps: {
      span: 18,
    },
    componentProps: {
      min: 0,
      max: 10,
      style: {
        width: '100%',
      },
    },
  },
  {
    field: 'defaultValue',
    component: 'Input',
    label: '默认值',
    colProps: {
      span: 18,
    },
    componentProps: {
      defaultValue: '有默认值',
    },
  },
  {
    field: 'field222222',
    component: 'Input',
    label: '带后缀',
    colProps: {
      span: 18,
    },
    componentProps: ({ formModel }) => {
      formModel.pay = 'zfb';
      return {
        defaultValue: '1111',
      };
    },
    suffix: '天',
  },
  {
    field: 'InputGroup',
    component: 'InputGroup',
    label: 'InputGroup-插槽传入',
    slot: 'slotName',
    componentProps: {},
    defaultValue: '插槽传入的值',
    colProps: {
      span: 18,
    },
  },
  {
    field: 'field2',
    component: 'Select',
    label: 'Select',
    colProps: {
      span: 18,
    },
    componentProps: {
      onChange: (e, option) => {},
      fieldNames: {
        label: 'name',
        value: 'age',
      },
      options: [
        // { label: 'label1', value: 1 },
        // { label: 'label2', value: 2 },
        { name: 'label1', age: 1 },
        { name: 'label2', age: 2 },
      ],
    },
  },
  {
    field: 'InputSearch',
    component: 'InputSearch',
    label: 'InputSearch',
    colProps: {
      span: 18,
    },
    componentProps: {},
  },

  {
    field: 'TreeSelect',
    component: 'TreeSelect',
    label: 'TreeSelect 树选择',
    colProps: {
      span: 18,
    },
    componentProps: {
      treeData: [
        {
          title: 'parent 1',
          value: 'parent 1',
          children: [
            {
              title: 'parent 1-0',
              value: 'parent 1-0',
              children: [
                {
                  title: 'my leaf',
                  value: 'leaf1',
                },
                {
                  title: 'your leaf',
                  value: 'leaf2',
                },
              ],
            },
            {
              title: 'parent 1-1',
              value: 'parent 1-1',
            },
          ],
        },
      ],
      treeDefaultExpandAll: true,
    },
  },

  {
    field: 'Cascader',
    component: 'Cascader',
    label: 'Cascader级联',
    colProps: {
      span: 18,
    },
    componentProps: {
      options: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    field: 'Switch',
    component: 'Switch',
    label: 'Switch',
    colProps: {
      span: 18,
    },
    defaultValue: true,
    componentProps: {
      checkedChildren: '开',
      unCheckedChildren: '关',
    },
  },

  {
    field: 'field4',
    component: 'RadioGroup',
    label: 'RadioGroup',
    colProps: {
      span: 18,
    },
    defaultValue: 'label2',
    componentProps: {
      options: [
        { label: 'label1', value: 'label1' },
        { label: 'label2', value: 'label2' },
      ],
    },
  },
  {
    field: 'CheckboxGroup',
    component: 'CheckboxGroup',
    label: 'CheckboxGroup',
    colProps: {
      span: 18,
    },
    defaultValue: ['Apple', 'Pear'],
    componentProps: {
      options: [
        { label: 'Apple', value: 'Apple' },
        { label: 'Pear', value: 'Pear' },
        { label: 'Orange', value: 'Orange' },
      ],
    },
  },
  {
    field: 'InputTextArea',
    component: 'InputTextArea',
    label: 'InputTextArea',
    colProps: {
      span: 18,
    },
    componentProps: {},
  },
  {
    field: 'lineInput2',
    component: 'Input',
    colProps: {
      span: 24,
    },
    componentProps: {},
    render: ({ model }) => {
      return line('自定义组件');
    },
  },
  {
    field: 'selectPlus',
    component: 'SelectPlus',
    label: 'SelectPlus',
    colProps: {
      span: 18,
    },
    componentProps: {
      mode: 'multiple',
      onSelectChange: (e, options) => {},
      fieldNames: {
        label: 'name',
        value: 'age',
      },
      options: [
        { name: 'label1', age: 1 },
        { name: 'label1111', age: 10 },
        { name: 'label2', age: 2 },
      ],
    },
  },
  {
    field: 'field3',
    component: 'ApiSelect',
    label: 'ApiSelect',
    colProps: {
      span: 18,
    },
    componentProps: {
      api: getSelectList,
      params: {
        a: 111, //额外的参数
      },
      mode: 'multiple',
      onChange: (val, options) => {
        console.log(val, options, 'onChange');
      },
      onSelectChange: (val, options) => {
        console.log(val, options, 'onSelectChange');
      },
      //过滤后端接口返回的数据 有默认值不需要传。
      // resultField:'list',
      // labelField:'label',
      // valueField:'value',
    },
  },
  {
    field: 'DateRangePicker',
    component: 'DateRangePicker',
    label: 'DateRangePicker',
    colProps: {
      span: 18,
    },
    defaultValue: ['2022-02-02', '2022-04-02'],
    componentProps: {
      dateProps: {
        valueFormat: 'YYYY-MM-DD',
        allowClear: false,
        showTime: false,
      },
      timeLength: 180,
    },
  },
  {
    field: 'CustomRangePicker',
    component: 'CustomRangePicker',
    helpMessage: ['将时间字段过滤成后端所需要的两个字段'],
    helpComponentProps: {
      icon: h(SmileTwoTone),
    },
    label: 'CustomRangePicker',
    colProps: {
      span: 18,
    },
    componentProps: {
      // onChange: (e) => {
      //     console.log(e);
      // }
    },
  },
  {
    field: 'aaaa',
    component: 'Input',
    label: 'asdasdas',
    colProps: {
      span: 18,
    },
    render: ({ model }) => {
      return model.CustomRangePicker;
    },
  },
  {
    field: 'lineInput3',
    component: 'Input',
    colProps: {
      span: 24,
    },
    componentProps: {},
    render: ({ model }) => {
      return line('时间类型');
    },
  },
  {
    field: 'DatePicker',
    component: 'DatePicker',
    label: 'DatePicker',
    colProps: {
      span: 18,
    },
    componentProps: {
      style: { width: '100%' },
    },
  },
  {
    field: 'MonthPicker',
    component: 'MonthPicker',
    label: 'MonthPicker',
    colProps: {
      span: 18,
    },
    componentProps: {
      style: { width: '100%' },
    },
  },
  {
    field: 'RangePicker',
    component: 'RangePicker',
    label: 'RangePicker',
    colProps: {
      span: 18,
    },
    componentProps: {
      style: { width: '100%' },
    },
  },
  {
    field: 'WeekPicker',
    component: 'WeekPicker',
    label: 'WeekPicker',
    colProps: {
      span: 18,
    },
    componentProps: {
      style: { width: '100%' },
    },
  },
  {
    field: 'TimePicker',
    component: 'TimePicker',
    label: 'TimePicker',
    colProps: {
      span: 18,
    },
    componentProps: {
      style: { width: '100%' },
    },
  },
  {
    field: 'lineInput3',
    component: 'Input',
    colProps: {
      span: 24,
    },
    componentProps: {},
    render: ({ model }) => {
      return line('其他');
    },
  },
  {
    field: 'Slider',
    component: 'Slider',
    label: 'Slider',
    defaultValue: 66,
    componentProps: {
      min: 0,
      max: 100,
      marks: {
        20: '20°C',
        60: '60°C',
      },
      style: {
        width: '100%',
      },
    },
    colProps: {
      span: 18,
    },
  },
  {
    field: 'Rate',
    component: 'Rate',
    label: 'Rate',
    defaultValue: 4.5,
    colProps: {
      span: 18,
    },
    componentProps: {
      disabled: false,
      allowHalf: true,
    },
  },
];

const [register] = useForm({
  labelWidth: 200,
  labelAlign: 'right',
  schemas,
  actionColOptions: {
    span: 48,
  },
  baseColProps: { span: 12 },
  wrapperCol: { span: 24 },
});
</script>
