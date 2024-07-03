<template>
  <div class="breadcrumb-wrap" v-if="breadList.length">
    <div
      class="breadcrumb-item"
      v-for="(item, index) in computedBreadList"
      :key="item + index"
    >
      {{ item }}
      <RightOutlined class="icon" v-if="index !==computedBreadList.length-1" />
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue';
import { RightOutlined } from '@ant-design/icons-vue';
export default defineComponent({
  props: {
    // 面包屑数据
    breadList: {
      type: Array,
      default: () => [],
    },
  },
  components: { RightOutlined },
  setup(props, { emit }) {
    /** state */

    /** computed */
    const computedBreadList = computed(() => props.breadList.filter(v => v));

    /** watch */

    /** lifecycle */

    /** methods */

    return { computedBreadList };
  },
});
</script>

<style scoped lang="less">
.breadcrumb-wrap {
  padding-bottom: 20px;
  display: inline-flex;
  align-items: center;

  .breadcrumb-item {
    font-size: 14px;
    font-weight: bold;
    color: #333;
   &:last-of-type{
    color: #28A745;
   }
    .icon{
        font-size: 12px;
        margin: 0 10px;
    }
    // &:not(:last-of-type) {
    //   position: relative;
    //   background: #fcfcfc;
    //   color: #666;
    //   &:not(:first-of-type)::before,
    //   &::after {
    //     position: absolute;
    //     top: 0;
    //     z-index: 999;
    //     content: '';
    //     width: 0;
    //     height: 0;
    //     border-width: 17px 0 17px 17px;
    //     border-style: solid;
    //   }

    //   &::after {
    //     right: 0;
    //     border-color: #edeff3 transparent #edeff3 transparent;
    //   }
    // }

    // &:first-of-type {
    //   padding: 9px 19px 9px 8px;
    // }

    // &:not(:last-of-type, :first-of-type) {
    //   padding: 9px 38px 9px 33px;
    //   &::before {
    //     left: 0;
    //     border-color: transparent transparent transparent #edeff3;
    //   }
    // }

    // &:last-of-type {
    //   padding: 9px 8px;
    //   color: #333;
    // }
  }
}
</style>
