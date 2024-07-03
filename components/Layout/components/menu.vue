<template>
  <div class="menu-nav">
    <div class="herder"><div>Template</div></div>
    <div>
      <a-menu
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        @click="handleClick"
      >
        <a-menu-item v-for="item in permissionMenu" :key="`/${item.name}`">
          <span>{{ item.title }}</span>
        </a-menu-item>
      </a-menu>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import permissionMenu from '../permissionMenu';

export default defineComponent({
  name: 'Menu',
  setup() {
    /** state */
    const route = useRoute();
    const router = useRouter();
    const selectedKeys = ref([]);
    const openKeys = ref([]);

    /** computed */

    /** watch */

    /** lifecycle */
    onMounted(() => {
      selectedKeys.value = [route.path];
    });
    /** methods */
    const handleClick = (e) => {
      if (e.key) {
        router.push(e.key);
      }
    };
    return {
      selectedKeys,
      openKeys,
      handleClick,
      permissionMenu,
    };
  },
});
</script>

<style scoped lang="less">
.menu-nav {
  font-size: 16px;
  height: 100%;
  background-color: #fff;
  .herder {
    padding: 12px 16px;
    div {
      background-color: #e0f8ed;
      height: 32px;
      text-align: center;
      line-height: 32px;
      border-radius: 16px;
    }
  }
}
</style>
