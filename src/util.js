/**以window.onresize举例 当停止resize50毫秒后才会执行func
 * @param  {[type]}
 * @param  {Number}
 * @return {[type]}
 */
const debounce = (func, wait = 50) => {
  let timer = null
  return function(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => func.apply(this, args), wait)
  }
}
/**以window.onresize举例 每50毫秒执行一次func
 * @param  {[type]}
 * @param  {Number}
 * @return {[type]}
 */
const throttle = (func, wait = 50) => {
  let timer = null
  return function(...args) {
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(this, args)
        timer = null
      }, wait)
    }
  }
}
/**深拷贝
功能：对三种最常见的需求做处理

能够实现数组和对象的深拷贝
能够处理基础数据类型
能够处理循环引用，并触发内存回收

不足：

无法处理一些常见对象，如Date Error Function等
无法处理Map Set等对象
无法处理Symbol类型的数据
无法处理DOM节点的拷贝
。。。
 * @param  {[type]}
 * @param  {WeakMap}
 * @return {[type]}
 */
const clone = (target, map = new WeakMap()) => {
  if (typeof target === 'object') {
    const isArray = Array.isArray(target)
    let cloneTarget = isArray ? [] : {}
    if (map.get(target)) {
      return map.get(target)
    }
    map.set(target, cloneTarget)
    const keys = isArray ? undefined : Object.keys(target)

    ;(keys || target).forEach((value, key) => {
      if (keys) key = value
      cloneTarget[key] = clone(target[key], map)
    })
    return cloneTarget
  }
  return target
}
/**安全访问方案嵌套对象1
 * @param  {[type]}
 * @return {[type]}
 */
const user1 = {
  id: 1,
  info: {
    name: 'carlo',
    address: {
      city: 'liaoning'
    }
  }
}
const user2 = {
  id: 1,
  info: {
    name: 'carlo'
  }
}
const checkObjSafe = obj => {
  for (let i = 1; i < arguments.length; i++) {
    if (!obj.hasOwnProperty(arguments[i])) {
      return false
    }
    obj = obj[arguments[i]]
  }
  return true
}
const checkObjSafe2 = (obj, level, ...rest) => {
  if (obj === undefined) return false
  if (rest.length == 0 && obj.hasOwnProperty(level)) return true
  return checkObjSafe(obj[level], ...rest)
}
// console.log("--->:",checkObjSafe(user1, 'info','address','city'))
