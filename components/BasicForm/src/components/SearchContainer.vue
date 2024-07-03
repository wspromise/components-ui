<template>
  <div :class="['search-container', { 'no-filter-more': schemas.length <= 4 }]">
    <div class="btn-setting">
      <a-button type="primary" @click="handleSearch()" class="search-btn">
        <template #icon>
          <iconpark-icon
            class="btn-icon"
            name="Frame1321315603"
            size="20"
          ></iconpark-icon>
        </template>
        <span> {{ ODPTranslate('search') }} </span>
      </a-button>

      <a-button class="reset-btn" @click="handleReset">
        <template #icon>
          <iconpark-icon
            class="btn-icon-reset"
            name="Frame1321315604"
            size="20"
          ></iconpark-icon>
        </template>
        {{ ODPTranslate('reset') }}
      </a-button>
    </div>
    <BasicForm @register="register">
      <template #[item]="data" v-for="item in Object.keys($slots)">
        <slot :name="item" v-bind="data"></slot>
      </template>
    </BasicForm>
    <template v-if="showMoreFilter">
      <div class="filter-more" v-if="schemas.length > 4" @click="showFilter">
        <span>{{ ODPTranslate('filterMore') }}</span>
        <transition name="slide-up" mode="out-in">
          <iconpark-icon
            class="icon"
            name="Frame20"
            v-if="visibleMoreFilter"
          ></iconpark-icon>
          <iconpark-icon class="icon" name="Frame19" v-else></iconpark-icon>
        </transition>
      </div>
    </template>
  </div>

  <div class="bottom-line">
    <div class="corner1"></div>
    <div class="corner2"></div>
    <div class="corner3"></div>
    <div class="corner4"></div>
  </div>
</template>

<script>
import {
  defineComponent,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  computed,
} from 'vue';
import { BasicForm, useForm } from '../../index.js';
// import { useI18n } from 'vue-i18n';
import { ODPTranslate, getStore, setStore } from '../../../../utils/common';
import { CaretUpFilled, CaretDownFilled } from '@ant-design/icons-vue';

export default defineComponent({
  name: 'SearchContainer',
  props: {
    schemas: {
      type: Array,
      default: () => [],
    },
    fieldMapToTime: {
      type: Array,
      default: () => [],
    },
    reload: {
      type: Function,
      default: null,
    },
    showMoreFilter: {
      type: Boolean,
      default: true,
    },
    showLines: {
      //展示几行
      type: Number,
      default: 1,
    },
    onReset: {
      type: Function,
      default: null,
    },
    // 是否开启搜索缓存（0-关闭 1-开启）
    openSearchCache: {
      type: Number,
    },
    // 搜索表单ID
    searchFormId: {
      type: [Number, String],
    },
    // 额外的搜索表单参数
    extraSearchFormParams: {
      type: [Function, Object],
    },
  },
  emits: ['search', 'reset', 'getExtraSearchFormParams'],
  components: {
    BasicForm,
    CaretUpFilled,
    CaretDownFilled,
  },
  setup(props, { emit }) {
    // const { t } = useI18n();
    const visibleMoreFilter = ref(false);
    const [
      register,
      {
        getFieldsValue,
        setFieldsValue,
        appendSchemaByField,
        getAllSchema,
        resetFields,
        clearFieldsValue,
        handleToggleAdvanced,
        validate,
        removeSchemaByFiled,
      },
    ] = useForm({
      schemas: props.schemas,
      ifFold: true,
      labelWidth: 50,
      baseColProps: {
        span: 6,
      },
      wrapperCol: {
        span: 24,
      },
      baseRowStyle: {},
      fieldMapToTime: props.fieldMapToTime,
    });

    const getShowLines = computed(() => {
      let lins = props.showLines || 1;
      return [4, 8, 12, 16, 20][lins - 1] || 4;
    });

    const add = async () => {
      if (props.schemas.length < 3) {
        let seatNum = [2, 1][props.schemas.length - 1];
        for (let i = 0; i < seatNum; i++) {
          appendSchemaByField({
            field: 'seat' + i,
            component: 'Input',
            render: () => {
              return ' ';
            },
          });
        }
      }
      let allSchema = await getAllSchema();
      appendSchemaByField(
        {
          field: 'btns',
          component: 'Input',
          slot: 'btnSettingSlot',
        },
        allSchema[2].field
      );
    };

    // 设置搜索表单缓存的数据
    const setSearchFormCacheData = model => {
      if (typeof window === 'undefined') return;
      // 判断是否启用了缓存
      let isOpenSearchCache =
        props.openSearchCache === undefined
          ? window.opSearchFormConfig?.openSearchCache === 1
          : props.openSearchCache === 1;
      if (!isOpenSearchCache) return;
      // 设置缓存
      let menuId = getStore('menuId');
      let searchFormCacheKey =
        menuId +
        (props.searchFormId === undefined ? '' : '-' + props.searchFormId);

      if (model) {
        // 获取额外的搜索表单参数
        let extraSearchFormParams = props.extraSearchFormParams;
        extraSearchFormParams =
          typeof extraSearchFormParams === 'function'
            ? extraSearchFormParams()
            : extraSearchFormParams;
        // 要缓存的搜索表单数据
        let searchFormCacheData = { ...model, extraSearchFormParams };
        // 更新storage
        setStore('searchFormCacheData', {
          ...(getStore('searchFormCacheData') || {}),
          [searchFormCacheKey]: searchFormCacheData,
        });
      } else {
        // storage里面的数据更新到搜索组件
        let searchFormCacheData = getStore('searchFormCacheData') || {};
        let formModel = searchFormCacheData[searchFormCacheKey] || {};

        // 处理时间范围
        let fieldMapToTime = props.fieldMapToTime;
        if (fieldMapToTime.length) {
          let timeField = fieldMapToTime[0][0];
          let timeSeparationFieldArr = fieldMapToTime[0][1];
          let timeRange = timeSeparationFieldArr.reduce((prev, current) => {
            let time = formModel[current] || '';
            time && prev.push(time);
            return prev;
          }, []);

          timeRange.length &&
            Object.assign(formModel, {
              [timeField]: timeRange,
            });
        }
        nextTick(() => {
          // 搜索缓存有值，说明已经缓存过了，先清空表单值，防止默认值被赋值
          Object.keys(formModel).length && clearFieldsValue();
          formModel && setFieldsValue(formModel, false);
          emit('getExtraSearchFormParams', formModel.extraSearchFormParams);
        });
      }
    };
    const handleSearch = async init => {
      try {
        // 缓存表单搜索数据
        if (!init) {
          setStore('lastMenuId', getStore('menuId'));
          setSearchFormCacheData(getFieldsValue());
        }
        await validate();
        emit('search', getFieldsValue());
      } catch (error) {
        console.log(error);
      }
    };
    const handleReset = async () => {
      await resetFields();
      props.onReset && emit('reset');
      nextTick(() => {
        handleSearch();
      });
    };
    const showFilter = () => {
      visibleMoreFilter.value = !visibleMoreFilter.value;
      handleToggleAdvanced(getShowLines.value);
    };

    onMounted(async () => {
      handleToggleAdvanced(getShowLines.value);
      nextTick(() => {
        // 设置搜索表单缓存的数据
        setSearchFormCacheData();
      });
      await handleSearch(true);

      // 回车事件
      document.onkeydown = function (e) {
        let key = window.event.keyCode;
        if (key === 13) {
          handleSearch();
        }
      };
    });
    onUnmounted(() => {
      document.onkeydown = null;
    });
    return {
      register,
      handleSearch,
      handleReset,
      showFilter,
      ODPTranslate,
      visibleMoreFilter,
      setFieldsValue,
      getFieldsValue,
      appendSchemaByField,
      removeSchemaByFiled,
      getAllSchema,
    };
  },
});
</script>

