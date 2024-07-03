# API
## checkDataType
检查数据类型的工具方法。
::: details 查看代码
```js
export const checkDataType = target => Object.prototype.toString.call(target).slice(8, -1)
```
:::

## 判断各种数据类型
判断数据类型的工具方法。
::: details 查看代码
```js
export const isNumber = val => checkDataType(val) === 'Number'
export const isString = val => checkDataType(val) === 'String'
export const isBoolean = val => checkDataType(val) === 'Boolean'
export const isArray = val => Array.isArray(val)
export const isFunction = val => checkDataType(val) === 'Function'
export const isObject = val => checkDataType(val) === 'Object'
```
:::

## 批量导入文件处理方法（路由）
批量导入文件的工具方法。
::: details 查看代码
```js
export function importFiles(arr) {
  // 该函数用于将所有分区路由中的路由添加到路由数组
  const list = []; // 路由数组 - 存放所有路由
  // console.log(arr);
  arr.keys().forEach((key) => {
    list.push(...arr(key).default);
  });
  return list;
}
```
:::

## 批量导入文件处理方法-导入i18n
批量导入文件的工具方法。
> [!TIP]
> importFilesForI18n(require.context('./modules', true, /\en.js$/))，也可以参考token系统导入i18n
::: details 查看代码
```js
export function importFilesForI18n(arr) {
  const obj = {};
  arr.keys().forEach((key) => {
    obj[Object.keys(arr(key))[0]] = arr(key)[Object.keys(arr(key))[0]];
  });
  return obj;
}
```
:::

## 获取localStorage
根据提供的键从本地存储中检索值，如果值没有找到或不是一个有效的JSON，它返回一个空字符串。
::: details 查看代码
```js
/**
 * @param {string} key -从本地存储中检索值的键。
 * @返回{any} -从本地存储检索到的值。
 */
export function getStore(key) {
  if (!key) return;
  let result = window.localStorage.getItem(key);
  try {
    result = JSON.parse(result);
  } catch (err) {}
  if (result == null || result == undefined || result == '') {
    result = '';
  }
  return result;
}
```
:::

## 存储localStorage
设置本地存储的内容。
::: details 查看代码
```js
/**
 * @param {string} key -存储内容的键。
 * @param {string|object} content -要存储的内容。如果不是字符串，它将被转换为JSON字符串。
 * @返回{void}
 * @抛出{Error}如果没有提供键。
 * @example
 * setStore('user', {name: 'John Doe', age: 30});
 * setStore('token', 'abc123');
 */
export function setStore(key, content) {
  if (!key) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(key, content);
}
```
:::

## 删除localStorage
该函数从本地存储中删除特定的键值对。
::: details 查看代码
```js
/**
 * @param {string} key - 要删除的键。
 * @returns {void} - 该函数不返回任何值。
 * @throws {Error} - 如果提供的键不是字符串，则会引发此错误。
 * @example
 * removeStore('userToken');
 */
export function removeStore(key) {
  if (!key) return;
  window.localStorage.removeItem(key);
}
```
:::

## 判断2个值是否相同
该函数检查两个值是否相同，并返回布尔值。
::: details 查看代码
```js
/**
 *
 * @param {any} newValue - 要比较的新值。
 * @param {any} oldValue - 要比较的旧值。
 *
 * @returns {boolean} - 如果新值和旧值相等，则返回 true，否则返回 false。
 *
 * @example
 * const newValue = { name: 'John', age: 25 };
 * const oldValue = { name: 'John', age: 25 };
 * console.log(isSameValue(newValue, oldValue)); // true
 */
export const isSameValue = (newValue, oldValue) =>
  JSON.stringify(newValue) === JSON.stringify(oldValue);
```
:::

