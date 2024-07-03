<template>
  <div style="background-color: antiquewhite">
    <BasicHeader />
    <BasicMenu :permissionMenu="permissionMenu">
      <div>adasdad</div>
    </BasicMenu>
  </div>
</template>

<script setup>
import { BasicMenu, BasicHeader } from '@/src/components/BasicLayout';

/** state */
let permissionMenu = [
  {
    id: 123,
    parentId: 1,
    treeNodeList: [],
    moduleNameCn: '首页',
    moduleNameEn: 'Home',
    moduleOrder: 1,
    moduleIconName: 'Frame1321315577',
    modulePosition: 1,
    moduleType: 1,
    moduleLevel: 1,
    moduleUrl: null,
    permissionCode: '/home',
    remark: null,
  },
  {
    id: 2,
    parentId: 1,
    treeNodeList: [
      {
        id: 3,
        parentId: 2,
        treeNodeList: [
          {
            id: 6,
            parentId: 3,
            treeNodeList: [],
            moduleNameCn: '删除子系统',
            moduleNameEn: 'Remove System',
            moduleOrder: 3,
            moduleIconName: '菜单图标-暂无',
            modulePosition: 2,
            moduleType: 2,
            moduleLevel: 3,
            moduleUrl: '/ums/system/remove-system',
            permissionCode: '/ums/system/remove-system',
            remark: null,
          },
          {
            id: 5,
            parentId: 3,
            treeNodeList: [],
            moduleNameCn: '修改子系统',
            moduleNameEn: 'Update System',
            moduleOrder: 2,
            moduleIconName: '菜单图标-暂无',
            modulePosition: 2,
            moduleType: 2,
            moduleLevel: 3,
            moduleUrl:
              '/ums/system/modify-system,/ums/system/query-system-detail,/ums/system/upload-system-icon',
            permissionCode: '/ums/system/modify-system',
            remark: null,
          },
          {
            id: 4,
            parentId: 3,
            treeNodeList: [],
            moduleNameCn: '新增子系统',
            moduleNameEn: 'Add System',
            moduleOrder: 1,
            moduleIconName: '菜单图标-暂无',
            modulePosition: 2,
            moduleType: 2,
            moduleLevel: 3,
            moduleUrl:
              '/ums/system/create-system,/ums/system/upload-system-icon',
            permissionCode: '/ums/system/create-system',
            remark: null,
          },
        ],
        moduleNameCn: '子系统管理',
        moduleNameEn: 'Sys Name Manage',
        moduleOrder: 1,
        moduleIconName: 'Frame-2',
        modulePosition: 2,
        moduleType: 1,
        moduleLevel: 2,
        moduleUrl: '/ums/system/**,/ums/query/**',
        permissionCode: '/sysNameManage',
        remark: null,
      },
    ],
    moduleNameCn: '系统管理',
    moduleNameEn: 'system manage',
    moduleOrder: 1,
    moduleIconName: '小齿轮',
    modulePosition: 2,
    moduleType: 1,
    moduleLevel: 1,
    moduleUrl: '/ums/query/**',
    permissionCode: '/ums/systemManage',
    remark: null,
  },
  {
    id: 7,
    parentId: 1,
    treeNodeList: [
      {
        id: 9,
        parentId: 7,
        treeNodeList: [
          {
            id: 14,
            parentId: 9,
            treeNodeList: [],
            moduleNameCn: '角色修改',
            moduleNameEn: 'Role update',
            moduleOrder: 3,
            moduleIconName: 'update-icon',
            modulePosition: 1,
            moduleType: 2,
            moduleLevel: 3,
            moduleUrl: '/ums/role/modify-role,/ums/role/query-role-detail',
            permissionCode: '/ums/role/modify-role',
            remark: null,
          },
          {
            id: 13,
            parentId: 9,
            treeNodeList: [],
            moduleNameCn: '角色新增',
            moduleNameEn: 'Role add',
            moduleOrder: 2,
            moduleIconName: 'new-icon',
            modulePosition: 1,
            moduleType: 2,
            moduleLevel: 3,
            moduleUrl: '/ums/role/create-role',
            permissionCode: '/ums/role/create-role',
            remark: null,
          },
          {
            id: 12,
            parentId: 9,
            treeNodeList: [],
            moduleNameCn: '角色列表查询',
            moduleNameEn: 'Role List Query',
            moduleOrder: 1,
            moduleIconName: 'search-icon',
            modulePosition: 1,
            moduleType: 2,
            moduleLevel: 3,
            moduleUrl: '/ums/role/query-role-list',
            permissionCode: '/ums/roleList/query',
            remark: null,
          },
          {
            id: 15,
            parentId: 9,
            treeNodeList: [],
            moduleNameCn: '角色删除',
            moduleNameEn: 'Role delete',
            moduleOrder: 4,
            moduleIconName: 'delete-icon',
            modulePosition: 1,
            moduleType: 2,
            moduleLevel: 3,
            moduleUrl: '/ums/role/remove-role',
            permissionCode: '/ums/role/remove-role',
            remark: null,
          },
        ],
        moduleNameCn: '角色列表',
        moduleNameEn: 'Role List',
        moduleOrder: 2,
        moduleIconName: 'Frame-4',
        modulePosition: 1,
        moduleType: 1,
        moduleLevel: 2,
        moduleUrl: '/ums/role/query-role-list',
        permissionCode: '/userManage/roleList',
        remark: null,
      },
      {
        id: 8,
        parentId: 7,
        treeNodeList: [
          {
            id: 10,
            parentId: 8,
            treeNodeList: [],
            moduleNameCn: '用户列表查询',
            moduleNameEn: 'User List Query',
            moduleOrder: 1,
            moduleIconName: 'search-icon',
            modulePosition: 1,
            moduleType: 2,
            moduleLevel: 3,
            moduleUrl: '/ums/admin/query-admin-list,/ums/role/query-role-list',
            permissionCode: '/ums/userList/query',
            remark: null,
          },
          {
            id: 11,
            parentId: 8,
            treeNodeList: [],
            moduleNameCn: '用户修改',
            moduleNameEn: 'User List Update',
            moduleOrder: 2,
            moduleIconName: 'update-icon',
            modulePosition: 1,
            moduleType: 2,
            moduleLevel: 3,
            moduleUrl: '/ums/admin/query-admin-detail,/ums/admin/modify-admin',
            permissionCode: '/ums/admin/modify-admin',
            remark: null,
          },
        ],
        moduleNameCn: '用户列表',
        moduleNameEn: 'User List',
        moduleOrder: 1,
        moduleIconName: 'Frame-1-7h15hanm',
        modulePosition: 1,
        moduleType: 1,
        moduleLevel: 2,
        moduleUrl: '/ums/admin/query-admin-list,/ums/role/query-role-list',
        permissionCode: '/userManage/userList',
        remark: null,
      },
    ],
    moduleNameCn: '用户管理',
    moduleNameEn: 'User',
    moduleOrder: 2,
    moduleIconName: 'Frame1321315576',
    modulePosition: 1,
    moduleType: 1,
    moduleLevel: 1,
    moduleUrl: '/ums/admin/query-admin-list,/ums/role/query-role-list',
    permissionCode: '/ums/userManage',
    remark: null,
  },
];

function setMenuList(arr) {
  return arr.map(v => {
    return {
      ...v,
      routerUrl: v.permissionCode,
      treeNodeList:
        v.treeNodeList && v.treeNodeList.length
          ? setMenuList(v.treeNodeList)
          : v.treeNodeList,
    };
  });
}
console.log(setMenuList(permissionMenu));

/** computed */

/** watch */

/** lifecycle */

/** methods */
</script>

<style scoped lang="less"></style>
