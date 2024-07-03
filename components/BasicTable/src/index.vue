<template>
  <div
    :class="[
      'table-container',
      'table-instance',
      isFullScreen && 'table-instance-fullScreen',
    ]"
    ref="tableInstance"
  >
    <!-- 筛选出的数据信息 -->
    <div
      v-if="getProps.showResultTip"
      :class="[
        'buttons-wrap',
        isFullScreen && 'buttons-wrap-fullScreen',
        getDataSourceRefList.length ? 'buttons-wrap1' : 'buttons-wrap2',
      ]"
    >
      <div class="buttons-wrap-left display-center">
        <span class="result-tip"
          >{{ ODPTranslate('queryResult') }}
          <span class="sign">|</span>
        </span>

        <BasicModal
          v-model:visible="visible"
          :title="ODPTranslate('fieldSettings')"
          :ok-text="ODPTranslate('confirm')"
          :cancel-text="ODPTranslate('cancel')"
          @cancel="handleCancel"
          @ok="handleSetting"
          :bodyStyle="{ padding: '0' }"
          class="a-modal-style"
          width="800px"
        >
          <template #content>
            <div class="modal-box1">
              <div class="modal-content">
                <a-input
                  class="mb-10"
                  v-model:value="settingSearchValue"
                  @change="settingSearchChange"
                  :placeholder="locale.includes('zh') ? '搜索字段' : 'Search'"
                  ><template #suffix> <SearchOutlined /> </template
                ></a-input>
                <a-checkbox-group
                  v-model:value="valueChecked"
                  @change="onCheckAllChange"
                  style="width: 100%"
                >
                  <a-row :gutter="24">
                    <template
                      v-for="element in checkedColumnsList"
                      :key="element.dataIndex"
                    >
                      <span v-if="element.hideCategoryTitle"></span>
                      <a-col
                        v-else-if="!!element.categoryTitle"
                        :span="24"
                        class="modal-col"
                      >
                        <span class="font-bold">{{
                          element.categoryTitle
                        }}</span>
                      </a-col>
                      <a-col v-else :span="12" class="modal-col">
                        <a-checkbox
                          :value="element.dataIndex"
                          :disabled="
                            disableFieldList.includes(element.dataIndex) ||
                            (element.tableSettingDisabled &&
                              element.tableSettingDisabled(
                                element,
                                valueChecked,
                                changetableSettingSelect
                              ))
                          "
                        >
                          <span class="modal-span" v-html="element.title"></span
                        ></a-checkbox>
                      </a-col>
                    </template>
                  </a-row>
                </a-checkbox-group>
              </div>
              <div class="modal-box2">
                <div class="modal-span">
                  {{ ODPTranslate('currentlySelectedField') }}
                </div>
                <VueDraggableNext
                  v-model="myArray"
                  group="people"
                  @start="drag = true"
                  @end="handleDraggableEnd"
                  item-key="dataIndex"
                  animation="500"
                  class="draggable-next-sty"
                >
                  <transition-group>
                    <div
                      v-for="element in myArray"
                      :key="element.dataIndex"
                      class="draggable-content"
                    >
                      <img src="../../../assets/images/dot.gif" alt="" />
                      <span class="draggable-span"> {{ element.title }}</span>
                    </div>
                  </transition-group>
                </VueDraggableNext>
              </div>
            </div>
          </template>
        </BasicModal>
        <slot name="toolbar"></slot>
      </div>
      <div class="buttons-wrap-right display-center">
        <iconpark-icon
          tabindex="1"
          name="Frame1321316045"
          class="icon-margin"
          size="22"
          @click="reload"
        ></iconpark-icon>
        <iconpark-icon
          tabindex="2"
          @click="toggleFullScreen"
          name="Frame1321316046"
          size="22"
          class="icon-margin"
        ></iconpark-icon>
        <div
          :class="[
            'list-settings',
            'display-center',
            getDataSourceRefList.length
              ? 'list-settings-undisabled'
              : 'list-settings-disabled',
          ]"
          v-if="computedShowListSetting"
          @click="showModal"
        >
          <iconpark-icon
            name="Frame-1-8p40hahi"
            size="22"
            class="icon-margin-6"
          ></iconpark-icon>
          {{ ODPTranslate('listSettings') }}
        </div>
      </div>
    </div>
    <a-spin :spinning="getSpinning">
      <a-table
        v-if="getProps.showTableOnNoData || getDataSourceRefList.length"
        ref="tableElRef"
        sticky
        v-bind="getBindValues"
        @change="handleTableChange"
        :class="[
          'ant-table-striped',
          {
            'empty-table-visible':
              getProps.showTableOnNoData && !getDataSourceRefList.length,
          },
        ]"
        @resizeColumn="handleResizeColumn"
      >
        <!-- :rowClassName="
        (record, index) => (index % 2 !== 1 ? 'table-striped' : null)
      " -->
        <template v-for="item in getSlotList()" :key="item" #[item]="data">
          <slot
            v-if="item === 'bodyCell' && data.column?.customSlots"
            :name="data.column?.customSlots"
            v-bind="data"
          ></slot>
          <slot v-else :name="item" v-bind="data"></slot>
        </template>

        <!-- 无数据时的状态 -->
        <template #emptyText>
          <div class="no-data-wrap">
            <img
              class="no-data-image"
              src="../../../assets/images/no-data.png"
              width="151"
              height="123"
              alt=""
            />
            <span class="empty-first-line">{{
              getProps.noDataFirstLine || ODPTranslate('noDataFirstLine')
            }}</span>
            <span class="empty-second-line">{{
              getProps.noDataSecondLine || ODPTranslate('noDataSecondLine')
            }}</span>
          </div>
        </template>
      </a-table>
      <div v-else>
        <div class="no-data-wrap">
          <slot name="no-data-wrap">
            <img
              class="no-data-image"
              src="../../../assets/images/no-data.png"
              width="151"
              height="123"
              alt=""
            />
            <span class="empty-first-line">{{
              getProps.noDataFirstLine || ODPTranslate('noDataFirstLine')
            }}</span>
            <span class="empty-second-line">{{
              getProps.noDataSecondLine || ODPTranslate('noDataSecondLine')
            }}</span>
          </slot>
        </div>
      </div>
    </a-spin>
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  unref,
  ref,
  reactive,
  useSlots,
  onMounted,
  nextTick,
  toRefs,
  watch,
} from 'vue';
import { message } from 'ant-design-vue';
import { ExclamationCircleFilled, SearchOutlined } from '@ant-design/icons-vue';
import { useDataSource } from './hooks/useDataSource.js';
import { useLoading } from './hooks/useLoading.js';
import { usePagination } from './hooks/usePagination.js';
import { useColumns } from './hooks/useColumns.js';
import { useRowSelection } from './hooks/useRowSelection.js';
import BasicModal from '../../Modal';
import { useI18n } from 'vue-i18n';
import { basicProps } from './props';
import {
  ODPTranslate,
  useFullScreen,
  setStore,
  getStore,
} from '../../../utils/common';
import { VueDraggableNext } from 'vue-draggable-next';

