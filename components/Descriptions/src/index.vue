<template>
  <div class="Descriptions">
    <div class="publicTitle" v-if="propsRef && propsRef.title">
      {{ propsRef.title }}
    </div>
    <div
      class="desc-box"
      :class="{ two: propsRef && propsRef.config.aFew === 2 }"
    >
      <div
        class="flex"
        :class="{ large: propsRef.config.large === 'large' }"
        v-for="(item, i) in propsRef.columns"
        :style="`width:${item.width}%`"
        :key="i"
        v-show="item.show !== false"
      >
        <template v-if="item.slot === true">
          <slot :name="item.field" :slotsDatas="propsRef.descData"></slot>
        </template>
        <template v-else>
          <div
            class="desc-label"
            :style="`width: ${
              propsRef.config.labelWidth === undefined
                ? 100
                : propsRef.config.labelWidth
            }px;`"
          >
            {{ item.label }} {{ propsRef.config.hasColon === true ? '：' : '' }}
          </div>
          <div class="desc-value">
            <template v-if="!item.render">{{
              propsRef.descData[item.field]
            }}</template>
            <template v-else>
              <ExpandDom
                :row="item"
                :descData="propsRef.descData"
                :render="item.render"
              />
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, h, ref } from 'vue';
const ExpandDom = (props, context) => {
  let text =props?.descData[props.row.field] 
  return props.render({
    h,
    text: (text || text === 0) ?  text : '' ,
    record: props?.descData || {},
  });
};
ExpandDom.props = ['descData', 'row', 'render'];
export default defineComponent({
  name: 'Descriptions',
  emits: ['register'],
  props: {
    /*
        interface Columns {
            label: any; //左侧label
            field: string; //数据字段key
            width?: number; // 这一列长度百分比
            render?: Function; // render
        }
        */
    columns: {
      type: Array || Function,
    },
    title: String,
    descData: Object, //数据
    config: {
      type: Object,
      default: {
        aFew: 1, //一行几个
        size: 'default', //默认default36px large44px
        labelWidth: 100,
        hasColon: false, //是否有冒号
      },
    },
  },
  components: {
    ExpandDom,
  },
  setup(props, { emit }) {
    const propsRef = ref(null);
    const setDescProps = (descProps) => {
      propsRef.value = { ...props, ...descProps };
    };
    const methods = {
      setDescProps,
    };
    !propsRef.value && (propsRef.value = props);
    emit('register', methods);
    return {
      propsRef,
    };
  },
});
</script>
<style lang="less" scoped>
.Descriptions {
  .publicTitle {
    margin-bottom: 0px;
    color: #1f384c;
    font-weight: bold;
    display: flex;
    align-items: center;
    font-size: 13px;
  }
  // .publicTitle:before {
  //     content: '';
  //     display: block;
  //     height: 14px;
  //     width: 2px;
  //     background: #1990ff;
  //     margin-right: 4px;
  // }
  .desc-box {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
  }
  .flex {
    display: flex;
    align-items: center;
    min-height: 36px;
    width: 100%;
    .desc-label {
      color: #16161a;
    }
    .desc-value {
      max-width: 60%;
      word-break: break-all;
      color: #666666;
    }
    .flex:nth-child(2n-1) {
      border-right: none;
    }
    .flex:nth-child(2n) {
      padding-left: 0px;
    }
  }
}
.two {
  .flex {
    width: calc(50% - 2px);
  }
}
.large {
  min-height: 44px;
}
</style>
