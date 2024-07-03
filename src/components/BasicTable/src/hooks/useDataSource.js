
import { unref, onMounted, ref, watch, computed, watchEffect, reactive } from 'vue';
import { get, cloneDeep } from 'lodash-es';
import { isFunction, isBoolean } from './is';
import { PAGE_SIZE, FETCH_SETTING, ROW_KEY } from '../const';
import { buildUUID } from '../getKey';

export function useDataSource (propsRef, { tableData, setLoading, setPagination, getPaginationInfo, clearSelectedRowKeys }) {
    const searchState = reactive({
        sortInfo: {},
        filterInfo: {},
    });
    const dataSourceRef = ref([])

    watchEffect(() => {
        tableData.value = unref(dataSourceRef);
    });

    watch(
        () => unref(propsRef).dataSource,
        () => {
            const { dataSource, api } = unref(propsRef);
            !api && dataSource && (dataSourceRef.value = dataSource);
        },
        {
            immediate: true,
        }
    );
    //如果没有key 就自动生成一个
    function setTableKey (items) {
        if (!items || !Array.isArray(items)) return;
        items.forEach((item) => {
            if (!item[ROW_KEY]) {
                item[ROW_KEY] = buildUUID();
            }
            if (item.children && item.children.length) {
                setTableKey(item.children);
            }
        });
    }

    const getRowKey = () => {
        const { rowKey } = unref(propsRef);
        return rowKey ? rowKey : ROW_KEY;
    }

    // const getViewColumns = () => {
    //     const { columns } = unref(propsRef);
    //     return columns
    // }

    const getDataSourceRef = computed(() => {
        const dataSource = unref(dataSourceRef);
        const { rowKey } = unref(propsRef);
        if (!dataSource || dataSource.length === 0) {
            return [];
        }
        //没有指定的key 就自动生成一个
        if (!rowKey) {
            const firstItem = dataSource[0];
            const lastItem = dataSource[dataSource.length - 1];

            if (firstItem && lastItem) {
                if (!firstItem[ROW_KEY] || !lastItem[ROW_KEY]) {
                    const data = cloneDeep(unref(dataSourceRef));
                    data.forEach((item) => {
                        if (!item[ROW_KEY]) {
                            item[ROW_KEY] = buildUUID();
                        }
                        if (item.children && item.children.length) {
                            setTableKey(item.children);
                        }
                    });
                    dataSourceRef.value = data;
                }
            }
        }
        return unref(dataSourceRef);
    })

    function handleTableChange (
        pagination,
        filters,
        sorter
    ) {
        const { sortFn, filterFn } = unref(propsRef);
        // if (clearSelectOnPageChange) {
        clearSelectedRowKeys();
        // }
        setPagination(pagination);

        const params = {};
        if (sorter && isFunction(sortFn)) {
            const sortInfo = sortFn(sorter);
            searchState.sortInfo = sortInfo;
            params.sortInfo = sortInfo;
        }

        if (filters && isFunction(filterFn)) {
            const filterInfo = filterFn(filters);
            searchState.filterInfo = filterInfo;
            params.filterInfo = filterInfo;
        }
        fetch(params);
    }

    const fetch = async (opt) => {

        const {
            api,
            beforeFetch,
            afterFetch,
            pagination,
            params,
            fetchSetting
        } = unref(propsRef);
        if (!api) return;

        let pageParams = {}
        try {
            const { current = 1, pageSize = PAGE_SIZE } = unref(getPaginationInfo)
            const { pageField = FETCH_SETTING.pageField, sizeField = FETCH_SETTING.sizeField, listField = FETCH_SETTING.listField, totalField = FETCH_SETTING.totalField } = fetchSetting || FETCH_SETTING
            if ((isBoolean(pagination) && !pagination) || isBoolean(getPaginationInfo)) {
                pageParams = {};
            } else {
                pageParams[pageField] = (opt && opt.page) || current;
                pageParams[sizeField] = pageSize;
            }

            // let searchForm = propsRef.value.params || {}
            const { sortInfo = {}, filterInfo } = searchState;
            let parameter = {
                ...pageParams,
                ...params,
                ...pagination,
                ...opt,
                ...sortInfo,
                ...filterInfo,
                // ...(opt.sortInfo ?? {}),
                // ...(opt.filterInfo ?? {}),
            }
            if (beforeFetch && isFunction(beforeFetch)) {
                parameter = await beforeFetch(parameter) || parameter;
            }
            setLoading(true);
            const res = await api(parameter);

            const isArrayResult = Array.isArray(res);

            let resultItems = isArrayResult ? res : get(res, listField);
            const resultTotal = (isArrayResult ? 0 : get(res, totalField)) * 1;

            // 假如数据变少，导致总页数变少并小于当前选中页码，通过getPaginationRef获取到的页码是不正确的，需获取正确的页码再次执行
            if (resultTotal) {
                const currentTotalPage = Math.ceil(resultTotal / pageSize);
                if (current > currentTotalPage) {
                    setPagination({
                        current: currentTotalPage,
                    });
                    fetch(opt);
                }
            }
            if (afterFetch && isFunction(afterFetch)) {
                resultItems = await afterFetch(resultItems, res) || resultItems;
            }
            if (res) {
                dataSourceRef.value = res[listField]
            }
            setPagination({
                total: resultTotal || 0,
            });
            if (opt && opt.page) {
                setPagination({
                    current: opt.page || 1,
                });
            }
        } catch (error) {
            dataSourceRef.value = [];
            setPagination({
                total: 0,
            });
        } finally {
            setLoading(false);
        }
    }

    //获取表格数据
    function getDataSource () {
        return getDataSourceRef.value
    }
    //获取表格数据
    function setDataSource (dataSource) {
        dataSourceRef.value = unref(dataSource)
    }
    //刷新表格
    async function reload (opt) {
        setPagination({
            current: 1
        })
        await fetch(opt);
    }

    onMounted(() => {
        let useSearch = unref(propsRef).useSearch
        useSearch = isBoolean(useSearch) ? useSearch : false
        unref(propsRef).immediate && !useSearch && fetch();
    });
    return {
        getRowKey,
        getDataSourceRef,
        handleTableChange,
        reload,
        getDataSource,
        setDataSource
    }
}