export default defineComponent({
  name: 'BasicTable',
  components: {
    ExclamationCircleFilled,
    VueDraggableNext,
    BasicModal,
    SearchOutlined,
  },
  props: basicProps,
  emits: ['register', 'selection-change', 'tableSettingOperation'],
  setup(props, { attrs, emit, slots }) {
    /** state */
    const { t, locale } = useI18n();
    const getSlots = useSlots();
    // const { t } = useI18n();
    const settingSearchValue = ref(''); //列表设置搜索项
    const propsRef = ref(null);
    const tableElRef = ref(null);
    const tableData = ref([]); //Recordable[]
    // Table不需要的插槽列表
    const unTableSlotList = ['toolbar'];
    /** computed */
    const getProps = computed(() => {
      // immediate: true, //是否立即执行 接口
      return { ...props, ...unref(propsRef), immediate: true };
    });
    const tableInstance = ref();
    // 全屏
    const isFullScreen = ref(false);
    const { toggleFullScreen, listenFullScreen } = useFullScreen({
      fullScreenEle: tableInstance,
    });
    const visible = ref(false);
    const valueChecked = ref([]); // 获取原始表头列选中项
    const disableFieldList = ref([]); // 列表设置默认禁用项
    const data = reactive({
      drag: false,
      myArray: [],
    });
    const checkedColumnsList = ref(null); // 列表设置表头列 会变
    const settingColumnsList = ref(null); // 原始表头列 不会变

    // 打开弹窗
    const showModal = () => {
      if (!unref(getDataSourceRefList).length) return;
      visible.value = true;
    };

    const operationColumns = ref();

    // 获取table表头字段
    const computedShowListSetting = computed(() => {
      let showListSetting = unref(getProps).showListSetting;
      return typeof showListSetting === 'boolean'
        ? showListSetting
        : (typeof window !== 'undefined' &&
            window.opTableConfig?.showListSetting) ||
            false;
    });

    // 获取table表头字段
    const computedFilterColumns = computed(() => {
      let filterColumns = unref(getViewColumns).filter(
        column => !column.isOperation
      );
      return filterColumns;
    });

    // 获取对应菜单栏MenuId
    const computedMenuId = computed(() => {
      return getStore('menuId');
    });

    // 生成columns映射
    const computedColumnsMap = computed(() => {
      const columnsMap = new Map();
      //   const columns = checkedColumnsList.value;
      const columns = settingColumnsList.value;
      columns.forEach(column => {
        const key = column.dataIndex;
        columnsMap.set(key, column);
      });
      return columnsMap;
    });

    const getRenderColumns = checkedKeys => {
      return checkedKeys.reduce((p, key) => {
        const columnItem = unref(computedColumnsMap).get(key);
        columnItem && p.push(columnItem);
        return p;
      }, []);
    };

    // 确定按钮
    const handleSetting = async fieldList => {
      if (typeof window === 'undefined') return;
      if (!data.myArray.length) {
        return message.warning('请勾选字段！');
      }
      let params = {
        menuId: getStore('menuId'),
        fieldList: fieldList ? fieldList : unref(valueChecked),
        sheetId: unref(getProps)?.sheetId,
      };

      let res = await window.opTableConfig?.menuFieldsSave?.({ ...params });
      if (res) {
        getTableSettingList();
        visible.value = false;
        emit('tableSettingOperation');
      }
    };

    //取消按钮
    const handleCancel = () => {
      getTableSettingList();
    };

    // 多选CheckBox事件
    function onCheckAllChange(checkedDataIndexList) {
      data.myArray = checkedDataIndexList.reduce((p, current) => {
        let column = checkedColumnsList.value.find(
          item => item.dataIndex === current
        );
        column && p.push(column);
        return p;
      }, []);
    }
    //选择回调
    const changetableSettingSelect = list => {
      if (Array.isArray(list)) {
        list.forEach(e => {
          valueChecked.value.includes(e) &&
            (valueChecked.value = valueChecked.value.filter(v => v !== e));
        });
      }
    };
    const handleDraggableEnd = e => {
      let newMyArr = data.myArray.map(item => item.dataIndex);
      valueChecked.value = newMyArr;
      data.drag = false;
    };

    const { getLoading, setLoading } = useLoading(getProps);
    const {
      getPaginationInfo,
      getPagination,
      setPagination,
      //   setShowPagination,
      //   getShowPagination,
    } = usePagination(getProps);

    const {
      getRowSelection,
      getRowSelectionRef,
      getSelectRows,
      clearSelectedRowKeys,
      getSelectRowKeys,
      deleteSelectRowByKey,
      setSelectedRowKeys,
    } = useRowSelection(getProps, tableData, emit);

    const {
      getRowKey,
      getDataSourceRef,
      handleTableChange,
      reload,
      getDataSource,
      setDataSource,
    } = useDataSource(getProps, {
      tableData,
      setLoading,
      setPagination,
      getPaginationInfo,
      clearSelectedRowKeys,
    });

    const { getViewColumns, getScrollRef, setColumn } = useColumns(
      getProps,
      tableElRef,
      getSlots
    );

    const getBindValues = computed(() => {
      let columns = reactive(unref(getViewColumns)).filter(
        v => !v.categoryTitle
      );
      let propsData = {
        ...attrs,
        size: 'middle',
        rowKey: unref(getRowKey()),
        api: getProps.value.api,
        // useSearch: getProps.value.useSearch || false,
        columns,
        scroll: unref(getScrollRef),
        dataSource: unref(getDataSourceRef),
        // loading: unref(getLoading),
        pagination: unref(getPaginationInfo),
        rowSelection: unref(getRowSelectionRef),
        expandRowByClick: getProps.value.expandRowByClick || false,
      };
      return propsData;
    });

    const getSpinning = computed(() => {
      return !!unref(getLoading);
    });

    const getDataSourceRefList = computed(() => {
      return unref(getDataSourceRef);
    });

    nextTick(() => {
      let operationColumn = unref(getViewColumns).find(
        item => item.isOperation
      );
      operationColumn && (operationColumns.value = operationColumn);
      //   checkedColumnsList.value = unref(computedFilterColumns);
      //   settingColumnsList.value = unref(computedFilterColumns);
    });

    // 全选
    const handleCheckAll = columns => {
      valueChecked.value = columns.map(item => item.dataIndex);
    };
    /** methods */

    // 获取table表头字段
    const getTableColumns = async () => {
      let filterColumns = unref(getViewColumns).filter(
        column => !column.isOperation
      );
      checkedColumnsList.value = filterColumns;
      settingColumnsList.value = filterColumns;
    };

    // 获取表头接口事件
    const getTableSettingList = async () => {
      if (typeof window === 'undefined') return;
      data.myArray = [];
      valueChecked.value = [];
      let res = await window.opTableConfig?.menuFieldsList?.({
        menuId: getStore('menuId'),
        sheetId: unref(getProps)?.sheetId,
      });
      if (res && res.length) {
        valueChecked.value = res[0].fieldList;
        disableFieldList.value = res[0].disableFieldList || [];
        const operationColumnList = [];
        const columns = getRenderColumns(res[0].fieldList);
        // 没有用插槽，
        unref(operationColumns) &&
          !unref(operationColumns)?.customSlots &&
          operationColumnList.push(unref(operationColumns));

        data.myArray = columns;
        setColumn([...columns, ...operationColumnList]);
      } else {
        let filterColumns = unref(getViewColumns).filter(
          column => !column.isOperation
        );
        handleCheckAll(filterColumns);
        //过滤掉标题
        data.myArray = filterColumns.filter(v => !v.categoryTitle);
      }
    };

    const setTableProps = descProps => {
      propsRef.value = descProps;
    };

    const getSlotList = () => {
      const keys = Object.keys(slots);
      if (!keys.includes('bodyCell')) {
        keys.push('bodyCell');
      }
      return keys.filter(v => !unTableSlotList.includes(v));
    };

    const handleResizeColumn = (w, col) => {
      col.width = w > col.minWidth ? w : col.minWidth;
    };
    //列表设置搜索change事件
    const settingSearchChange = e => {
      if (['', undefined, null].includes(e.target.value)) {
        checkedColumnsList.value = settingColumnsList.value;
        return;
      }
      //模糊搜索
      try {
        checkedColumnsList.value = settingColumnsList.value.filter(
          v => v.title.includes(e.target.value) || !!v.categoryTitle
        );
        checkedColumnsList.value = checkedColumnsList.value.map((v, i, arr) => {
          let next = arr[i + 1];
          return {
            ...v,
            title: v.title.replace(
              new RegExp(e.target.value, 'g'),
              `<span style='color:#28a745;'>${e.target.value}</span>`
            ),
            //当前是标题 下一位也是标题 或者为空则 当前隐藏标题
            hideCategoryTitle:
              (!!v.categoryTitle && next && !!next.categoryTitle) ||
              (i === arr.length - 1 && !!arr[arr.length - 1].categoryTitle),
          };
        });
      } catch (error) {
        console.log(error);
      }
    };

    const tableAction = {
      reload,
      setTableProps,
      getDataSource,
      setDataSource,
      getRowSelection,
      getSelectRows,
      clearSelectedRowKeys,
      deleteSelectRowByKey,
      setSelectedRowKeys,
      getSelectRowKeys,
      handleSetting,
      getTableSettingList,
    };
    emit('register', tableAction);
    watch(
      () => props.propColumns,
      val => {
        checkedColumnsList.value = val;
        settingColumnsList.value = val;
      }
    );

    watch(
      () => getDataSourceRef,
      val => {
        if (unref(val)?.length) {
          setTimeout(() => {
            if (typeof document === 'undefined') return;
            document
              .querySelectorAll('td.ant-table-cell-fix-right')
              .forEach(value => {
                value.onclick = function (event) {
                  event.stopPropagation();
                };
              });
          }, 500);
        }
      },
      {
        immediate: true,
        deep: true,
      }
    );

    // 监听全屏事件
    onMounted(() => {
      getTableColumns();
      listenFullScreen(() => {
        isFullScreen.value = !isFullScreen.value;
      });
      // 获取表头接口事件
      unref(computedShowListSetting) && getTableSettingList();
    });
    return {
      isFullScreen,
      tableInstance,
      reload,
      handleDraggableEnd,
      //   t,
      getBindValues,
      setTableProps,
      handleTableChange,
      getPagination,
      handleResizeColumn,
      tableElRef,
      getSlotList,
      tableAction,
      ODPTranslate,
      getDataSource,
      setDataSource,
      getViewColumns,
      checkedColumnsList,
      valueChecked,
      handleCheckAll,
      visible,
      showModal,
      handleSetting,
      handleCancel,
      ...toRefs(data),
      onCheckAllChange,
      getDataSourceRefList,
      toggleFullScreen,
      getSpinning,
      computedShowListSetting,
      getProps,
      settingSearchValue,
      settingSearchChange,
      changetableSettingSelect,
      disableFieldList,
      t,
      locale,
    };
  },
});
</script>

<style scoped lang="less">
@import './css/index.less';
</style>
