<template>
    <div class="login-menu">
        <p class="login-title">点击微信登录, 一键登录</p>
        <button class="login-btn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
            <text>{{i18n.weChatLogin}}</text>
        </button>
    </div>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      common: {}
    }
  },
  components: {},
  methods: {
    async getPhoneNumber (info) { // 小程序个人开发者 无法获取手机号等用户隐私
      let detail = info.mp.detail
      let errMsg = detail.errMsg
      if (errMsg.split(':')[1] !== 'ok') {
        // errorModal('请重试')
        return null
      }
    }
  },
  computed () {

  },
  async mounted () {

  },
  onShow () {
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
