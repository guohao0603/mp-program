<script>
import Storage, { STORAGE_KEY} from './utils/storage.js'
import i18n from './utils/i18n.js'
import locales from './utils/locales.js'
export default {
  created () {
    // console.log('locales', locales)
    i18n.registerLocales(locales)
    wx.i18n = i18n
    try {
      let language = Storage.getStorageData(STORAGE_KEY.LANGUAGE)
      if (!language) {
        // 获取系统信息
        let language = wx.getSystemInfoSync().language
        wx.i18n.setLanguageCode(language)
        Storage.setStorageData(STORAGE_KEY.LANGUAGE, language)
      } else {
        wx.i18n.setLanguageCode(language)
      }
    } catch (e) {

    }
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */

    let logs
    if (mpvuePlatform === 'my') {
      logs = mpvue.getStorageSync({key: 'logs'}).data || []
      logs.unshift(Date.now())
      mpvue.setStorageSync({
        key: 'logs',
        data: logs
      })
    } else {
      logs = mpvue.getStorageSync('logs') || []
      logs.unshift(Date.now())
      mpvue.setStorageSync('logs', logs)
    }
  },
  log () {
    console.log(`log at:${Date.now()}`)
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}

page {
  font-family: PingFang SC, Helvetica Neue, Arial, sans-serif, "Microsoft YaHei";
  -webkit-overflow-scrolling: touch;
}

scroll-view {
  -webkit-overflow-scrolling: touch;
}
::-webkit-scrollbar{
  width: 0;
  height: 0;
  color: transparent;
}
</style>
