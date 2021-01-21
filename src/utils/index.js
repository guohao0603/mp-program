function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}
export function encodeSearchParams (obj) {
  // 将一个对象 转换成get 请求需要的格式的字符串
  // id=12&name=xxx
  const params = []
  Object.keys(obj).forEach((key) => {
    let value = obj[key]
    // 如果值为undefined我们将其置空
    if (typeof value === 'undefined') {
      value = ''
    }
    // 对于需要编码的文本（比如说中文）我们要进行编码
    params.push([key, value].join('='))
  })
  return params.join('&')
}
// 获取页面传递的query 的value值
export function getQuery (key) {
  // 用前先把this bind过去 eg:getQuery.bind(this)('mode')
  // 如果不传key 则直接返回query对象 如果传递 key 则获取相应value
  let query = this.$mp.query
  if (key) {
    return query[key]
  } else {
    return query
  }
}

export function isObject (obj) {
  let type = typeof obj
  return type === 'function' || (type === 'object' && !!obj)
}

export function setTitle (title) {
  wx.setNavigationBarTitle({
    title: title
  })
}

/*
  封装路由相关API
  注意：！！！目前页面路径最多只能十层。
  url 直接传文件夹名就好
*/

// table选项卡切换
export function switchTab (url) {
  let _url = `/pages/${url}/main`
  wx.switchTab({
    url: _url
  })
}
// 跳转到某个页面
export function navigateTo (url, query) {
  let _url
  // 当传递query 参数时 拼接进url中
  if (!isEmpty(query)) {
    let queryStr = encodeSearchParams(query)
    _url = `/pages/${url}/main?${queryStr}`
  } else {
    _url = `/pages/${url}/main`
  }
  wx.navigateTo({
    url: _url
  })
}

// 重定向到某个页面 此操作是 当前页面出栈，再入栈目标页面 之前已打开的页面不会出栈，所以跳转回首页不能用它，否则跳转10遍回首页 就无法再打开页面了
// 一般用法是 登录成功 跳转到首页 用此方法
export function redirectTo (url, query) {
  // url 直接传文件夹名就好
  let _url = url
  if (!isEmpty(query)) {
    let queryStr = encodeSearchParams(query)
    _url = `/pages/${url}/main?${queryStr}`
  } else {
    _url = `/pages/${url}/main`
  }
  wx.redirectTo({
    url: _url
  })
}
// 关闭所有页面 并跳转到某页 一般预约成功 支付成功用此跳转
export function reLaunch (url, query) {
  // url 直接传文件夹名
  let _url = url
  if (!isEmpty(query)) {
    let queryStr = encodeSearchParams(query)
    _url = `/pages/${url}/main?${queryStr}`
  } else {
    _url = `/pages/${url}/main`
  }
  wx.reLaunch({
    url: _url
  })
}
// 非空校验 传递值 跟为空时的报错信息 message 非必填 不填时也可用来校验对象是否为空
export function isEmpty (val, message) {
  const reg = /\s/
  if (typeof val === 'string' && reg.test(val)) {
    // errorModal("请不要输入空格");
    return true
  }
  if (!val) {
    if (message) {
      errorModal(message)
    }
    return true
  } else if (isObject(val)) {
    return val.length === 0
  } else {
    return false
  }
}
/*
* 返回上一级页面 关闭当前页面，返回上一页面或多级页面
* {delta: 1} 返回的页面数，如果 delta 大于现有页面数，则返回到首页。
* */
export function navigateBack (obj) {
  wx.navigateBack(obj)
}

/*
  封装 小程序 模态框 api
  opt {
    title:title文案
    content:提示文案
    cancelText:取消按钮文案,
    confirmText:确认按钮文案,
    showCancel:是否显示取消按钮,
    success:点击确定按钮的回调函数,
    fail：点击取消按钮的回调函数
  }
*/
export function showModal (opt) {
  const lang = wx.i18n.getLanguageCode()
  let cancelText = '取消'
  let confirmText = '确认'
  if (lang && lang === 'en') {
    cancelText = 'Cancel'
    confirmText = 'OK'
  }
  let showCancel = opt.showCancel !== false
  wx.showModal({
    title: opt.title || '提示',
    content: opt.content,
    cancelText: opt.cancelText || cancelText,
    confirmText: opt.confirmText || confirmText,
    showCancel: showCancel,
    success: (res) => {
      if (res.confirm) {
        if (opt.success) {
          opt.success()
        }
      }
      if (res.cancel) {
        if (opt.fail) {
          opt.fail()
        }
      }
    }
  })
}

/*
  错误提示弹框 content必填，
  若有点击回调第二个传一个回调函数
*/
export function errorModal (content, success, fail) {
  let opt = {
    content: content,
    showCancel: false
  }
  // 当传递 弹框成功的回调函数时
  if (success && typeof success === 'function') {
    opt.success = success
  }
  // 当传递 取消回调函数时
  if (fail && typeof fail === 'function') {
    opt.fail = fail
  }
  showModal(opt)
}

/*
  请求成功提示, title 必填 且少于7个汉字！！！
  若有点击回调第二个传一个回调函数
*/
export function successModal (title, success) {
  let opt = {
    title: title,
    icon: 'success'
  }
  if (success && typeof success === 'function') {
    opt.success = success
  }
  wx.showToast(opt)
}

export function objEmpty (obj) {
  return JSON.stringify(obj) === '{}'
}

/* 生成随机文件名 */
function S4 () {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}

export function guid () {
  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
}

/* 获取文件后缀名 */
export function getSuffix (upFileName) {
  let index1 = upFileName.lastIndexOf('.')
  let index2 = upFileName.length
  let suffix = upFileName.substring(index1 + 1, index2)// 后缀名
  return suffix
}

/**
 * 重置数据
 * @param {object} that 页面对象
 * @return {void}
 */
export function reset (that) {
  Object.assign(that.$data, that.$options.data())
}

/**
 * 分钟转小时
 * @param {number} minutes 分钟
 * @return {string} 格式化的字符串
 */
export function minToHour (minutes) {
  if (!minutes) {
    return ''
  }
  if (minutes < 60) {
    return minutes + '分钟'
  }
  let min = (parseInt(minutes) % 60)
  return (Math.floor(parseInt(minutes) / 60) + '小时' + (min > 0 ? `${min}分钟` : ''))
}
