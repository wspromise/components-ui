# Form
一个基于ant-design-vue的Form组件二次封装的表单组件
<script setup>
import dayjs from 'dayjs';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import Form from '@/views/form/index.vue'
</script>

## 自动生成对应的placeholder
可以不填写placeholder与规则校验提示，会自动生成对应的提示
<Form />
::: details 查看代码
```vue

```
:::

## 自动生成对应的placeholder
可以不填写placeholder与规则校验提示，会自动生成对应的提示
::: details 查看代码
```vue

```
:::

## 自动生成对应的placeholder
可以不填写placeholder与规则校验提示，会自动生成对应的提示
::: details 查看代码
```vue

```
:::


## API
| 属性 |类型  |默认值 |说明  |
| --- | --- | --- | --- |
|mergeDynamicData | Object | - | 表单额外的参数 |
|model | Object | - | 表单数据对象 |
|labelWidth | [Number, String] | - | 标签宽度  固定宽度 |
|schemas | Array，具体项见[下表](#schemas) | - | 表单配置对象 |
|baseRowStyle | Object | - | 表单行样式 |
|baseColProps | Object | - | 配置所有选子项的 ColProps，不需要逐个配置，子项也可单独配置优先与全局 |
|disabled | Boolean | false | 是否禁用 |
|layout | 'horizontal'|'vertical'|'inline' | - | 表单布局 |
|wrapperCol | Object | - | 整个表单通用 wrapperCol 配置 |
|labelAlign | ['left','right'] | 'left' | label 标签的文本对齐方式 |
|fieldMapToTime | Array | - | 将表单内时间区域的值映射成 2 个字段 |
|transformDateFunc | Function | 见下文 | 转化时间 |

```js
function transformDateFunc (date, transformDateFormat) {
    transformDateFormat = transformDateFormat || 'YYYY-MM-DD HH:mm:ss'
    return dayjs.isDayjs(date) ? dayjs(date).format(transformDateFormat) : date;
}
```

## schemas
| 属性 |类型  |默认值 |说明  |
| --- | --- | --- | --- |
|label | String | - | 左侧label |
|field | String | - | 数据字段key |
|component | String | - | 组件名字 |
|required | Boolean | - | 是否必填 |
|rules | Object | - | 表单验证规则 |
|suffix | Boolean | - | 后缀名字 |
|slot | String | - | 插槽的名字 |
|defaultValue | Any | - | 对应组件的默认值 |
|componentProps | Boolean | - | 具体组件的props |

## Methods
| 事件名称 | 说明 | 方法参数 |
| --- | --- | --- |
|setProps | 设置Form属性的方法 | function(formProps) |
|resetFields | 重置表单值的方法 | function() |
|clearFieldsValue | 清除表单值的方法 | function() |
|setFieldsValue | 设置表单字段值的方法 | function(values, isValidate = true) |
| removeSchemaByFiled | 根据field字段名删除Schema | function(field: String或String[]) |
|appendSchemaByField | 插入到指定filed后面的方法 | function(schema,prefixField: String | Undefined, first: Boolean（是否插入到最前面）) |
|getFieldsValue | 获取表单值的方法 | function() |
|validateFields | 校验指定表单项nameList的方法 | function(nameList: Array) |
|validate | 校验整个表单的方法 | function() |
|clearValidate | 清除验证的方法 | function() |
|submit | 提交的方法 | function(): Promise |
|getAllSchema | 重置表单值的方法 | function() |
|handleToggleAdvanced | 展开收起的方法 | function(start: Number) |
