import {
  Input,
  Select,
  Radio,
  Checkbox,
  AutoComplete,
  Cascader,
  DatePicker,
  InputNumber,
  Switch,
  TimePicker,
  TreeSelect,
  Rate,
  Slider,
} from 'ant-design-vue';

import ApiSelect from './components/ApiSelect.vue';
import CustomRangePicker from './components/RangePicker.vue';
import DateRangePicker from '../../customRangePicker/index.vue';
import SelectPlus from '../../select/index.vue';

const componentMap = new Map();

componentMap.set('Input', Input);
componentMap.set('InputGroup', Input.Group);
componentMap.set('InputPassword', Input.Password);
componentMap.set('InputSearch', Input.Search);
componentMap.set('InputTextArea', Input.TextArea);
componentMap.set('InputNumber', InputNumber);
componentMap.set('AutoComplete', AutoComplete);

componentMap.set('Select', Select);
componentMap.set('TreeSelect', TreeSelect);
componentMap.set('Switch', Switch);
componentMap.set('RadioGroup', Radio.Group);
componentMap.set('Checkbox', Checkbox);
componentMap.set('CheckboxGroup', Checkbox.Group);
componentMap.set('Cascader', Cascader);

componentMap.set('DatePicker', DatePicker);
componentMap.set('MonthPicker', DatePicker.MonthPicker);
componentMap.set('RangePicker', DatePicker.RangePicker);
componentMap.set('WeekPicker', DatePicker.WeekPicker);
componentMap.set('TimePicker', TimePicker);

componentMap.set('Rate', Rate);
componentMap.set('Slider', Slider);

//自定义组件
componentMap.set('ApiSelect', ApiSelect);
componentMap.set('CustomRangePicker', CustomRangePicker);
componentMap.set('DateRangePicker', DateRangePicker);
componentMap.set('SelectPlus', SelectPlus);

export function add(compName, component) {
  componentMap.set(compName, component);
}

export function del(compName) {
  componentMap.delete(compName);
}
//form 所用的组件
export { componentMap };

function genType() {
  return [
    'DatePicker',
    'MonthPicker',
    'RangePicker',
    'WeekPicker',
    'TimePicker',
  ];
}

export const dateItemType = genType();
