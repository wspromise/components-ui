import { common as commonZH } from '../i18n/common/zh';
import { common as commonEN } from '../i18n/common/en';
import dayjs from 'dayjs';
import Big from 'big.js';
import { message } from 'ant-design-vue';
import { unref } from 'vue';

// 检查数据类型
export const checkDataType = target =>
  Object.prototype.toString.call(target).slice(8, -1);
export const isNumber = val => checkDataType(val) === 'Number';
export const isString = val => checkDataType(val) === 'String';
export const isBoolean = val => checkDataType(val) === 'Boolean';
export const isArray = val => Array.isArray(val);
export const isFunction = val => checkDataType(val) === 'Function';
export const isObject = val => checkDataType(val) === 'Object';

// 批量导入文件处理方法
export function importFiles(arr) {
  // 该函数用于将所有分区路由中的路由添加到路由数组
  const list = []; // 路由数组 - 存放所有路由
  // console.log(arr);
  arr.keys().forEach(key => {
    list.push(...arr(key).default);
  });
  return list;
}

// 批量导入文件处理方法-导入i18
export function importFilesForI18n(arr) {
  const obj = {};
  arr.keys().forEach(key => {
    obj[Object.keys(arr(key))[0]] = arr(key)[Object.keys(arr(key))[0]];
  });
  return obj;
}

/**
 * 获取localStorage
 */
export function getStore(key) {
  if (!key || typeof window === 'undefined') return;
  let result = window.localStorage.getItem(key);
  try {
    result = JSON.parse(result);
  } catch (err) {}
  if (result == null || result == undefined || result == '') {
    result = '';
  }
  return result;
}

/**
 * 删除localStorage
 */
export function removeStore(key) {
  if (!key || typeof window === 'undefined') return;
  window.localStorage.removeItem(key);
}

/**
 * 存储localStorage
 */
export function setStore(key, content) {
  if (!key || typeof window === 'undefined') return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(key, content);
}

// 语言包
const messageMap = {
  zh: commonZH,
  en: commonEN,
};

// 翻译函数
export const ODPTranslate = (keys, obj) => {
  try {
    const keyList = keys.split('.');
    const value = keyList.reduce((prev, current) => {
      prev = prev[current];
      return prev;
    }, messageMap[getStore('lang')?.slice(0, 2)] || 'zh');
    return obj ? value(obj) : value;
  } catch (error) {
    console.warn(`${keys}找不到翻译`);
  }
};

export const isSameValue = (newValue, oldValue) =>
  JSON.stringify(newValue) === JSON.stringify(oldValue);

/**
 *  只显示一次弹窗
 * @param {*} msg
 * @param {*} type
 * @param {*} customClass
 * @returns
 */
export const showMsgWs = ({
  content,
  type = 'error',
  duration = 3,
  icon,
  key,
  style,
  onClick,
  onClose,
  className = '',
}) => {
  if (typeof window === 'undefined') return;
  if (window.messageStatus) {
    return;
  }

  window.messageStatus = true;
  let opt = {
    class: className,
    content,
    duration,
    icon,
    key,
    style,
    onClick,
    onClose: () => {
      window.messageStatus = false;
      onClose && onClose();
    },
  };

  message[type](opt);
};

/**
 * 验证时间范围
 */
const timeMap = {
  365: 'limitDateOneYear',
  180: 'limit6',
  30: 'limit30',
  90: 'limit90',
};
/**
 * 校验时间范围
 * @param {*} value  日期范围 Array
 * @param {*} timeLength  限制时间范围的时长 Number
 * @param {*} msg  错误信息 String
 * @param {*} required  是否必填 Boolean
 * @param {*} requiredStartTimeMsg  开始时间的必填校验信息 String
 * @param {*} requiredEndTimeMsg  结束时间的必填校验信息 String
 * @returns
 */
