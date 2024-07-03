import { ref, h, reactive } from 'vue';
import dayjs from 'dayjs';
export const columns = ref([
    {
        title: '姓名',
        dataIndex: 'name',
    },
    // {
    //     title: '年龄fixed-left',
    //     dataIndex: 'age',
    //     fixed: 'left',
    // },
    {
        title: '标签',
        dataIndex: 'label',
        customRender: ({ record }) => {
            let supplierBundleError = record.label
                ? ['成功', '待处理', '失败', '状态'][record.label - 1]
                : '-';
            let wordClass = [
                'odp-status-normal-button',
                'odp-status-pending-button',
                'odp-status-fail-button',
                'odp-status-pending-button',
            ][record.label - 1];

            return h(
                'div',
                { class: `${wordClass} odp-table-status-button ` },
                supplierBundleError
            );
        },
    },
    {
        title: '状态',
        dataIndex: 'status',
        customRender: ({ record }) => {
            let supplierBundleError = record.status
                ? ['成功', '待处理', '失败', '状态'][record.status - 1]
                : '-';
            let wordClass = [
                'odp-status-normal',
                'odp-status-pending',
                'odp-status-fail',
                'odp-status-pending',
            ][record.status - 1];
            return h(
                'div',
                { class: `${wordClass} odp-table-status-button ` },
                supplierBundleError
            );
        },
    },
    //   {
    //     title: '年龄3',
    //     dataIndex: 'age',
    //   },
    {
        title: '年龄',
        dataIndex: 'age',
    },
    //   {
    //     title: '年龄',
    //     dataIndex: 'age',
    //   },
    {
        title: '住址',
        dataIndex: 'address',
        width: 100,
    },
    {
        title: 'age1',
        dataIndex: 'age1',
        isShow: false,
    },
    //   {
    //     title: 'age1aaaaaa',
    //     dataIndex: 'age1',
    //   },
    //   {
    //     title: 'age1aaaaaa',
    //     dataIndex: 'age1',
    //   },
    //   {
    //     title: 'age1aaaaaa',
    //     dataIndex: 'age1',
    //   },
    //   {
    //     title: 'age1aaaaaa',
    //     dataIndex: 'age1',
    //   },
    //   {
    //     title: 'age1',
    //     dataIndex: 'age1',
    //   },
    {
        title: 'age3',
        dataIndex: 'age3',
        isShow: (column) => {
            return true;
        },
        resizable: false,
    },
    // {
    //     title: 'age2',
    //     dataIndex: 'age2',
    //     customRender: ({ record, text }) => {
    //         return text
    //     },
    //     fixed: 'right',
    //     resizable: false
    // },
    //   {
    //     title: '操作',
    //     dataIndex: 'action111',
    //     customRender: ({ record, text }) => {
    //       return 111;
    //     },
    //     fixed: 'right',
    //     isOperation: true,
    //   },
]);
export const dataSource = [
    {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
    },
    {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
    },
];

export const columnsDesc = [
    {
        label: 'id',
        field: 'id',
    },
    {
        label: '姓名',
        field: 'name',
    },
    {
        label: 'age',
        field: 'age',
    },
    {
        label: 'age1',
        field: 'age1',
    },
    {
        label: 'age2',
        field: 'age2',
    },
    {
        label: 'age3',
        field: 'age3',
    },
];
const checkDate = async (_rule, value) => {
    if (!value) {
        return Promise.reject('Please input the password');
    } else {
        return Promise.resolve();
    }
};

export const schemas = [
    {
        field: 'field1',
        component: 'CustomRangePicker',
        componentProps: {
            placeholder: 'CustomRangePicker',
        },
    },
    {
        field: 'date111',
        component: 'DatePicker',
        defaultValue: dayjs().format('YYYY-MM-DD'),
        componentProps: (res) => {
            return {
                placeholder: 'DatePicker',
                style: { width: '100%' },
                valueFormat: 'YYYY-MM-DD',
            };
        },
    },
    {
        field: 'field2',
        component: 'Input',
        defaultValue: 111,
        componentProps: {
            placeholder: 'Input2',
            trim: true,
        },
        // rules: [{ validator: checkDate, message: '请输入' }],
    },
    {
        field: 'field3',
        component: 'Input',
        defaultValue: '1',
        componentProps: ({ formModel }) => {
            return {
                placeholder: 'Input3',
            };
        },
        rules: [{ required: true, message: '请输入' }],
    },
    {
        field: 'field4',
        component: 'Input',
        componentProps: {
            placeholder: 'Input4',
        },
    },
    {
        field: 'field5',
        component: 'Input',
        componentProps: {
            placeholder: 'Input5',
        },
    },
    {
        field: 'field6',
        component: 'Input',
        componentProps: {
            placeholder: 'Input6',
        },
    },
    {
        field: 'field222222',
        component: 'Input',
        componentProps: ({ formModel }) => {
            formModel.pay = 'zfb';
            return {
                placeholder: '带后缀',
            };
        },
        suffix: '天',
    },
    {
        field: '插槽slot',
        component: 'Input',
        slot: 'slotName',
        defaultValue: '1000',
        componentProps: {
            placeholder: '插槽slot',
        },
    },
];
