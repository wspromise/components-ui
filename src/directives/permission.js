export default (Vue) => {
  /**自定义按钮权限指令 */
  Vue.directive('hasPermission', {
    mounted(el, binding) {
      //获取按钮权限
      if (!Vue.config.globalProperties.$_hasPermission(binding.value)) {
        //移除不匹配的按钮
        el.parentNode.removeChild(el);
      }
    },
  });

  //检查权限方法
  Vue.config.globalProperties.$_hasPermission = function (value) {
    let isExist = false;

    var btnPermsArr = ['add', 'edit', 'del', 'ppp']; //获取从服务器请求存储本地的按钮权限
    if (btnPermsArr.includes(value)) {
      isExist = true;
    }
    return isExist;
  };
};
