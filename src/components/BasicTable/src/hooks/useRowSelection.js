import { computed, ref, unref, toRaw } from 'vue';
import { ROW_KEY } from '../const';

export function useRowSelection (propsRef, tableData, emit) {
    const selectedRowKeysRef = ref([]); //string[]
    const selectedRowRef = ref([]); //Recordable[]

    const getRowSelectionRef = computed(() => {
        let { rowSelection } = unref(propsRef);
        typeof rowSelection === 'function' && (rowSelection = rowSelection())

        if (!rowSelection) {
            return null;
        }

        return {
            selectedRowKeys: unref(selectedRowKeysRef),
            hideDefaultSelections: false,
            onChange: (selectedRowKeys, selectedRows) => {
                selectedRowKeysRef.value = selectedRowKeys;
                selectedRowRef.value = selectedRows;
                emit('selection-change', {
                    keys: selectedRowKeys,
                    rows: selectedRows,
                });
            },
            ...(rowSelection === undefined ? {} : rowSelection),
        };
    });

    //获取key  如果没传 就获取自动生成的key
    const getRowKey = () => {
        const { rowKey } = unref(propsRef);
        return rowKey ? rowKey : ROW_KEY;
    }

    function setSelectedRowKeys (rowKeys) {
        if (!rowKeys) return
        selectedRowKeysRef.value = rowKeys;

        const rows = toRaw(unref(tableData)).filter((item) =>
            rowKeys.includes(item[unref(getRowKey)])
        );
        selectedRowRef.value = rows;
    }

    function setSelectedRows (rows) {
        selectedRowRef.value = rows;
    }

    function clearSelectedRowKeys () {
        selectedRowRef.value = [];
        selectedRowKeysRef.value = [];
    }

    function deleteSelectRowByKey (key) {
        if (!key) return
        const selectedRowKeys = unref(selectedRowKeysRef);
        const index = selectedRowKeys.findIndex((item) => item === key);
        if (index !== -1) {
            unref(selectedRowKeysRef).splice(index, 1);
        }
    }

    function getSelectRowKeys () {
        return unref(selectedRowKeysRef);
    }

    function getSelectRows () {
        // const ret = toRaw(unref(selectedRowRef)).map((item) => toRaw(item));
        return unref(selectedRowRef);
    }

    function getRowSelection () {
        return unref(getRowSelectionRef);
    }

    return {
        getRowSelection,
        getRowSelectionRef,
        getSelectRows,
        getSelectRowKeys,
        setSelectedRowKeys,
        clearSelectedRowKeys,
        deleteSelectRowByKey,
        setSelectedRows,
    };
}