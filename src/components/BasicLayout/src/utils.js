
// 递归
export const traverse = (data, callback, options = {}) => {
  const { childrenField = 'children', keyField = 'moduleId' } = options;

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const children = item[childrenField];
    const hasChildren = children && children.length > 0;

    callback && callback(item);

    if (hasChildren) {
        traverse(children, callback, options);
    }
  }

  return data;
};