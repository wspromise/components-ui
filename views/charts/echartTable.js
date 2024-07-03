const format = num => {
  return (Number(num).toFixed(2) + '').replace(
    /\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,
    '$&,'
  );
};
export const optionToContent = (opt, title, cardType) => {
  let axisData = opt.xAxis[0].data; // 坐标数据
  let series = opt.series; // 折线图数据
  if (cardType) {
    series.unshift({
      countUnit: '1',
      name: '卡种',
      data: cardType,
    });
  }
  let result = '';
  let tdHeaders = `<td style="padding: 0 20px;line-height:24px;border:1px solid #999;text-align:left">${title}`; // 表头
  series.forEach(function (item) {
    tdHeaders +=
      '<td style="padding: 0 20px;line-height:24px;border:1px solid #999;text-align:left">' +
      item.name +
      '</td>';
  });
  let table =
    '<div style="overflow-y:auto;height: 100%;width:100%;"><table style="text-align:center; border-collapse:collapse;"><tbody><tr>' +
    tdHeaders +
    '</tr>';
  let tdBodys = '';
  // 表数据
  for (let i = 0, l = axisData.length; i < l; i++) {
    for (let j of series) {
      if (j.countUnit === '1') {
        tdBodys +=
          '<td style="padding: 0 20px;line-height:24px;border:1px solid #999;text-align:center" >' +
          j.data[i] +
          '</td>'; //组装表数据
      } else {
        tdBodys +=
          '<td style="padding: 0 20px;line-height:24px;border:1px solid #999;text-align:center">' +
          `${format(j.data[i])}${j.unit || ''}` +
          '</td>'; //组装表数据
      }
    }
    if (axisData[i] && axisData[i].length > 50) {
      result = axisData[i].substring(0, 50) + '......';
    } else {
      result = axisData[i];
    }
    table +=
      '<tr><td style="padding: 0 20px;line-height:24px;border:1px solid #999;text-align:left">' +
      result +
      '</td>' +
      tdBodys +
      '</tr>';
    tdBodys = '';
  }
  table += '</tbody></table></div>';
  return table;
};