<style scoped lang="less">
.search-container {
  padding: 20px;
  position: relative;
  z-index: 999;
  border-radius: 4px;

  &.no-filter-more {
    padding: 20px 20px 0 20px;
  }

  .btn-setting {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  }

  .search-btn,
  .reset-btn {
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 2px;
    display: flex;
    align-items: center;
    border: none;

    .btn-icon {
      margin-right: 13px;
    }

    .btn-icon-reset {
      margin-right: 6px;
    }
  }

  .search-btn {
    padding: 10px 42px 10px 38px;
    margin-right: 20px;
    border: none;
    border-radius: 30px 4px 4px 30px;
    background: #28a745;

    .search-btn-icon {
      font-size: 14px;
    }
  }

  .search-btn:hover {
    background: #62bd75;
  }

  .reset-btn {
    background: #eff2f4;
    padding: 10px 16px 10px 14px;
    color: #222;
    border: 1px solid #e8ecf5;
    border-radius: 4px 30px 30px 4px;

    &:hover {
      color: #62bd75;
    }
  }

  .filter-more {
    position: relative;
    padding: 5px 34px 5px 14px;
    display: inline-block;
    font-size: 14px;
    color: #16161a;
    line-height: 22px;
    border: 1px solid #e8ecf5;
    border-radius: 4px;
    background: #f9f9f9;
    user-select: none;
    cursor: pointer;

    .icon {
      position: absolute;
      right: 11px;
      top: 10px;
    }
  }

  .aaa {
    margin-top: 8px;
    position: relative;
    padding: 5px 31px;
    display: inline-block;
    font-size: 14px;
    color: #16161a;
    line-height: 22px;
    border: 1px solid #e8ecf5;
    border-radius: 4px;
    background: #f9f9f9;
    user-select: none;
    cursor: pointer;
  }

  :deep(.w-basic-form .ant-form-item-label) label::after {
    left: 999px;
  }

  .slide-up-enter-active {
    transition: all 0.5s ease;
  }

  .slide-up-leave-active {
    transition: all 0.5s ease;
  }

  .slide-up-leave-to {
    transform: rotate(-180deg);
  }
}

.bottom-line {
  position: relative;
  width: calc(100%);
  height: 20px;
  background-color: #edeff3;

  .corner1,
  .corner2,
  .corner3,
  .corner4 {
    position: absolute;
    z-index: 0;
    width: 4px;
    height: 4px;
    background-color: #edeff3;
    overflow: hidden;

    &::before {
      position: absolute;
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #fff;
    }
  }

  .corner1 {
    transform: rotate(-90deg) translateX(4px);
  }

  .corner2 {
    right: 0;
    transform: rotate(180deg) translateY(4px);
  }

  .corner3 {
    right: 0;
    bottom: 0;
    transform: rotate(90deg) translateX(4px);
  }

  .corner4 {
    left: 0;
    bottom: 0;
    transform: translateY(4px);
  }
}
</style>
