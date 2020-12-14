/**
 *
 * @param arr 需要拼接的数组或集合
 * @param split 分隔符
 */
export function splitArr(arr, split) {
  var ids = ''
  arr.map((value, index) => {
    if (index === arr.length) {
      ids = ids + value
    } else {
      ids = ids + value + split
    }
  })
  return ids
}

/**
 * 深拷贝方法
 */
export function deepClone(obj) {
  const objClone = Array.isArray(obj) ? [] : {}
  if (obj && typeof obj === 'object') {
    var key
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        // 判断ojb子元素是否为对象，如果是，递归复制
        if (obj[key] && typeof obj[key] === 'object') {
          objClone[key] = deepClone(obj[key])
        } else {
          // 如果不是，简单复制
          objClone[key] = obj[key]
        }
      }
    }
  }
  return objClone
}