## 消息弹窗
只能同时显示一个弹窗提示
::: details 查看代码
```js
/**
 * @param {object} options - 消息配置。
 * @param {string} options.content - 消息内容。
 * @param {string} [options.type='error'] - 消息类型，可以是 'success'、'info'、'warning' 或 'error'。
 * @param {number} [options.duration=3] - 消息显示的持续时间（以秒为单位）。
 * @param {string} [options.icon] - 消息图标的类名。
 * @param {string} [options.key] - 当前提示的唯一标志。
 * @param {object} [options.style] - 消息的自定义样式。
 * @param {function} [options.onClick] - 点击消息时触发的回调函数。
 * @param {function} [options.onClose] - 关闭消息时触发的回调函数。
 * @param {string} [options.className=''] - 消息的自定义类名。
 *
 * @returns {void} - 该函数不返回任何值。
 *
 * @example
 * showMsgWs({
 *   content: 'This is an error message.',
 *   type: 'error',
 *   duration: 3,
 *   key: 'error-message',
 *   style: { backgroundColor: 'red' },
 *   onClick: () => console.log('Message clicked.'),
 *   onClose: () => console.log('Message closed.'),
 *   className: 'custom-message',
 * });
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
```
:::

## 时间校验函数
该函数用于验证所提供的日期范围是否在指定的时长内。
::: details 查看代码
```js
/**
 * @param {object} options - 验证配置。
 * @param {boolean} options.required - 是否必填。
 * @param {array} options.value - 包含开始和结束日期的数组。
 * @param {number} options.timeLength - 限制时间范围的时长。
 * @param {string} [options.msg] - 错误信息。
 * @param {string} [options.requiredStartTimeMsg='requiredStartTimeMsg'] - 开始时间的必填校验信息。
 * @param {string} [options.requiredEndTimeMsg='requiredEndTimeMsg'] - 结束时间的必填校验信息。
 *
 * @returns {boolean} - 如果日期范围在指定时长内，返回 true，否则返回 false。
 *
 * @example
 * const startTime = '2022-01-01';
 * const endTime = '2022-01-31';
 * const timeLength = 30;
 * const required = true;
 * const isValid = validatorDateRange({
 *   required,
 *   value: [startTime, endTime],
 *   timeLength,
 *   msg: '所选日期范围超出 30 天的限制。',
 *   requiredStartTimeMsg: '请选择开始时间。',
 *   requiredEndTimeMsg: '请选择结束时间。',
 * });
 * console.log(isValid); // true
 */
const timeMap = {
  365: 'limitDateOneYear',
  180: 'limit6',
  30: 'limit30',
  90: 'limit90',
};

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
```
:::

## 判断是否为mac系统
用于检测是否正在 Mac 操作系统上运行。
::: details 查看代码
```js
/**
 * @returns {boolean} - 如果在 Mac 操作系统上运行，返回 true，否则返回 false。
 *
 * @example
 * const isMacSystem = isMac();
 * console.log(isMacSystem); // true
 */
export const isMac = function () {
  return /macintosh|mac os x/i.test(navigator.userAgent);
};
```
:::

## 获取浏览器缩放比例
该函数用于检测浏览器的缩放比例。
::: details 查看代码
```js
/**
 * @returns {number} - 返回浏览器的缩放比例（百分比）。
 *
 * @example
 * const zoomRatio = detectZoom();
 * console.log(zoomRatio); // 100
 */
export const detectZoom = () => {
  // mac系统缩小20%
  if (isMac()) return 120;

  let ratio = 0;
  const screen = window.screen;
  const ua = navigator.userAgent.toLowerCase();

  if (window.devicePixelRatio !== undefined) {
    ratio = window.devicePixelRatio;
  } else if (~ua.indexOf('msie')) {
    if (screen.deviceXDPI && screen.logicalXDPI) {
      ratio = screen.deviceXDPI / screen.logicalXDPI;
    }
  } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
    ratio = window.outerWidth / window.innerWidth;
  }

  if (ratio) {
    ratio = Math.round(ratio * 100);
  }
  return ratio;
};
```
:::

## 防抖
该函数用于防止在指定的时间段内多次执行相同的函数。
::: details 查看代码
```js
/**
 * @param {function} fn - 要执行的函数。
 *
 * @returns {function} - 防抖后的函数。
 *
 * @example
 * const debouncedFunction = debounce(() => console.log('Hello, World!'));
 * debouncedFunction(); // 立即执行
 * debouncedFunction(); // 不会执行，直到防抖时间段结束
 */
export const debounce = (fn) => {
  // loading 状态
  let loading = null;

  return async function () {
    try {
      if (loading) return;
      loading = true;

      // 改变 this 指向，如果 fn 是箭头函数，fn 里面的 this 是指向其上层作用域的 this，并把参数传递给 fn
      await fn.apply(this, arguments);
    } catch (error) {
      console.log(error);
    }
    loading = null;
  };
};
```
:::

