export const traverse = (data, callback) => {
    for (let i = 0; i < data.length; i++) {
        const item = data[i]
        callback && callback(item)
    }

    return data
}
