// 接口请求的配置文件
// 传递接口url,或者其他配置项 如是否传递token等

export const API = {
  /**
   * 发送短信
   */
  SEND_SMS: '/app/user/send-login-code',
  /**
   * 获取 openId
   */
  AUTHORIZE: '/app/index/find-openid',
  /**
   * 登录
   */
  LOGIN: '/app/user/login',
  /**
   * 登出
   */
  LOGOUT: '/app/user/login/out',
  /**
   * 授权登录
   */
  LOGIN_AUTH: '/app/user/login-auth'
}