## 获取url参数
该函数用于从 URL 中提取和解析查询参数。
::: details 查看代码
```js
/**
 * @returns {Object} - 包含查询参数的键值对的对象。
 *
 * @example
 * const queryParams = parseUrlQuery();
 * console.log(queryParams); // { key1: 'value1', key2: 'value2' }
 */
export const parseUrlQuery = () => {
  let result = {}; // 初始化一个空对象来存储查询参数
  let url = window.location.href; // 获取当前 URL
  let query = url.split('?')[1]; // 从 URL 中提取查询参数
  if (query) { // 如果有查询参数
    let queryArr = query.split('&'); // 将查询参数拆分成数组
    queryArr.forEach(function (item) { // 迭代每一个查询参数
      let key = item.split('=')[0]; // 从查询参数中提取键
      let value = item.split('=')[1]; // 从查询参数中提取值
      result[key] = value; // 将键值对存储在结果对象中
    });
  }
  return result; // 返回包含查询参数的结果对象
};
```
:::

## 全屏
该函数是Hooks，用于处理全屏功能。
::: details 查看代码
```js
/**
 * @param {Object} options - 包含以下属性的对象：
 * @param {HTMLElement} options.fullScreenEle - 要全屏的元素，默认为 document.documentElement。
 *
 * @returns {Object} - 包含以下属性的对象：
 * @property {Function} getFullScreeningElement - 获取当前正在全屏的元素。
 * @property {Function} exitFullScreen - 退出全屏。
 * @property {Function} launchFullScreen - 全屏。
 * @property {Function} toggleFullScreen - 切换全屏。
 * @property {Function} listenFullScreen - 监听全屏状态变化。
 */
export const useFullScreen = ({ fullScreenEle = document.documentElement }) => {
  /**
   * 遍历执行兼容的方法。
   *
   * @param {Array} methodList - 方法列表。
   * @param {HTMLElement} element - 要执行方法的元素。
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
    const {
      webkitExitFullscreen,
      mozCancelFullScreen,
      exitFullscreen,
      msExitFullscreen,
    } = document;

    const exitFullscreenMethods = [
      webkitExitFullscreen,
      mozCancelFullScreen,
      exitFullscreen,
      msExitFullscreen,
    ];
    eachCompatibleMethod(exitFullscreenMethods, document);
  };

  // 全屏
  const launchFullScreen = () => {
    const {
      requestFullscreen,
      mozRequestFullScreen,
      webkitRequestFullScreen,
      msRequestFullscreen,
    } = document.documentElement;

    const fullScreenMethods = [
      requestFullscreen,
      mozRequestFullScreen,
      webkitRequestFullScreen,
      msRequestFullscreen,
    ];
    if (!unref(fullScreenEle)) return;
    eachCompatibleMethod(fullScreenMethods, unref(fullScreenEle));
  };

  // 切换全屏
  const toggleFullScreen = () => {
    const fullScreeningElement = getFullScreeningElement();
    if (fullScreeningElement) {
      exitFullScreen();
    } else {
      launchFullScreen();
    }
  };

  // 监听全屏状态变化
  const listenFullScreen = (fullScreenChange) => {
    const fullscreenChangeMethods = [
      'fullscreenchange',
      'webkitfullscreenchange',
      'mozfullscreenchange',
      'msfullscreenchange',
    ];
    let element = unref(fullScreenEle);
    if (!element) return;
    fullscreenChangeMethods.forEach((method) => {
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
```
:::

## 导出文件
根据接口返回的二进制数据导出文件
::: details 查看代码
```js
/**
 * @param {ArrayBuffer} res - 二进制流数据。
 * @param {string} [fileName='fileData'] - 要导出的默认文件名。
 * @param {string} [fileType='xlsx'] - 要导出的默认文件类型，可以是 'xls', 'pdf', 'xlsx', 或 'zip'。
 */
export const exportFile = (res, fileName = 'fileData', fileType = 'xlsx') => {
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

  url = window.URL.createObjectURL(new Blob([res], blobTypeParams));

  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = url;
  link.setAttribute('download', `${fileName}.${fileType}`);
  document.body.appendChild(link);
  link.click();
};
```
:::

