<script lang="jsx">
import { defineComponent, computed, unref, h } from 'vue';

import { Tooltip } from 'ant-design-vue';
import { InfoCircleOutlined } from '@ant-design/icons-vue';
import { isString, isArray } from '../../../BasicTable/src/hooks/is';
import { getSlot, getPopupContainer } from '../utils.js';

export default defineComponent({
  name: 'BasicHelp',
  components: { Tooltip },
  props: {
    maxWidth: {
      type: String,
      default: '600px',
    },
    showIndex: Boolean,

    color: {
      type: String,
      default: '#ffffff',
    },
    fontSize: {
      type: String,
      default: '14px',
    },
    placement: {
      type: String,
      default: 'right',
    },
    absolute: Boolean,

    text: {
      type: [Array, String],
    },
    // 定位
    position: {
      type: [Object],
      default: () => ({
        position: 'absolute',
        left: 0,
        bottom: 0,
      }),
    },
    icon: {
      type: [Function, String, Object],
      default: () => h(InfoCircleOutlined),
    },
  },
  setup(props, { slots }) {
    const getOverlayStyle = computed(() => {
      return {
        maxWidth: props.maxWidth,
      };
    });

    const getWrapStyle = computed(() => {
      return {
        color: props.color,
        fontSize: props.fontSize,
      };
    });

    const getMainStyleRef = computed(() => {
      return props.absolute ? props.position : {};
    });

    const renderTitle = () => {
      const list = props.text;
      if (isString(list)) {
        return <p>{list}</p>;
      }

      if (isArray(list)) {
        return list.map((item, index) => {
          return (
            <p key={item}>
              <>
                {props.showIndex ? `${index + 1}. ` : ''}
                {item}
              </>
            </p>
          );
        });
      }

      return null;
    };
    return () => {
      return (
        <Tooltip
          title={<div style={unref(getWrapStyle)}>{renderTitle()}</div>}
          overlayClassName={`help__wrap`}
          autoAdjustOverflow={true}
          overlayStyle={unref(getOverlayStyle)}
          placement={props.placement}
          getPopupContainer={() => getPopupContainer()}
        >
          <span class="help-basic-help" style={unref(getMainStyleRef)}>
            {getSlot(slots) || props.icon}
          </span>
        </Tooltip>
      );
    };
  },
});
</script>
<style lang="less">
p {
  margin: 0;
}
.help-basic-help {
  display: inline-block;
  margin-left: 6px;
  font-size: 14px;
  color: #909399;
  cursor: pointer;

  &:hover {
    color: #000;
  }
}
</style>