export const validatorDateRange = ({
  required,
  value,
  timeLength,
  msg,
  requiredStartTimeMsg = ODPTranslate('requiredStartTimeMsg'),
  requiredEndTimeMsg = ODPTranslate('requiredEndTimeMsg'),
}) => {
  let [startTime, endTime] = value;

  let isValidStartTime = !dayjs(startTime).isValid();
  let isValidEndTime = !dayjs(endTime).isValid();
  if (required && (isValidStartTime || isValidEndTime)) {
    showMsgWs({
      type: 'warning',
      content: isValidStartTime ? requiredStartTimeMsg : requiredEndTimeMsg,
    });
    return false;
  }

  let diff = startTime && endTime ? dayjs(endTime).diff(startTime, 'day') : 0;
  if (diff > timeLength) {
    showMsgWs({
      type: 'warning',
      content: msg ? msg : ODPTranslate(timeMap[timeLength]),
    });
    return false;
  } else {
    return true;
  }
};

// 获取浏览器缩放比例
export const detectZoom = () => {
  if (typeof window === 'undefined') return;
  if (isMac())
    // mac系统缩小20%
    return 120;

  var ratio = 0,
    screen = window.screen,
    ua = navigator.userAgent.toLowerCase();

  if (window.devicePixelRatio !== undefined) {
    ratio = window.devicePixelRatio;
  } else if (~ua.indexOf('msie')) {
    if (screen.deviceXDPI && screen.logicalXDPI) {
      ratio = screen.deviceXDPI / screen.logicalXDPI;
    }
  } else if (
    window.outerWidth !== undefined &&
    window.innerWidth !== undefined
  ) {
    ratio = window.outerWidth / window.innerWidth;
  }

  if (ratio) {
    ratio = Math.round(ratio * 100);
  }
  return ratio;
};
/**
 * 判断是否为mac系统
 * @returns
 */
export const isMac = function () {
  return /macintosh|mac os x/i.test(navigator.userAgent);
};
// 修改对应的浏览器缩放比例
export const getZoom = () => {
  let ratio = (100 / detectZoom()) * 100; //比例
  return {
    bodyZoom: `${ratio}%`, //body比例
    floatBodyZoom: ratio / 100,
    // echartsZoom: detectZoom() > 100 ? 100 / ratio : '100%', //echarts比例
    echartsZoom: '100%', //echarts比例
  };
};

/**
 *  防抖
 * @param {*} fn 要执行的函数
 * @returns
 */
export const debounce = fn => {
  // loading状态
  let loading = null;
  return async function () {
    try {
      if (loading) return;
      loading = true;

      // 改变this指向，如果fn是箭头函数，fn里面的this是指向其上层作用域的this, 并把参数传递给fn
      await fn.apply(this, arguments);
    } catch (error) {
      console.log(error);
    }
    loading = null;
  };
};

/**
 *
 * @param {*} num   为传入的值
 * @param {*} n     为保留的小数位
 * @param {*} isToThousands  是否转为千分位（是传true）
 * @returns
 */
export const fomatFloat = (num, n, isToThousands) => {
  let f = parseFloat(num);
  if (isNaN(f)) {
    return false;
  }
  f = Math.floor(num * 10 ** n) / 10 ** n; // n 幂
  let s = f.toString();
  let rs = s.indexOf('.');
  //判定如果是整数，增加小数点再补0
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + n) {
    s += '0';
  }
  if (isToThousands) return s.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return s;
};

// 获取url参数
export const parseUrlQuery = () => {
  if (typeof window === 'undefined') return;
  let result = {};
  let url = window.location.href;
  let query = url.split('?')[1];
  if (query) {
    let queryArr = query.split('&');
    queryArr.forEach(function (item) {
      let key = item.split('=')[0];
      result[key] = item.split('=')[1];
    });
  }
  return result;
};

/**
 * 全屏Hooks
 * @param {*} fullScreenEle 全屏的元素
 * @returns
 */
