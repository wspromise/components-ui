export const basicProps = {
    api: {
        type: Function,
        default: null,
    },
    beforeFetch: {
        type: Function,
        default: null,
    },
    afterFetch: {
        type: Function,
        default: null,
    },
    rowKey: {
        type: [String, Function],
        default: '',
    },
    columns: {
        type: Array,
        default: () => [],
    },
    scroll: {
        type: Object,
        default: null,
    },
    dataSource: {
        type: Array,
        default: null,
    },
    pagination: {
        type: [Object, Boolean],
        default: null,
    },
    rowSelection: {
        type: Object,
        default: null,
    },
    showResultTip: {
        type: Boolean,
        default: true,
    },
    //table表头传值，菜单下多类型table时加 sheetId
    sheetId: {
        type: Number,
    },
    // 无数据第一行
    noDataFirstLine: {
        type: String,
        default: '',
    },
    // 无数据第二行
    noDataSecondLine: {
        type: String,
        default: '',
    },
    // 无数据时是否显示表头
    showTableOnNoData: {
        type: Boolean,
        default: false,
    },
    propColumns: { type: [Object, Boolean], default: null },
};
