import { h } from 'vue';
import { Divider } from 'ant-design-vue';
import { SmileTwoTone } from '@ant-design/icons-vue';
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

const line = text => {
  return h(
    Divider,
    { orientation: 'left', style: { color: '#44c087' } },
    () => `#${text}`
  );
};

export const schemas = [
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
    field: 'Checkbox',
    component: 'Checkbox',
    label: 'Checkbox',
    colProps: {
      span: 18,
    },
    componentProps: {},
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

const validatefield1 = async (_rule, value) => {
  if (value !== '222') {
    return Promise.reject('必须输入222');
  } else {
    return Promise.resolve();
  }
};

export const formMethodsSchemas = [
  {
    field: 'disabled',
    component: 'Input',
    label: 'disabled',
    required: true, //可以简写
    // rules: [{ required: true }],
    componentProps: {
      placeholder: '输入1禁用右边',
    },
  },
  {
    field: 'field1',
    component: 'Input',
    label: 'Input',
    rules: [{ required: true, validator: validatefield1 }],
    // colProps: {
    //     span: 18,
    // },
    componentProps: ({ formModel }) => {
      return {
        disabled: formModel.disabled === '1',
      };
    },
  },
  {
    field: 'field2',
    component: 'ApiSelect',
    label: 'ApiSelect',
    rules: [{ required: true, message: 'asasdasdasdsads', type: 'array' }],
    componentProps: ({ formModel }) => {
      return {
        api: getSelectList,
        params: {
          a: 111, //额外的参数
        },
        mode: 'multiple',
        //过滤后端接口返回的数据 有默认值不需要传。
        // resultField:'list',
        // labelField:'label',
        // valueField:'value',
      };
    },
  },
  {
    field: 'field3',
    component: 'Select',
    label: 'Select',
    rules: [
      {
        required: true,
        message: 'aaaaaaaaaaaaaa',
        type: 'number',
      },
    ],
    componentProps: ({ formModel }) => {
      return {
        options: [
          { label: 'a', value: 1 },
          { label: 'b', value: 2 },
        ],
        onChange: e => {},
      };
    },
  },
  {
    field: 'field4',
    component: 'CheckboxGroup',
    label: '默认值Apple',
    rules: [
      {
        required: true,
        message: 'aaaaaaaaaaaaaa',
        type: 'array',
      },
    ],
    defaultValue: ['Apple'],
    componentProps: {
      options: [
        { label: 'Apple', value: 'Apple' },
        { label: 'Pear', value: 'Pear' },
        { label: 'Orange', value: 'Orange' },
      ],
    },
  },
  {
    field: 'CustomRangePicker',
    component: 'CustomRangePicker',
    helpMessage: '将时间字段过滤成后端所需要的两个字段',
    label: 'CustomRangePicker',
    required: true,
    componentProps: {},
  },
];

export const schemasForm = [
  {
    field: 'supplierCode',
    component: 'Input',
    label: 'aaa',
    componentProps: {},
  },
  {
    field: 'supplierCode2',
    component: 'Input',
    label: 'aaa',
    componentProps: {},
  },
  {
    field: 'supplierCode3',
    component: 'Input',
    label: 'aaa',
    componentProps: {},
  },
  {
    field: 'supplierCode4',
    component: 'Input',
    label: 'aaa',
    componentProps: {},
  },
  {
    field: 'supplierCode5',
    component: 'Input',
    label: 'aaa',
    componentProps: {},
  },
];
