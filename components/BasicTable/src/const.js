const table = {
    fetchSetting: {
        pageField: 'current_page',
        sizeField: 'page_size',
        listField: 'list',
        totalField: 'total',
    },
    pageSizeOptions: ['10', '20', '50', '100'],
    defaultPageSize: 10,
    defaultSortFn: (sortInfo) => {
        const { field, order } = sortInfo;
        return {
            field,
            order,
        };
    },
    defaultFilterFn: (data) => {
        return data;
    },
}

const { pageSizeOptions, defaultPageSize, fetchSetting, defaultSortFn, defaultFilterFn } = table;

export const PAGE_SIZE_OPTIONS = pageSizeOptions;

export const PAGE_SIZE = defaultPageSize;

export const FETCH_SETTING = fetchSetting;

export const DEFAULT_SORT_FN = defaultSortFn;

export const DEFAULT_FILTER_FN = defaultFilterFn;

export const ROW_KEY = 'tableKey_w';