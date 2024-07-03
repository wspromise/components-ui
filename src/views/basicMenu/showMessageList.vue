<template>
  <div class="basic-menu-container">
    <BasicMenu :showMessageList="showMessageList"></BasicMenu>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { BasicMenu } from '../../components/BasicLayout';
/** props */

/** emits */

/** state */
const showMessageList = reactive({
  repudiateTransactions: 0,
  phishingTrading: 0,
  disputeTransactions: 0,
  retrievalTransactions: 0,
  'pre-authorization': 2,
  messageList: 0, //系统通告
  chargebackNotice: 3, //拒付通知
  fraudNotice: 1, //伪冒通知
  retrievalNotice: 2, //调单通知
});

/** computed */

/** watch */

/** life cycle function */

/** methods */
</script>

<style lang="less" scoped></style>
