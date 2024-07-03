# Loading
一个自定义Loading组件
<script setup>
import ComponentModeFull from '@/views/loading/componentModeFull.vue'
import ComponentModeAbsolute from '@/views/loading/componentModeAbsolute.vue'
import ComponentModeFnFull from '@/views/loading/componentModeFnFull.vue'
import ComponentModeFnAbsolute from '@/views/loading/componentModeFnAbsolute.vue'
import ComponentModeDirective from '@/views/loading/componentModeDirective.vue'
</script>

## 组件方式-全屏Loading
组件方式-全屏Loading
<ComponentModeFull />
::: details 查看代码
```vue
<template>
  <div class="loading-wrap" loading-tip="加载中..." title="Loading组件示例">
    <div class="loading-inner">
      <a-button type="primary" @click="openCompFullLoading">
        全屏 Loading
      </a-button>

      <Loading
        :loading="compState.loading"
        :absolute="compState.absolute"
        :theme="compState.theme"
        :background="compState.background"
        :tip="compState.tip"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { Loading } from 'op-template';

/** state */
const compState = reactive({
  absolute: false,
  loading: false,
  theme: 'dark',
  background: 'rgba(111,111,111,.7)',
  tip: '加载中...',
});

/** computed */

/** watch */

/** lifecycle */

/** methods */
function openLoading(absolute) {
  compState.absolute = absolute;
  compState.loading = true;
  setTimeout(() => {
    compState.loading = false;
  }, 3000);
}

function openCompFullLoading() {
  openLoading(false);
}
</script>
```
:::

## 组件方式-容器内Loading
组件方式-容器内Loading
<ComponentModeAbsolute />
::: details 查看代码
```vue
<template>
  <div class="loading-wrap" loading-tip="加载中..." title="Loading组件示例">
    <div class="loading-inner">
      <a-button type="primary" @click="openCompAbsolute">
        容器内 Loading
      </a-button>

      <Loading
        :loading="compState.loading"
        :absolute="compState.absolute"
        :theme="compState.theme"
        :background="compState.background"
        :tip="compState.tip"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { Loading } from 'op-template';

/** state */
const compState = reactive({
  absolute: false,
  loading: false,
  theme: 'dark',
  background: 'rgba(111,111,111,.7)',
  tip: '加载中...',
});

/** computed */

/** watch */

/** lifecycle */

/** methods */
function openLoading(absolute) {
  compState.absolute = absolute;
  compState.loading = true;
  setTimeout(() => {
    compState.loading = false;
  }, 3000);
}

function openCompAbsolute() {
  openLoading(true);
}
</script>

<style scoped lang="less">
.loading-inner {
  position: relative;
  height: 100px;
}
</style>

```
:::

## 函数方式-全屏Loading
函数方式-全屏Loading
<ComponentModeFnFull />
::: details 查看代码
```vue
<template>
  <div class="loading-wrap" loading-tip="加载中..." title="Loading组件示例">
    <div class="loading-inner">
      <a-button type="primary" @click="openFnFullLoading">
        全屏 Loading
      </a-button>
    </div>
  </div>
</template>

<script setup>
import { createVNode } from 'vue';
import { useLoading } from 'op-template';
/** state */

/** computed */

/** watch */

/** lifecycle */

/** methods */
const [openFullLoading, closeFullLoading] = useLoading({
  //   tip: '加载中...',
  tip: createVNode('div', undefined, '3333333'),
});

function openFnFullLoading() {
  openFullLoading();

  setTimeout(() => {
    closeFullLoading();
  }, 2000);
}
</script>
```
:::

## 函数方式-容器内Loading
函数方式-容器内Loading
<ComponentModeFnAbsolute />
::: details 查看代码
```vue
<template>
  <div class="loading-wrap" loading-tip="加载中..." title="Loading组件示例">
    <div class="loading-inner" ref="wrapEl">
      <a-button type="primary" @click="openFnWrapLoading">
        容器内 Loading
      </a-button>
    </div>
  </div>
</template>

<script setup>
import { ref, createVNode } from 'vue';
import { useLoading } from 'op-template';
/** state */
const wrapEl = ref(null);
/** computed */

/** watch */

/** lifecycle */

/** methods */
const [openWrapLoading, closeWrapLoading] = useLoading({
  target: wrapEl,
  props: {
    // tip: '加载中...',
    tip: createVNode('div', undefined, '2222222222'),
    absolute: true,
  },
});

function openFnWrapLoading() {
  openWrapLoading();

  setTimeout(() => {
    closeWrapLoading();
  }, 2000);
}
</script>

<style scoped lang="less">
.loading-inner {
  position: relative;
  height: 100px;
}
</style>
```
:::


## 函数方式-指令方式Loading
函数方式-指令方式Loading
<ComponentModeDirective />
::: details 查看代码
```vue
<template>
  <div
    class="loading-wrap"
    v-loading.fullscreen="loadingRef"
    loading-tip="加载中..."
    title="Loading组件示例"
  >
    <div class="loading-inner">
      <a-button type="primary" @click="openDirectiveLoading">
        打开指令Loading
      </a-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

/** state */
const loadingRef = ref(false);

/** computed */

/** watch */

/** lifecycle */

/** methods */

function openDirectiveLoading() {
  loadingRef.value = true;
  setTimeout(() => {
    loadingRef.value = false;
  }, 2000);
}
</script>

<style scoped lang="less"></style>

```
:::

## API
| 属性 |类型  |默认值  |说明  |
| --- | --- | --- | --- |
|tip | [String, Object] | - | 当作为包裹元素时，可以自定义描述文案 |
|size | String | 'large' | 组件大小，可选值为 small、default、large |
|absolute | Boolean | false | 是否绝对定位，用于容器内loading |
|loading | Boolean | false | 是否loading |
|background | String | - | 背景颜色 |
|theme | String | - | 主题，可选值为'dark' 、'light' |

[更多API请参考ant-design-vue的Spin组件](https://3x.antdv.com/components/spin-cn#API)