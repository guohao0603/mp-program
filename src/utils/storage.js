const STORAGE_KEY = {
  LANGUAGE: 'language',
  OPEN_ID: 'openId',
  TOKEN: 'token',
  USER_ID: 'userId'
}
class Storage {
  static setStorageData (key, data) {
    wx.setStorageSync(key, data)
  }
  static getStorageData (key) {
    return wx.getStorageSync(key)
  }
  static removeStorageData (key) {
    wx.removeStorageSync(key)
  }
  static resetLoginStorageData () {
    Storage.removeStorageData(STORAGE_KEY.USER_ID)
    Storage.removeStorageData(STORAGE_KEY.TOKEN)
    Storage.removeStorageData(STORAGE_KEY.OPEN_ID)
  }
}
export default Storage
export { STORAGE_KEY }
