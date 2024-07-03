import { ref, unref, toRaw } from 'vue';

export function useTable (props) {
    const tableRef = ref(null);
    function register (instance, formInstance) {
        tableRef.value = instance;
        props && instance.setTableProps(props);
    }
    //获取ref
    function getTableInstance () {
        const table = unref(tableRef);
        if (!table) {
            console.error('获取表实例失败');
        }
        return table;
    }

    const methods = {
        setTableProps: (tableProps) => {
            unref(tableRef).setTableProps(tableProps);
        },
        //刷新
        reload: async (opt) => {
            getTableInstance().reload(opt);
        },
        // 获取列表设置
        getTableSettingList: async () => {
            getTableInstance().getTableSettingList();
        },
        //设置数据
        setDataSource: (dataSource) => {
            return toRaw(getTableInstance().setDataSource(dataSource));
        },
        //获取数据
        getDataSource: () => {
            return toRaw(getTableInstance().getDataSource());
        },

        //获取勾选框信息
        getRowSelection: () => {
            return toRaw(getTableInstance().getRowSelection());
        },
        //获取选中行的 rows
        getSelectRows: () => {
            return toRaw(getTableInstance().getSelectRows());
        },
        // 清空选中行
        clearSelectedRowKeys: () => {
            getTableInstance().clearSelectedRowKeys();
        },
        //根据 key 删除取消选中行
        deleteSelectRowByKey: (key) => {
            getTableInstance().deleteSelectRowByKey(key);
        },
        //设置选中行
        setSelectedRowKeys: (keys) => {
            getTableInstance().setSelectedRowKeys(keys);
        },
        //获取选中行的 keys
        getSelectRowKeys: () => {
            return toRaw(getTableInstance().getSelectRowKeys());
        },
        //保存列表设置
        handleSetting: (fieldList) => {
            return getTableInstance().handleSetting(fieldList);
        },
    };
    return [register, methods];
}
