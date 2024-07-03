<template>
  <div>
    <h2>Table</h2>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="reload()">reload-刷新表格</a-button>
        <a-button type="primary" @click="getData()"
          >getDataSource-获取表格数据,也可以在afterFetch回调里获取完整后端数据</a-button
        >
        <a-button type="primary" @click="add()">新增一列数据</a-button>

        <a-tooltip
          placement="bottom"
          trigger="click"
          color="#fff"
          overlayClassName="tooltip-overlay"
        >
          <template #title>
            <div class="tooltip-sty">
              <a-button type="primary" @click="getSelected()"
                >获取选中行(所有信息跟行信息)</a-button
              >
              <a-button type="primary" @click="clearSelectedRowKeys()"
                >清空选中行</a-button
              >
              <a-button type="primary" @click="setSelect()"
                >设置选中行</a-button
              >
              <a-button type="primary" @click="delSelect()"
                >根据 key 删除取消选中行</a-button
              >
            </div>
          </template>
          <a-button type="primary" @click="delSelect()"
            ><div class="display-center">
              更多<iconpark-icon name="down" size="20"></iconpark-icon></div
          ></a-button>
        </a-tooltip>
      </template>
      <template #action>
        <a-button type="link">Primary Button</a-button>
        <a-button type="link" class="odp-button-link-danger">Primary </a-button>
      </template>
      <template #bodyCell="{ column }">
        <template v-if="column.dataIndex === 'name'"> 内容插槽 </template>
      </template>
      <template #headerCell="data">
        <template v-if="data.column.dataIndex === 'name'"> 表头插槽 </template>
        <template v-if="data.column.dataIndex === 'action'">
          {{ data.column.title }}
        </template>
      </template>
      <template #expandedRowRender="{ record }">
        <!-- <p style="margin: 0">  
          {{ record }}
        </p> -->
        <Descriptions :columns="columnsDesc" :descData="record"></Descriptions>
      </template>
    </BasicTable>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { FunnelPlotOutlined } from '@ant-design/icons-vue';
import { useTable, BasicTable } from '@/src/components/BasicTable/index.js';
import { Descriptions } from '@/src/components/Descriptions';
import { getList } from '@/api/api.js';
import { columns, dataSource, columnsDesc } from './data';

export default defineComponent({
  name: 'Table',
  components: {
    BasicTable,
    Descriptions,
    FunnelPlotOutlined,
  },
  setup() {
    /** state */

    const [
      registerTable,
      {
        reload,
        getDataSource,
        getRowSelection,
        getSelectRows,
        clearSelectedRowKeys,
        deleteSelectRowByKey,
        setSelectedRowKeys,
        getSelectRowKeys,
        setColumn,
      },
    ] = useTable({
      api: getList,
      params: {
        name: '123123',
      },
      columns,
      dataSource,
      beforeFetch: parameter => {
        // console.log(parameter); 请求前的回调
      },
      afterFetch: (resultItems, res) => {
        // console.log(resultItems); //请求后的回调
        // console.log(res);
      },
      fetchSetting: {
        // 分页配置 有默认值，需要过滤就 填写对应的字段
        pageField: 'page',
        sizeField: 'pageSize',
        listField: 'list',
        totalField: 'total',
      },
      actionColumn: {
        width: 200,
        title: '操作',
        dataIndex: 'action',
        //插槽名称
        customSlots: 'action',
        fixed: 'right',
      },
      rowSelection: {
        type: 'checkbox',
      },
    });
    /** computed */

    /** watch */

    /** lifecycle */

    /** methods */
    const getData = () => {
      console.log(getDataSource());
    };
    const add = () => {
      columns.value.unshift({
        title: '新增的字段',
        dataIndex: 'id',
      });
    };
    const getSelected = () => {
      console.log(getRowSelection(), '获取选中的数据');
      console.log(getSelectRows(), '获取选中的行');
      console.log(getSelectRowKeys(), '获取选中的key');
    };
    const setSelect = () => {
      //传入key
      return;
      setSelectedRowKeys([]);
    };
    const delSelect = () => {
      //传入key
      return;
      deleteSelectRowByKey();
    };

    return {
      registerTable,
      reload,
      getData,
      add,
      getSelected,
      clearSelectedRowKeys,
      setSelect,
      delSelect,
      columnsDesc,
    };
  },
});
</script>

<style scoped lang="less"></style>