export const useFullScreen = ({
  fullScreenEle = typeof document !== 'undefined' && document.documentElement,
}) => {
  /**
   * 遍历执行兼容的方法
   * @param {*} methodList 方法列表
   * @param {*} element 全屏元素
   */
  const eachCompatibleMethod = (methodList, element) => {
    for (let i = 0; i < methodList.length; i++) {
      const method = methodList[i];
      if (method) {
        method.call(element);
        break;
      }
    }
  };

  // 获取正在全屏的元素
  const getFullScreeningElement = () => {
    if (typeof document === 'undefined') return;
    // 正在全屏的元素
    const {
      fullscreenElement,
      webkitFullscreenElement,
      mozFullScreenElement,
      webkitIsFullScreen,
      mozFullScreen,
    } = document;
    return (
      fullscreenElement ||
      webkitFullscreenElement ||
      mozFullScreenElement ||
      webkitIsFullScreen ||
      mozFullScreen
    );
  };

  // 退出全屏
  const exitFullScreen = () => {
    if (typeof document === 'undefined') return;
    // 退出全屏的兼容方法
    const {
      webkitExitFullscreen,
      mozCancelFullScreen,
      exitFullscreen,
      msRequestFullscreen,
    } = document;

    // 退出全屏的方法列表
    const exitFullscreenMethods = [
      webkitExitFullscreen,
      mozCancelFullScreen,
      exitFullscreen,
      msRequestFullscreen,
    ];
    eachCompatibleMethod(exitFullscreenMethods, document);
  };

  // 全屏
  const launchFullScreen = () => {
    if (typeof document === 'undefined') return;
    const {
      requestFullscreen,
      mozRequestFullScreen,
      webkitRequestFullScreen,
      msExitFullscreen,
    } = document.documentElement;

    // 全屏的方法列表
    const fullScreenMethods = [
      requestFullscreen,
      mozRequestFullScreen,
      webkitRequestFullScreen,
      msExitFullscreen,
    ];
    if (!unref(fullScreenEle)) return;
    eachCompatibleMethod(fullScreenMethods, unref(fullScreenEle));
  };

  // 切换全屏
  const toggleFullScreen = () => {
    // 正在全屏的元素
    const fullScreeningElement = getFullScreeningElement();
    if (fullScreeningElement) {
      // 退出全屏
      exitFullScreen();
    } else {
      // 全屏
      launchFullScreen();
    }
  };

  // 监听全屏状态变化
  const listenFullScreen = fullScreenChange => {
    const fullscreenChangeMethods = [
      'fullscreenchange',
      'webkitfullscreenchange',
      'mozfullscreenchange',
      'msfullscreenchange',
    ];
    let element = unref(fullScreenEle);
    if (!element) return;
    fullscreenChangeMethods.forEach(method => {
      element.addEventListener(method, fullScreenChange);
    });
  };

  return {
    getFullScreeningElement,
    exitFullScreen,
    launchFullScreen,
    toggleFullScreen,
    listenFullScreen,
  };
};

// 工具函数
/**
 * @param {*} res 数据 二进制流
 * @param {*} fileName 文件名
 */
export const exportFile = (res, fileName = 'fileData', fileType = 'xlsx') => {
  if (typeof document === 'undefined') return;
  if (!res) return;
  let url = '';
  let blobTypeParams = {};
  if (fileType === 'xls') {
    blobTypeParams = {
      type: 'application/vnd.ms-excel',
    };
  }
  if (fileType === 'pdf') {
    blobTypeParams = {
      type: 'application/pdf',
    };
  }
  if (fileType === 'xlsx') {
    blobTypeParams = {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    };
  }
  if (fileType === 'zip') {
    blobTypeParams = {
      type: 'application/zip',
    };
  }
  url = window.URL.createObjectURL(new Blob([res]), blobTypeParams);
  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = url;
  link.setAttribute('download', `${fileName}.${fileType}`);
  document.body.appendChild(link);
  link.click();
};
// 格式化日期
export const formatDate = (time, type = 'YYYY-MM-DD') => {
  let date = dayjs(time).format(type);
  return date === 'Invalid Date' ? '-' : date;
};
/**
 * 限制输入特殊字符
 * @param {*} value
 * @returns
 */
export const limitSpecialCharacters = value => {
  let reg = new RegExp(
    "[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]"
  );
  return reg.test(value);
};

/**
 * 控制全屏
 */
