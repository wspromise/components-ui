<template>
  <SelectPlus v-bind="$attrs" :options="getOptions" @change="changeClick">
    <template #[item]="data" v-for="item in Object.keys($slots)">
      <slot :name="item" v-bind="data"></slot>
    </template>
    <template #suffixIcon v-if="loading">
      <LoadingOutlined spin />
    </template>
    <template #notFoundContent v-if="loading">
      <span>
        <LoadingOutlined spin class="mr-1" />
        Loading...
      </span>
    </template>
  </SelectPlus>
</template>

<script>
import { defineComponent, ref, watchEffect, computed, unref } from 'vue';
// import { Select } from 'ant-design-vue';
// import { isFunction } from '@/components/BasicTable/src/hooks/is';
import { isFunction, isObject } from '../../../BasicTable/src/hooks/is';
import { get } from 'lodash-es';
import { LoadingOutlined } from '@ant-design/icons-vue';
import SelectPlus from '../../../select/index.vue';

export default defineComponent({
  name: 'ApiSelect',
  components: {
    // Select,
    SelectPlus,
    LoadingOutlined,
  },
  inheritAttrs: false,
  props: {
    numberToString: Boolean,
    api: {
      type: Function,
      default: null,
    },
    // api params
    params: {
      type: Object,
      default: () => {},
    },
    resultField: {
      type: String,
      default: '',
    },
    labelField: {
      type: String,
      default: 'label',
    },
    valueField: {
      type: String,
      default: 'value',
    },
  },
  emits: ['options-change', 'change'],
  setup(props, { emit }) {
    /** state */
    const options = ref([]);
    const loading = ref(false);
    const getOptions = computed(() => {
      const { labelField, valueField, numberToString } = props;

      return unref(options).reduce((prev, next) => {
        if (next) {
          if (isObject(next)) {
            const value = next[valueField];
            prev.push({
              label: next[labelField],
              value: numberToString ? `${value}` : value,
            });
          } else {
            prev.push({
              label: next,
              value: next,
            });
          }
        }
        return prev;
      }, []);
    });

    watchEffect(() => {
      fetch();
    });

    async function fetch() {
      const api = props.api;
      if (!api || !isFunction(api)) return;

      try {
        loading.value = true;
        const res = await api(props.params);
        if (Array.isArray(res)) {
          options.value = res;
          emit('options-change', unref(options));
          return;
        }
        if (props.resultField) {
          options.value = get(res, props.resultField) || [];
        }
        emit('options-change', unref(options));
      } catch (error) {
        console.warn(error);
      } finally {
        loading.value = false;
      }
    }
    const changeClick = (e, options) => {
      emit('change', e, options);
    };
    return { getOptions, loading, changeClick };
  },
});
</script>

<style scoped lang="less">
.mr-1 {
  margin-right: 1px;
}
</style>
