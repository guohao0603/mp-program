<template>
  <div class="my-container">
    <div class="my-content">
      <span class="my-img">
        <img src="../../../static/images/user.png">
      </span>
      <span class="my-name">{{userPhone}}</span>
    </div>
    <div class="my-list">
      <mineItem :title="i18n.assess" icon="/static/images/pingjia.png" :action="myDing"
                :bottomLineStyle="bottomLineStyleWithMargin"/>
      <mineItem :title="i18n.aboutMe" icon="/static/images/about.png" :action="myDing"
                :bottomLineStyle="bottomLineStyleWithMargin"/>
      <mineItem :title="i18n.move" icon="/static/images/play.png" :action="myDing"
                :bottomLineStyle="bottomLineStyleWithMargin"/>
      <picker class="picker-item" @change="bindPickerChange" :range="languages">
        <mineItem :title="i18n.language" :subTitle="languages[languageIndex]" icon="/static/images/language.png"/>
      </picker>
      <mineItem :title="i18n.customer" icon="/static/images/customer.png" :action="myDing"
                :bottomLineStyle="bottomLineStyleWithMargin"/>
    </div>
  </div>
</template>
<script>
import mineItem from '../../components/mineItem'
import Storage, {STORAGE_KEY} from '../../utils/storage'
import event from '../../utils/event'
import {reLaunch, errorModal} from '../../utils/index'
import {checkLogin} from '../../utils/authorize'
export default {
  name: 'mine',
  data () {
    return {
      bottomLineStyleWithMargin: ' border-bottom:2rpx solid #eeeeee;',
      common: {},
      languages: ['简体中文', 'English'],
      languageIndex: wx.i18n.getLanguageCode() === 'en' ? 1 : 0,
      isLogin: true,
      userPhone: null
    }
  },
  components: { mineItem },
  methods: {
    myDing () {
      console.log('12456')
    },
    bindPickerChange (e) {
      let key = e.mp.detail.value
      if (parseInt(key) === 0) {
        wx.i18n.setLanguageCode('zh_CN')
        Storage.setStorageData(STORAGE_KEY.LANGUAGE, 'zh_CN')
        this.languageIndex = 0
      } else {
        wx.i18n.setLanguageCode('en')
        Storage.setStorageData(STORAGE_KEY.LANGUAGE, 'en')
        this.languageIndex = 1
      }
      event.emit('languageChanged')
      this.common = this.getCommonLanguageConfig()
      this.language = wx.i18n.getLanguageCode()
    },
    checkLanguage () {
      this.languageIndex = wx.i18n.getLanguageCode() === 'en' ? 1 : 0
    }
  },
  onShow () {
    this.common = this.getCommonLanguageConfig()
    this.checkLanguage()
    this.userPhone = Storage.getStorageData(STORAGE_KEY.USER_ID)
  },
  onTabItemTap () {
    checkLogin().then(async () => { // 已登录
      console.log('已登录')
    }, () => { // 未登录
      errorModal(this.common.loginError, () => {
        reLaunch('register')
      })
    })
  },
  computed: {}
}
</script>
<style scoped lang="less">
.my-container{
    height:100%;
    overflow-x: hidden;
    overflow-y: scroll;
    box-sizing:border-box;
    .my-content {
        height:240rpx;
        padding-left:28rpx;
        box-sizing:border-box;
        display:flex;
        align-items:center;
        background-color:#7e6044;
        .my-img {
            width:128rpx;
            height:128rpx;
            border-radius:50%;
            img {
                width:100%;
                height:100%;
                border-radius:50%;
            }
        }
        .my-name {
            font-size:28rpx;
            color:#ffffff;
            margin-left:22rpx;
        }
    }
    .my-list {
        height:auto;
        background-color:#eee;
        margin-top:22rpx;
        .picker-item {
          margin:20rpx 0;
        }
    }
}
</style>