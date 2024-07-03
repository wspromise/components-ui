<template>
  <div>
    <Descriptions @register="register">
      <template #slotField="{ slotsDatas }">
        <span>slots插槽传入 {{ slotsDatas.slotField }}</span>
      </template>
    </Descriptions>
  </div>
</template>

<script setup>
import { Descriptions, useDescription } from '@/components/Descriptions';
import { HomeOutlined, SettingFilled } from '@ant-design/icons-vue';

/** state */
const columns = [
  {
    label: 'a',
    field: 'a',
  },
  {
    label: 'b',
    field: 'b',
  },
  {
    label: 'slot',
    field: 'slotField',
    width: 100, //百分比宽度
    slot: true,
  },
  {
    label: 'render',
    field: 'c',
    render: ({ h, text, record }) => {
      //可使用render
      return h('div', {}, [
        h(HomeOutlined, { style: { marginRight: '30px' } }),
        h(SettingFilled),
      ]);
    },
  },
  {
    label: 'd',
    field: 'd',
    render: () => {
      return 'asdasdasd';
    },
  },
];
const descData = {
  a: 'value-a',
  b: 'value-b',
  c: 'value-c',
  d: 'value-d',
  slotField: 'slotslotslotslotslotslotslotslot',
};
/** methods */
const [register] = useDescription({
  title: 'useDescription',
  descData,
  columns,
  config: {
    aFew: 1, //一行几个
    labelWidth: 120,
    hasColon: false, //是否显示冒号
  },
});
</script>

<style lang="less" scoped></style>
