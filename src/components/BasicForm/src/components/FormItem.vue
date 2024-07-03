<script lang="jsx">
import { defineComponent, computed, unref, toRefs, h } from 'vue';
import { Form, Col } from 'ant-design-vue';
import BasicHelp from './BasicHelp.vue';
import { componentMap } from '../componentMap.js';
// import { isFunction, isBoolean } from '@/components/BasicTable/src/hooks/is';
import {
  isFunction,
  isBoolean,
  isNumber,
} from '../../../BasicTable/src/hooks/is';
import { upperFirst, cloneDeep } from 'lodash-es';
import { useItemLabelWidth } from '../hooks/useLabelWidth';
import { getSlot } from '../utils.js';
import { ODPTranslate } from '../../../../utils/common.js';
import i18n from '../../../../i18n';

const t = i18n.global.t;

function setComponentRuleType(rule, component) {
  if (
    ['DatePicker', 'MonthPicker', 'WeekPicker', 'TimePicker'].includes(
      component
    )
  ) {
    rule.type = 'object';
  } else if (
    ['RangePicker', 'Upload', 'CheckboxGroup', 'TimePicker'].includes(component)
  ) {
    rule.type = 'array';
  } else if (['InputNumber'].includes(component)) {
    rule.type = 'number';
  }
}

let pl = {
  inputText: ODPTranslate('pleaseEnter'),
  chooseText: ODPTranslate('pleaseSelect'),
};
//生成placeholder
function createPlaceholderMessage(component, label) {
  if (component.includes('Input') || component.includes('Complete')) {
    return pl.inputText + label;
  }
  if (component.includes('Picker')) {
    return pl.chooseText + label;
  }
  if (
    component.includes('Select') ||
    component.includes('Cascader') ||
    component.includes('Checkbox') ||
    component.includes('Radio') ||
    component.includes('Switch')
  ) {
    return pl.chooseText + label;
  }
  return '';
}

