<template>
  <div class="box">
    <FooterBar footerBottom="100px" extra="123">
      <a-button class="btn-return" @click="handleCancel">
        {{ ODPTranslate('cancel') }}
      </a-button>

      <a-button
        class="btn-confirm"
        type="primary"
        @click.prevent="handleSubmit"
      >
        {{ ODPTranslate('submit') }}
      </a-button>
    </FooterBar>
  </div>
</template>

<script setup>
import FooterBar from '@/src/components/FooterBar/index.vue';
import { ODPTranslate } from '../../utils/common';
/** props */

/** emits */

/** state */

/** computed */

/** watch */

/** life cycle function */

/** methods */
const handleCancel = () => {};
const handleSubmit = () => {};
</script>

<style lang="less" scoped>
.box {
  position: relative;
  width: 100%;
  height: 200px;
  background-color: #ccc;
}
</style>
