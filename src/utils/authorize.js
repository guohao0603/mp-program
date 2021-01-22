/*
微信授权相关API封装

*/
import {errorModal} from './index'
import { API } from './URLS'
import HttpHelper from './http'
import Storage, { STORAGE_KEY } from './storage'

function wxLogin () {
  return new Promise((resolve, reject) => {
    wx.login({
      success: (info) => {
        if (info.code) {
          // 登录成功 回传code
          resolve(info.code)
        } else {
          reject(info.errMsg)
        }
      }
    })
  }).catch((errMsg) => {
    errorModal(errMsg)
  })
}

export async function wxJscode () {
  let code = await wxLogin()
  return code
}
export async function wxGetUserInfo () {
  let code = await wxLogin()
  // 先掉一遍缓存
  return new Promise(function (resolve, reject) {
    wx.getUserInfo({
      withCredentials: true,
      success: function (info) {
        if (info.userInfo) {
          let userInfo = info.userInfo
          // 缓存用户信息
          userInfo.code = code
          resolve(userInfo)
        } else {
          reject(info.errMsg)
        }
      },
      fail: function (info) {
        resolve(null)
      }
    })
  }).catch(function (errMsg) {
    errorModal(errMsg)
  })
}
/**
 * 向微信请求openid
 * @returns {Promise<any>} openId
 */
export async function getOpenIdRemote () {
  let code = await wxLogin()
  let info = await HttpHelper.get(API.AUTHORIZE, {code})
  if (!info.code) {
    let {openId, token} = info.data
    Storage.setStorageData(STORAGE_KEY.TOKEN, token)
    Storage.setStorageData(STORAGE_KEY.OPEN_ID, openId)
    return Promise.resolve(openId)
  } else {
    // TODO:[answer] 错误提示
    errorModal('获取授权失败，请重新获取')
  }
}

export async function getOpenIdLocal () {
  let openId = Storage.getStorageData(STORAGE_KEY.OPEN_ID)
  let token = Storage.getStorageData(STORAGE_KEY.TOKEN)
  if (!openId || !token) {
    openId = await getOpenIdRemote()
  }
  return Promise.resolve(openId)
}
export async function wxCheckOpenId (openId) {
  // 掉接口判断 此openId 是否在库里
  let info = await HttpHelper.get(API.AUTH_SELECT_OPENID, {openId})
  if (!info.code) {
    if (info.data) {
      return Promise.resolve(info.data)
    } else {
      return Promise.resolve(false)
    }
  }
}

export async function wxGetTokenByOpenId (openId) {
  // 掉接口 通过openId 获取token
  let info = await HttpHelper.post(API.LOGIN, {openId})
  if (!info.code) {
    let data = info.data
    return Promise.resolve(data)
  } else if (info.code !== 500) {
    errorModal(info.msg)
    return Promise.resolve(false)
  }
}
export async function wxGetOpenIdByToken () {
  let info = await HttpHelper.get(API.AUTH_GETOPENID_BY_TOKEN)
  if (!info.code) {
    let {openId} = info.data || {}
    return Promise.resolve(openId)
  } else if (info.code !== 500) {
    errorModal(info.msg)
    return Promise.resolve('')
  }
}
/* 通过token 校验登录状态 */
export async function checkLogin () {
  let token = Storage.getStorageData(STORAGE_KEY.USER_ID)
  if (!token) {
    return Promise.reject(new Error('error'))
  }
  return Promise.resolve(true)
}