export default defineComponent({
  name: 'BasicFormItem',
  inheritAttrs: false,
  props: {
    schema: {
      type: Object,
      default: () => {},
    },
    formProps: {
      type: Object,
      default: {},
    },
    //默认值
    allDefaultValues: {
      type: Object,
      default: {},
    },
    formModel: {
      type: Object,
      default: {},
    },
    setFormModel: {
      type: Function,
      default: null,
    },
    tableAction: {
      type: Object,
      default: {},
    },
    formActionType: {
      type: Object,
      default: {},
    },
    mergeDynamicData: {
      type: Object,
      default: null,
    },
  },
  setup(props, { slots }) {
    const { schema, formProps } = toRefs(props);

    //labelCol 跟 wrapperCol
    const itemLabelWidthProp = useItemLabelWidth(schema, formProps);

    const getValues = computed(() => {
      const { allDefaultValues, formModel, schema } = props;
      const { mergeDynamicData } = props.formProps; //额外的参数

      return {
        field: schema.field,
        model: formModel,
        values: {
          ...mergeDynamicData,
          ...allDefaultValues,
          ...formModel,
        },
        schema: schema,
      };
    });

    const getComponentsProps = computed(() => {
      const { schema, tableAction, formModel, formActionType } = props;
      const { componentProps = {} } = schema;
      if (!isFunction(componentProps)) {
        return componentProps;
      }
      return (
        componentProps({ schema, tableAction, formModel, formActionType }) ?? {}
      );
    });

    //禁用
    const getDisable = computed(() => {
      const { disabled: globDisabled } = props.formProps;
      const { dynamicDisabled } = props.schema;
      const { disabled: itemDisabled = false } = unref(getComponentsProps);
      let disabled = !!globDisabled || itemDisabled;
      if (isBoolean(dynamicDisabled)) {
        disabled = dynamicDisabled;
      }

      if (isFunction(dynamicDisabled)) {
        disabled = dynamicDisabled(unref(getValues));
      }
      return disabled;
    });

    //显示隐藏  isShow=v-show ; isIfShow=v-if
    const getShow = (isShow = true, isIfShow = true) => {
      const { show, ifShow, fold } = props.schema;
      const { showAdvancedButton } = props.formProps;
      const itemIsAdvanced = showAdvancedButton
        ? isBoolean(props.schema.isAdvanced)
          ? props.schema.isAdvanced
          : true
        : true;

      if (isBoolean(show)) {
        isShow = show;
      }
      if (isBoolean(ifShow)) {
        isIfShow = ifShow;
      }
      if (isFunction(show)) {
        isShow = show(unref(getValues));
      }
      if (isFunction(ifShow)) {
        isIfShow = ifShow(unref(getValues));
      }
      isShow = isShow && itemIsAdvanced;
      return { isShow, isIfShow, fold };
    };

    //表单验证
    const handleRules = () => {
      const {
        rules: defRules = [],
        component,
        rulesMessageJoinLabel,
        label,
        dynamicRules,
        required,
      } = props.schema;

      if (isFunction(dynamicRules)) {
        return dynamicRules(unref(getValues));
      }

      let rules = cloneDeep(defRules);

      if ((!rules || rules.length === 0) && required) {
        rules = [{ required, type: 'string' }];
      }

      const requiredRuleIndex = rules.findIndex(
        rule => Reflect.has(rule, 'required') && !Reflect.has(rule, 'validator')
      );
      const { rulesMessageJoinLabel: globalRulesMessageJoinLabel } =
        props.formProps;
      if (requiredRuleIndex !== -1) {
        const rule = rules[requiredRuleIndex];
        const { isShow } = getShow();
        //如果隐藏了 就不判断规则
        if (!isShow) {
          rule.required = false;
        }
        if (rule.required && component) {
          if (!Reflect.has(rule, 'type')) {
            rule.type = 'string';
          }
          const joinLabel = Reflect.has(props.schema, 'rulesMessageJoinLabel')
            ? rulesMessageJoinLabel
            : globalRulesMessageJoinLabel;
          rule.message =
            rule.message ||
            createPlaceholderMessage(component, label) +
              `${joinLabel ? label : ''}`;

          if (component.includes('Input') || component.includes('Textarea')) {
            rule.whitespace = true;
          }
          setComponentRuleType(rule, component);
        }
      }

      //最大输入长度规则
      const characterInx = rules.findIndex(val => val.max);
      if (characterInx !== -1 && !rules[characterInx].validator) {
        rules[characterInx].message =
          rules[characterInx].message ||
          t('component.form.maxTip', [rules[characterInx].max]);
      }
      return rules;
    };

    const renderComponent = () => {
      const {
        renderComponentContent,
        component,
        field,
        changeEvent = 'change',
        valueField,
        label,
      } = props.schema;
      // Switch Checkbox 为v-model:checked="checked" 特殊处理， 其他的均为value,
      const isCheck = component && ['Switch', 'Checkbox'].includes(component);
      const eventKey = `on${upperFirst(changeEvent)}`;

      let on = {
        [eventKey]: (e, options) => {
          if (propsData[eventKey]) {
            propsData[eventKey](e, options);
          }
          const target = e ? e.target : null;
          const value = target ? (isCheck ? target.checked : target.value) : e;
          props.setFormModel(field, value);
        },
      };
      const Comp = componentMap.get(component);

      const { autoSetPlaceHolder = true, size } = props.formProps;
      const propsData = {
        allowClear: true,
        getPopupContainer: trigger => trigger.parentNode,
        size,
        ...unref(getComponentsProps),
        disabled: unref(getDisable),
      };
      const isCreatePlaceholder = !propsData.disabled && autoSetPlaceHolder;
      let placeholder = unref(getComponentsProps)?.placeholder;
      if (
        isCreatePlaceholder &&
        component !== 'RangePicker' &&
        component !== 'CustomRangePicker' &&
        component
      ) {
        placeholder =
          unref(getComponentsProps)?.placeholder ||
          createPlaceholderMessage(component, label);
      }

      propsData.placeholder = placeholder;
      propsData.codeField = field;
      propsData.formValues = unref(getValues);
      const bindValue = {
        [valueField || (isCheck ? 'checked' : 'value')]: props.formModel[field],
      };
      //去除空格
      try {
        if (
          component &&
          [
            'Input',
            'InputGroup',
            'InputPassword',
            'InputSearch',
            'InputTextArea',
            //   'InputNumber',
            //   'AutoComplete',
          ].includes(component) &&
          (propsData.trim || propsData.trimAll) &&
          bindValue.value
        ) {
          bindValue.value = isNumber(bindValue.value)
            ? bindValue.value + ''
                : bindValue.value;
            let reg = propsData.trim ? /^\s*|\s*$/g : /\s*/g
            bindValue.value = bindValue.value.replace(reg, '');
        }
      } catch (error) {}
      const compAttr = {
        ...propsData,
        ...on,
        ...bindValue,
      };
      if (!renderComponentContent) {
        return <Comp {...compAttr} />;
      }
      const compSlot = isFunction(renderComponentContent)
        ? { ...renderComponentContent(unref(getValues)) }
        : {
            default: () => renderComponentContent,
          };

      return <Comp {...compAttr}>{compSlot}</Comp>;
    };

    //Label 提示文字
    const renderLabelHelpMessage = () => {
      const { label, helpMessage, helpComponentProps, subLabel } = props.schema;
      const renderLabel = subLabel ? (
        <span>
          {label} <span style="color:#00000073">{subLabel}</span>
        </span>
      ) : (
        label
      );
      if (
        !helpMessage ||
        (Array.isArray(helpMessage) && helpMessage.length === 0)
      ) {
        return renderLabel;
      }
      return (
        <span>
          {renderLabel}
          <BasicHelp
            placement="top"
            class="mx-1"
            text={helpMessage}
            {...helpComponentProps}
          />
        </span>
      );
    };

    //渲染
    const renderItem = () => {
      const { itemProps, slot, render, field, suffix } = props.schema;
      const { labelCol, wrapperCol } = unref(itemLabelWidthProp);
      const { colon } = props.formProps;
      const getContent = () => {
        return slot
          ? getSlot(slots, slot, unref(getValues))
          : render
          ? render(unref(getValues))
          : renderComponent();
      };

      const showSuffix = !!suffix;
      const getSuffix = isFunction(suffix) ? suffix(unref(getValues)) : suffix;

      return (
        <Form.Item
          name={field}
          colon={colon} 
          class={{ 'suffix-item': showSuffix }}
          {...itemProps}
          label={renderLabelHelpMessage()}
          rules={handleRules()}
          labelCol={labelCol}
          wrapperCol={wrapperCol}
        >
          <>
            {getContent()}
            {showSuffix && <span class="suffix">{getSuffix}</span>}
          </>
        </Form.Item>
      );
    };

    return () => {
      const {
        colProps = {},
        colSlot,
        renderColContent,
        component,
      } = props.schema;
      //必须得在componentMap里面定义
      if (!componentMap.has(component)) return null;

      const { baseColProps = {} } = props.formProps;

      const realColProps = { ...baseColProps, ...colProps };
      // isIfShow 删除dom = v-if , isShow不会删除 dom 相当于v-show
      const { isIfShow, isShow, fold } = getShow();
      const values = unref(getValues);
      //内容
      const getContent = () => {
        return colSlot
          ? getSlot(slots, colSlot, values)
          : renderColContent
          ? renderColContent(values)
          : renderItem();
      };

      return (
        isIfShow && (
          <Col {...realColProps} v-show={isShow && !fold}>
            {getContent()}
          </Col>
        )
      );
    };
  },
});
</script>

<style scoped lang="less"></style>