export function controlFullScreen() {
  if (typeof document === 'undefined') return;
  const {
    fullscreenElement,
    webkitFullscreenElement,
    mozFullScreenElement,
    webkitIsFullScreen,
    mozFullScreen,
    webkitExitFullscreen,
    mozCancelFullScreen,
    exitFullscreen,
    msRequestFullscreen,
  } = document;

  // 退出全屏的方法
  const exitFullscreenMethods = [
    webkitExitFullscreen,
    mozCancelFullScreen,
    exitFullscreen,
    msRequestFullscreen,
  ];

  // 正在全屏的元素
  const fullScreeningElement =
    fullscreenElement ||
    webkitFullscreenElement ||
    mozFullScreenElement ||
    webkitIsFullScreen ||
    mozFullScreen;
  if (fullScreeningElement) {
    // 退出全屏
    eachCompatibleMethod(exitFullscreenMethods, document);
  } else {
    // 全屏
    launchFullScreen();
  }
}

/**
 * 封装函数，控制全屏
 */
function launchFullScreen() {
  if (typeof document === 'undefined') return;
  const {
    requestFullscreen,
    mozRequestFullScreen,
    webkitRequestFullScreen,
    msExitFullscreen,
  } = document.documentElement;
  const launchFullScreenMethods = [
    requestFullscreen,
    mozRequestFullScreen,
    webkitRequestFullScreen,
    msExitFullscreen,
  ];
  eachCompatibleMethod(launchFullScreenMethods, document.documentElement);
}

/**
 * 遍历执行兼容的方法
 * @param {*} methodList 方法列表
 * @param {*} element 全屏元素
 */
function eachCompatibleMethod(methodList, element) {
  for (let i = 0; i < methodList.length; i++) {
    const method = methodList[i];
    if (method) {
      method.call(element);
      break;
    }
  }
}

/**
 * 监听全屏状态变化
 */
export function listenFullScreen(callback) {
  if (typeof document === 'undefined') return;
  const fullscreenChangeMethods = [
    'fullscreenchange',
    'webkitfullscreenchange',
    'mozfullscreenchange',
    'msfullscreenchange',
  ];
  fullscreenChangeMethods.forEach(method => {
    document.addEventListener(method, callback);
  });
}

// 各个环境跳转至center系统的地址
export const toCenterSysUrlMap = {
  development: 'https://center-d.oceanpayment.com',
  test: 'https://center-t.oceanpayment.com',
  mirr: 'https://center-m.oceanpayment.com',
  sandbox: 'https://test-center.oceanpayment.com',
  production: 'https://center.oceanpayment.com',
};

// 判断是否是外部链接
export const isExternalLink = url => {
  if (typeof window === 'undefined') return;
  const pattern = /^https?:\/\//i;
  if (pattern.test(url)) {
    const hostname = window.location.hostname;
    const urlHostname = new URL(url).hostname;
    return hostname !== urlHostname;
  }
  return false;
};

// 全局配置
export const opGlobalConfig = {
  // 表格配置
  /**
   * @param {*} options
   * showListSetting   Boolean    是否显示列表设置
   * menuFieldsList    Function   获取列表配置的字段信息
   * menuFieldsSave    Function   保存列表配置的字段
   */
  tableConfig: options => {
    if (typeof window === 'undefined') return;
    let { showListSetting, menuFieldsSave, menuFieldsList } = options;
    window.opTableConfig = {
      ...options,
      showListSetting: !!showListSetting,
      menuFieldsSave,
      menuFieldsList,
    };
  },

  // 搜索表单配置
  /**
   * @param {*} options
   * openSearchCache   Number    是否开启搜索缓存（0-关闭 1-开启）
   * store             Object    store
   */
  searchFormConfig: options => {
    if (typeof window === 'undefined') return;
    window.opSearchFormConfig = options;
  },
};
// 表格单元格为空时，设置占位符
export const textEmptyPlaceholder = text =>
  [null, undefined, ''].includes(text) ? '-' : text;
// 从options中获取value值
export const getOptionsLabelByValue = (
  options,
  value,
  lableField = 'label',
  valueField = 'value'
) => {
  let option = unref(options).find(item => item[valueField] === value);
  if (option) return option[lableField];
};

