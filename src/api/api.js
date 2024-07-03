// 列表
export const getList = param => request.post('queryList', param);

export const getSelectList = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          value: '1',
          label: '1',
        },
        {
          value: '2',
          label: '2',
        },
        {
          value: '3',
          label: '3',
        },
        {
          value: '4',
          label: '4',
        },
        {
          value: '5',
          label: '5',
        },
      ]);
    }, 2000);
  });
};