## 格式化日期
根据传入的日期格式来格式化日期。
::: details 查看代码
```js
/**
 * @param {Date|string|number} time - 要格式化的日期。
 * @param {string} [type='YYYY-MM-DD'] - 要返回的日期格式。
 *
 * @returns {string} - 格式化后的日期字符串。
 * 如果输入的日期无效，则返回 '-'。
 */
export const formatDate = (time, type = 'YYYY-MM-DD') => {
  let date = dayjs(time).format(type);
  return date === 'Invalid Date' ? '-' : date;
};
```
:::

## 限制输入特殊字符
该函数用于限制输入特殊字符。
::: details 查看代码
```js
/**
 *
 * @param {string} value - 要检查的字符串。
 *
 * @returns {boolean} - 如果字符串包含特殊字符，则返回 true，否则返回 false。
 */
export const limitSpecialCharacters = (value) => {
  let reg = new RegExp(
    "[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]"
  );
  return reg.test(value);
};
```
:::

## 判断是否是外部链接
判断是否是外部链接
::: details 查看代码
```js
/**
 *
 * @param {string} url - 要检查的url地址。
 *
 * @returns {boolean} - 如果是外部链接，则返回 true，否则返回 false。
 */
export const isExternalLink = (url) => {
  const pattern = /^https?:\/\//i;
  if (pattern.test(url)) {
    const hostname = window.location.hostname;
    const urlHostname = new URL(url).hostname;
    return hostname !== urlHostname;
  }
  return false;
};
```
:::

## 全局配置
用于配置一些全局的配置，目前只支持表格配置和表单配置
::: details 查看代码
```js
export const opGlobalConfig = {
    // 表格配置
    /**
     * @param {*} options 
     * showListSetting   Boolean    是否显示列表设置
     * menuFieldsList    Function   获取列表配置的字段信息
     * menuFieldsSave    Function   保存列表配置的字段
     */
    tableConfig: (options) => {
        let { showListSetting, menuFieldsSave, menuFieldsList } = options
        window.opTableConfig = {
            ...options,
            showListSetting: !!showListSetting,
            menuFieldsSave,
            menuFieldsList,
        }
    },

    // 搜索表单配置
    /**
     * @param {*} options 
     * openSearchCache   Number    是否开启搜索缓存（0-关闭 1-开启）
     * store             Object    store
     */
    searchFormConfig: (options) => {
        window.opSearchFormConfig = options
    },
}
```
:::

## 表格单元格为空时，设置占位符
该函数用于检测浏览器的缩放比例。
::: details 查看代码
```js
export const textEmptyPlaceholder = text => ([null, undefined, ''].includes(text) ? '-' : text)
```
:::

## 从options中获取label值
从选项中获取与指定值相对应的label
::: details 查看代码
```js
/**
 *
 * @param {Object} options - 包含标签-值对的选项对象。
 * @param {any} value - 要查找其对应标签的值。
 * @param {string} [lableField='label'] - 选项对象中包含标签的字段名。
 * @param {string} [valueField='value'] - 选项对象中包含值的字段名。
 * @returns {any} - 与指定值相对应的标签。
 * @example
 * const options = [
 *   { label: 'Apple', value: 'apple' },
 *   { label: 'Banana', value: 'banana' },
 *   { label: 'Cherry', value: 'cherry' }
 * ];
 * console.log(getOptionsLabelByValue(options, 'banana')); // 输出: 'Banana'
 */
export const getOptionsLabelByValue = (
    options,
    value,
    lableField = 'label',
    valueField = 'value'
) => {
    let option = unref(options).find(item => item[valueField] === value)
    if (option) return option[lableField]
}
```
:::

## 判断是否是移动端
该函数用于判断是否是移动端。
::: details 查看代码
```js
/**
 * @returns {boolean} - 如果是移动端，返回 true，否则返回 false。
 */
export const isMobile = () => {
    let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )
    return !!flag
}
```
:::

