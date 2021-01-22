<template>
    <div class="login-menu">
        <p class="login-title">点击微信登录, 一键登录</p>
        <button class="login-btn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
            <text>{{i18n.weChatLogin}}</text>
        </button>
    </div>
</template>

<script>
import {wxJscode} from '../../utils/authorize.js'
import Storage, {STORAGE_KEY} from '../../utils/storage.js'
import {reLaunch} from '../../utils/index.js'
export default {
  name: 'register',
  data () {
    return {
      common: {},
      openId: '',
      sessionKey: ''
    }
  },
  components: {},
  methods: {
    async getPhoneNumber (info) { // 小程序个人开发者 无法获取手机号等用户隐私
      let sessionKey = this.sessionKey
      let detail = info.mp.detail
      let errMsg = detail.errMsg
      let params = { appId: 'wx220584793284e9d6', encryptedData: detail.encryptedData, iv: detail.iv, sessionKey }
      await this.$http.post('/api/decrypt', params).then((res) => {
        // console.log('解密data', res)
        Storage.setStorageData(STORAGE_KEY.USER_ID, res.data.phoneNumber)
        reLaunch('personal')
      })
      if (errMsg.split(':')[1] !== 'ok') {
        // errorModal('请重试')
        return null
      }
    },
    async getSessionkey (code) {
      let wxUrl = `https://api.weixin.qq.com/sns/jscode2session?appid=wx220584793284e9d6&secret=f734b676524698f8da6eb613a9bee08c&js_code=${code}&grant_type=authorization_code`
      await this.$http.get(wxUrl).then((res) => {
        let result = res.data
        this.openId = result.openid
        this.sessionKey = result.session_key
      })
    }
  },
  computed () {

  },
  async mounted () {},
  async onShow () {
    let jscode = await wxJscode()
    this.getSessionkey(jscode)
    this.common = this.getCommonLanguageConfig()
  },
  onShareAppMessage: function () {
    return {
      title: 'Home',
      path: 'pages/home/main'
    }
  }
}
</script>

<style lang="less">
  page {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
  .login-menu {
      height:100%;
      padding:0 65rpx;
      box-sizing:border-box;
      .login-title {
         font-size:22rpx;
         color:#000;
         margin-top:60rpx;
      }
      .login-btn {
          width:100%;
          height:76rpx;
          margin-top:70rpx;
          background-color:#7e6044;
          color:#ffffff;
          font-size:28rpx;
          line-height:76rpx;
          text-align:center;
          border-radius:14rpx;
      }
  }
</style>
