import { unref, ref, computed, watch } from 'vue';
import { cloneDeep } from 'lodash-es';
import { isFunction, isBoolean } from './is';
const NORMAL_WIDTH = 200;

function sortFixedColumn(columns) {
  const fixedLeftColumns = [];
  const fixedRightColumns = [];
  const defColumns = [];
  for (const column of columns) {
    if (column.fixed === 'left') {
      fixedLeftColumns.push(column);
      continue;
    }
    if (column.fixed === 'right') {
      fixedRightColumns.push(column);
      continue;
    }
    defColumns.push(column);
  }
  const resultColumns = [
    ...fixedLeftColumns,
    ...defColumns,
    ...fixedRightColumns,
  ].filter((item) => !item.defaultHidden);

  return resultColumns;
}

//操作
function handleActionColumn(propsRef, columns) {
  const { actionColumn } = unref(propsRef);
  if (!actionColumn) return;
  columns.push({
    // ...columns,
    fixed: 'right',
    ...actionColumn,
    resizable: false,
  });
}

export function useColumns(propsRef, tableElRef, getSlots) {
  const columnsRef = ref(unref(propsRef).columns);

  //显示隐藏 可以是布尔 可以是Function
  function isIfShow(column) {
    const isShow = column.isShow;

    let isIfShow = true;

    if (isBoolean(isShow)) {
      isIfShow = isShow;
    }
    if (isFunction(isShow)) {
      isIfShow = isShow(column);
    }
    return isIfShow;
  }

  const getColumnsRef = computed(() => {
    const columns = cloneDeep(unref(columnsRef));
    if (!columns) {
      return [];
    }
    handleActionColumn(propsRef, columns);
    //最后一行不能 伸缩resizable
    try {
      columns.length && (columns[columns.length - 1].resizable = false);
    } catch (error) {}
    return columns;
  });

  const getViewColumns = computed(() => {
    const viewColumns = sortFixedColumn(unref(getColumnsRef));
    const columns = cloneDeep(viewColumns);
    const { rowSelection } = unref(propsRef);

    let allWidth = 0;
    const getColumns = columns
      .filter((column) => {
        return isIfShow(column);
      })
      .map((column) => {
        let width = column.width || NORMAL_WIDTH;
        allWidth += Number.parseInt(width);
        return {
          ...column,
          resizable: column.resizable === false ? false : true,
          width,
          minWidth: width,
        };
      });
    const table = unref(tableElRef);
    const tableWidth = table?.$el?.offsetWidth ?? 0;
    if (tableWidth > allWidth) {
      let num = 0;
      //减去展开跟多选的宽度
      !!rowSelection && (num += 50);
      !!getSlots.expandedRowRender && (num += 50);
      if (!!allWidth && !!tableWidth) {
        getColumns.forEach((item) => {
          let ratioWidth = Math.floor(
            (tableWidth - num - 40) * (item.width / allWidth)
          );
          item.width = ratioWidth;
        });
      }
    }
    return getColumns;
  });

  const originalList = ref(unref(propsRef).columns);
  const setColumn = (dataIndex) => {
    columnsRef.value = dataIndex;
  };

  const getScrollX = computed(() => {
    let width = 0;

    const columns = unref(getColumnsRef);
    columns.forEach((item) => {
      width += Number.parseInt(item.width) || 0;
    });
    const unsetWidthColumns = columns.filter(
      (item) => !Reflect.has(item, 'width')
    );

    const len = unsetWidthColumns.length;
    if (len !== 0) {
      width += len * NORMAL_WIDTH;
    }

    const table = unref(tableElRef);
    const tableWidth = table?.$el?.offsetWidth ?? 0;
    return tableWidth > width ? '100%' : width;
  });

  const getScrollRef = computed(() => {
    const { scroll } = unref(propsRef);
    return {
      x: unref(getScrollX),
      scrollToFirstRowOnChange: false,
      ...scroll,
    };
  });

  watch(
    () => unref(propsRef).columns,
    (columns) => {
      columnsRef.value = columns;
      originalList.value = columns;
    }
  );

  return {
    getViewColumns,
    getScrollRef,
    setColumn,
  };
}
