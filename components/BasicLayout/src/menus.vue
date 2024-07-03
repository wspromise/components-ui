<template>
    <component
        :is="state.menuComponent"
        v-if="menu.moduleType !== 2"
        :menu="menu"
        :showMenuIcon="showMenuIcon"
        :route-children="state.routeChildren"
        @setSelectedKeys="onSetSelectedKeys"
        @setOpenKeys="onSetOpenKeys"
        :showMessageList="showMessageList"
    >
        <template v-if="menu.children && menu.children.length">
            <menus v-for="route in menu.children" 
               :key="route.id"   
               :menu="route"
               :showMenuIcon="showMenuIcon"
               @setSelectedKeys="onSetSelectedKeys"
               @setOpenKeys="onSetOpenKeys"
               :showMessageList="showMessageList"
            ></menus>
        </template>
    </component>
</template>

<script setup>
import { defineProps, reactive, markRaw,  watchEffect} from 'vue'
import MenuItem from './menuItem'
import Submenu from './submenu'

const menuComponent = {
    MenuItem: markRaw(MenuItem),
    Submenu: markRaw(Submenu)
}

const props = defineProps({
    menu: {
        type: Object,
        required: true
    },
    onSetSelectedKeys: {
        type: Function,
    },
    onSetOpenKeys: {
        type: Function,
    },
    showMenuIcon: {
        type: Boolean,
        default: false
    },
    showMessageList: {
        type: Object,
        default: {}
    },
})
const state = reactive({
    routeChildren: {},
    menuComponent: ''
})
const handleChildren = (children = []) => {
    if (!children || children.length === 0) return []
    return children.filter(item =>  item.moduleType !== 2)
}

const loadMenuComponent = () => {
    const { MenuItem, Submenu } = menuComponent
   
    const hasChildren = handleChildren(props.menu.children)

    if (hasChildren.length === 0) {
        state.menuComponent = MenuItem
        state.routeChildren = props.menu
    } else {
        state.menuComponent = Submenu
    }
}
const getCount =()=>{
let menu = props.menu;
let messageList = props.showMessageList;

if (menu&& menu.nodes ) {
    menu.totalValue = 0
    menu.nodes.forEach(item => {
        // 检查 item.moduleUrl 是否存在
        if (item.moduleUrl) {
            let moduleUrlWithoutSlash = item.moduleUrl.substring(1);
            // 检查 messageList 中是否存在对应的键
            if (messageList.hasOwnProperty(moduleUrlWithoutSlash)) {
                // 如果存在，将对应的值添加到 item.totalValue 中
                menu.totalValue += parseFloat(messageList[moduleUrlWithoutSlash]);
            }
        }
    });
}
}

watchEffect(() => { 
    // 加载相应的菜单组件
    loadMenuComponent()
    getCount()
})

</script>
<style lang="less" scoped>
.anticon {
    margin-right: 3px;
}
</style>
