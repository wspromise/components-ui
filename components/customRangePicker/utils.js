import dayjs from 'dayjs';
// 判断当前时间范围内是否存在有禁用的时间
export const traverseRanges = (rangesConfig, disabledDate) => {
    for (const key in rangesConfig) {
        if (Object.hasOwnProperty.call(rangesConfig, key)) {
            const range = rangesConfig[key];
            const [startTime, endTime] =  range

            // 创建一个时间对象
            let currentTime = dayjs(startTime);
            // 当前时间在结束时间之前时执行循环
            while (currentTime.isBefore(endTime) || currentTime.isSame(endTime)) {
                if (typeof disabledDate === 'function' && disabledDate(currentTime)) {
                    delete rangesConfig[key]
                    break
                }
                // 增加一天
                currentTime = currentTime.add(1, 'day');
            }
        }
    }
    return rangesConfig
}