## 获取正在使用的插槽
该函数用于获取正在使用的插槽。
::: details 查看代码
```js
/**
 * @returns {array} - 返回正在使用的插槽的名字列表。
 */
export const getUsedSlots = () => {
  let currentInstance = getCurrentInstance();
  let usedSlots = currentInstance.slots;
  let usedSlotsNameList = Object.keys(usedSlots);
  return usedSlotsNameList;
};
```
:::

## 是否使用了该插槽
该函数用于判断是否使用了该插槽。
::: details 查看代码
```js
/**
 * @returns {boolean} - 是否使用了该插槽。
 */
export const isUsedSlot = slotName => getUsedSlots()?.includes(slotName);
```
:::

## UseSelectOptions
获取下拉框列表的 Hooks。
::: details 查看代码
```js
/**
 * @param {Array} configList - 配置列表。
 * @param {Object} optionsConfig - options 配置。
 * @param {boolean} [optionsConfig.async=true] - async 属性，表示是否异步。
 * @returns {void}
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

  const requestFn = async ({
    api,
    params,
    options,
    lableField,
    valueField,
    resField,
    loading,
    customSetOptions,
    finalCallback,
  }) => {
    try {
      loading && (loading.value = true);
      let res = await api(params);
      if (res) {
        let optionsList = resField ? res[resField] : res;
        !customSetOptions && setOptions(optionsList, options, lableField, valueField);
        customSetOptions?.({ options, optionsList });
        finalCallback?.({ options, optionsList });
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
      customSetOptions,
      finalCallback,
    } = config;

    let queryList = () =>
      requestFn({
        api,
        params,
        options,
        lableField,
        valueField,
        resField,
        loading,
        customSetOptions,
        finalCallback,
      });

    // 是否异步
    async ? queryList() : await queryList();
  }
};
```
:::

## 遍历数据
遍历数据时可传入回调函数
::: details 查看代码
```js
/**
 * 遍历数据。
 * @param {Array} data - 源数据。
 * @param {Function} callback - 回调函数。
 * @returns {void}
 */
export const traverse = (data, callback) => {
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    callback && callback(item);
  }
};
```
:::

## 生成map
传入源数据生成map。
::: details 查看代码
```js
/**
 * @param {Array} data - 源数据。
 * @param {string} mapId - 要用作键的字段名。
 * @returns {Object} - 包含源数据中所有对象的 map。
 */
export const createMap = (data, mapId) => {
  const map = data.reduce((prev, current) => {
    prev[current[mapId]] = current;
    return prev;
  }, {});
  return map;
};
```
:::

## 生成必填规则
该函数用于生成必填规则。
::: details 查看代码
```js
/**
 * 必填规则
 * @param {*} type 数据类型
 * @param {*} required 是否必填
 * @param {*} trigger 数据类型
 * @returns 
 */
export const requiredRules = (type = 'string', required = true, trigger = 'blur') => {
    return [
        {
            required,
            type,
            trigger
        }
    ]
}
```
:::

## 设置options
该函数用于设置options。
::: details 查看代码
```js
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
        let { [labelName]: label, [valueName]: value } = current
        prev.push({ label, value })
        return prev
    }, [])
    return options.value
}
```
:::

## 保留小数位
该函数用于保留小数位（常用于格式化金额）。
::: details 查看代码
```js
/**
 * 保留小数位（常用于格式化金额）
 * @param {*} num   为传入的值
 * @param {*} n     为保留的小数位(四舍五入)
 * @param {*} isToThousands  是否转为千分位（是传true）
 * @returns
 */
export const newFomatFloat = (num, n, isToThousands = true) => {
    if (isNaN(parseFloat(num))) {
        return false
    }
    let s = new Big(num).toFixed(n)
    if (isToThousands) return s.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return s
}
```
:::

## 判断是否为空值
该函数用于判断是否为空值。
::: details 查看代码
```js
/**
 * 判断是否为空值。
 * @param {any} val - 要检查的值。
 * @returns {boolean} - 如果值为空值（null、undefined 或空字符串），返回 true，否则返回 false。
 */
export const isEmpty = (val) => [null, undefined, ''].includes(val);
```
:::
