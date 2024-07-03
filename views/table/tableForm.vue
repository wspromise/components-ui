<template>
  <div>
    <SearchContainer
      :schemas="schemas"
      @search="handleSearch"
      :fieldMapToTime="fieldMapToTime"
    >
      <template #slotName="{ model, field }">
        <!-- slot方式  -->
        <a-form-item-rest>
          <a-input-group compact>
            <a-select v-model:value="model['pay']" style="width: 40%">
              <a-select-option value="zfb"> 支付宝 </a-select-option>
              <a-select-option value="yl"> 银联 </a-select-option>
            </a-select>
            <a-input v-model:value="model[field]" style="width: 60%" />
          </a-input-group>
        </a-form-item-rest>
      </template>
    </SearchContainer>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" class="odp-normal-btn"
          >reload-刷新表格</a-button
        >
        <a-button type="primary" disabled>reload-刷新表格</a-button>
      </template>
      <template #action>
        <a-button
          type="link"
          class="odp-button-link-success odp-button-link-line"
        >
          Primary</a-button
        >
        <a-button
          type="link"
          class="odp-button-link-danger odp-button-link-line"
          >danger
        </a-button>
        <a-button
          type="link"
          class="odp-button-link-warning odp-button-link-line"
          >warning
        </a-button>
        <a-button
          type="link"
          class="odp-button-link-pending odp-button-link-line"
          >pending
        </a-button>
        <a-button type="link" class="odp-button-link-default"
          >default
        </a-button>
      </template></BasicTable
    >
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { SearchContainer } from '@/components/BasicForm/index.js';
import { useTable, BasicTable } from '@/components/BasicTable/index.js';
import { schemas, columns } from './data';
import { getList } from '@/api/api.js';

export default defineComponent({
  name: '',
  components: {
    BasicTable,
    SearchContainer,
  },
  setup(props, { emit }) {
    let params = ref({});
    const [registerTable, { reload }] = useTable({
      api: getList,
      params,
      columns,
      useSearch: true,
      actionColumn: {
        width: 200,
        title: '操作',
        dataIndex: 'action',
        //插槽名称
        customSlots: 'action',
        fixed: 'right',
        isOperation: true,
      },
    });
    const handleSearch = (v) => {
      params.value = v;
      reload();
    };

    return {
      schemas,
      registerTable,
      handleSearch,
      reload,
      fieldMapToTime: [
        ['field1', ['startTime', 'endTime'], 'YYYY-MM-DD HH:mm:ss'],
      ],
    };
  },
});
</script>

<style scoped lang="less"></style>