/**
 * 判断是否是移动端
 * @returns
 */
export const isMobile = () => {
  let flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
  return flag;
};

/**
 * 获取正在使用的插槽
 * @returns
 */
export const getUsedSlots = () => {
  let currentInstance = getCurrentInstance();
  let usedSlots = currentInstance.slots;
  let usedSlotsNameList = Object.keys(usedSlots);
  return usedSlotsNameList;
};

// 是否使用了该插槽
export const isUsedSlot = slotName => getUsedSlots()?.includes(slotName);

/**
 * 获取下拉框列表的Hooks
 * @param {*} configList 配置列表
 * item为对象 ===>
 * api 请求下拉框列表的接口
 * params 参数
 * options 定义的ref
 * lableField = 'label'
 * valueField = 'value'
 * resField
 * loading
 * @param {*} optionsConfig options配置 async属性Boolean类型-->是否异步
 */
export const useSelectOptions = async (configList = [], optionsConfig = {}) => {
  const setOptions = (data, options, lableField, valueField) => {
    options.value = data.reduce((prev, current) => {
      let label = isObject(current) ? current[lableField] : current;
      let value = isObject(current) ? current[valueField] : current;
      prev.push({ label, value });
      return prev;
    }, []);
    return options.value;
  };

  // 公共的请求函数
  const requestFn = async (
    api,
    params,
    options,
    lableField,
    valueField,
    resField,
    loading
  ) => {
    try {
      loading && (loading.value = true);
      let res = await api(params);
      if (res) {
        let optionsList = resField ? res[resField] : res;
        setOptions(optionsList, options, lableField, valueField);
      }
    } catch (e) {
      console.log(e);
    }
    loading && (loading.value = false);
  };

  let { async = true } = optionsConfig;
  for (let i = 0; i < configList.length; i++) {
    let config = configList[i];
    let {
      api,
      params = {},
      options,
      lableField = 'label',
      valueField = 'value',
      resField,
      loading,
    } = config;

    let queryList = () =>
      requestFn(
        api,
        params,
        options,
        lableField,
        valueField,
        resField,
        loading
      );
    // 是否异步
    async ? queryList() : await queryList();
  }
};

/**
 * 遍历数据
 * @param {*} data 源数据
 * @param {*} callback 回调
 * @returns
 */
export const traverse = (data, callback) => {
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    callback && callback(item);
  }

  return data;
};

/**
 *  生成map
 * @param {*} data 源数据
 * @param {*} mapId 要映射作为key的字段名
 * @returns
 */
export const createMap = (data, mapId) => {
  const map = data.reduce((prev, current) => {
    prev[current[mapId]] = current;
    return prev;
  }, {});
  return map;
};

/**
 * 必填规则
 * @param {*} type 数据类型
 * @param {*} required 是否必填
 * @param {*} trigger 数据类型
 * @returns
 */
export const requiredRules = (
  type = 'string',
  required = true,
  trigger = 'blur'
) => {
  return [
    {
      required,
      type,
      trigger,
    },
  ];
};

/**
 * 设置options
 * @param {*} data 数据源
 * @param {*} options 要设置的下拉框ref
 * @param {*} labelName label字段名
 * @param {*} valueName value字段名
 * @returns
 */
export function setSelectOptions(data, options, labelName, valueName) {
  options.value = data.reduce((prev, current) => {
    let { [labelName]: label, [valueName]: value } = current;
    prev.push({ label, value });
    return prev;
  }, []);
  return options.value;
}

/**
 * 保留小数位（常用于格式化金额）
 * @param {*} num   为传入的值
 * @param {*} n     为保留的小数位(四舍五入)
 * @param {*} isToThousands  是否转为千分位（是传true）
 * @returns
 */
export const newFomatFloat = (num, n, isToThousands = true) => {
  if (isNaN(parseFloat(num))) {
    return false;
  }
  let s = new Big(num).toFixed(n);
  if (isToThousands) return s.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return s;
};
