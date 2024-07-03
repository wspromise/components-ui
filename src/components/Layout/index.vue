<template>
  <div class="layout">
    <Menu class="menu" />
    <div class="main">
      <Header class="header" />
      <!-- 面包屑 -->
      <div class="breadcrumb-outer">
        <Breadcrumb
          :breadList="['Breadcrumb1', 'Breadcrumb2', 'Breadcrumb3']"
        />
      </div>

      <router-view v-slot="{ Component }">
        <transition name="fade-slide" mode="out-in" appear>
          <!-- <keep-alive> -->
          <component :is="Component" class="component" />
          <!-- </keep-alive> -->
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Menu from './components/menu.vue';
import Header from './components/header.vue';
import Breadcrumb from '../Breadcrumb/index.vue';
export default defineComponent({
  name: 'Layout',
  components: {
    Menu,
    Header,
    Breadcrumb,
  },
  setup() {
    /** state */

    /** computed */

    /** watch */

    /** lifecycle */

    /** methods */

    return {};
  },
});
</script>

<style scoped lang="less">
.layout {
  display: flex;
  height: 100%;
}
.main {
  flex: 1;
  max-width: calc(100% - 220px) !important;
  background-color: #edeff3;
}
.menu {
  width: 220px;
}
.component {
  min-height: calc(100vh - 72px);
  margin: 20px 20px 0;
  border-radius: 4px;
  background-color: #fff;
  //   padding: 20px;
  position: relative;
  overflow-y: auto;
}

.fade-slide-leave-active,
.fade-slide-enter-active {
  transition: all 0.3s;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
.breadcrumb-outer {
  padding: 20px 0 0 20px;
  background-color: #edeff3;
  .breadcrumb-wrap {
    padding-bottom: 0;
  }
}
</style>
