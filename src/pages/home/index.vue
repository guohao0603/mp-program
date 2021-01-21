<template>
  <div id="container">
    <header>
      <Search cus-style="border-radius: 12rpx;" :placeholder="common.searchPlaceholder"/>
      <div class="search-language">
        <picker  @change="bindPickerChange" :range="array">
          <div class="picker">
           <span class="picker-content"> {{languageValue}}</span>
           <span class="down-arrow">
            <img src="../../../static/images/down.png"/>
           </span>
          </div>
        </picker>
      </div>
    </header>
    <swiper
      v-if="contentList.length > 0"
      previous-margin="36rpx"
      next-margin="96rpx"
      class="swiper-content"
    >
      <block v-for="(item, index) in contentList" :key="index" >
        <swiper-item>
          <image style='width: 604rpx;height: 100%;border-radius:12rpx;' :src="item.imgUrl" mode="scaleToFill"></image>
        </swiper-item>
      </block>
    </swiper>
    <div class="category">
        <div class="category-item">
          <img src="/static/images/上新精选.png"/>
          <p>{{i18n.selected}}</p>
        </div>
        <div class="category-item">
          <img src="/static/images/会员秒杀.png"/>
          <p>{{i18n.secKill}}</p>
        </div>
        <div class="category-item">
          <img src="/static/images/热销榜单.png"/>
          <p>{{i18n.rankingList}}</p>
        </div>
        <div class="category-item">
          <img src="/static/images/员工福利.png"/>
          <p>{{i18n.welfare}}</p>
        </div>
        <div class="category-item">
          <img src="/static/images/自营人工.png"/>
          <p>{{i18n.selfSupport}}</p>
        </div>
    </div>
    <div class="news-information" @click="handleFire">热门资讯</div>
    <div class="inf-list" v-for="(item,index) in contentList" :key="index" @click="handleDesc(item.url)">
      <div class="inf-item">
        <div class="item-desc">
          <p>{{item.title}}</p>
        </div>
        <div class="item-img">
          <img :src="item.imgUrl" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '../../components/searchInput'
import Storage, {STORAGE_KEY} from '../../utils/storage'
import event from '../../utils/event'
import { redirectTo, navigateTo } from '../../utils/index'
export default {
  data () {
    return {
      indicatorDots: true,
      indicatorColor: '#C6C7CA',
      indicatorActiveColor: '#2C65E3',
      imgUrls: [],
      contentList: [],
      array: ['简体中文', 'English'],
      languageValue: 'Language',
      language: wx.i18n.getLanguageCode(),
      common: {}
    }
  },

  components: {
    Search
  },

  methods: {
    async init () {
      await this.$http.get('/index', {name: 'aaa', age: 15}).then((res) => {
        if (res.data.code === '200') {
          this.imgUrls = []
          let list = res.data.list
          this.contentList = list
        }
      }).catch(err => {
        console.log(err.status, err.message)
      })

      // await this.$http.post('/sign', {name: 'post', age: 20}).then((res) => {
      //   console.log('post', res)
      // }).catch(err => {
      //   console.log(err.status, err.message)
      // })
    },
    bindPickerChange (e) {
      // let key = e.mp.detail.value
      if (wx.i18n.getLanguageCode() === 'en') {
        wx.i18n.setLanguageCode('zh_CN')
        Storage.setStorageData(STORAGE_KEY.LANGUAGE, 'zh_CN')
        this.languageValue = 'Language'
      } else {
        wx.i18n.setLanguageCode('en')
        Storage.setStorageData(STORAGE_KEY.LANGUAGE, 'en')
        this.languageValue = '语言切换'
      }
      event.emit('languageChanged')
      this.common = this.getCommonLanguageConfig()
      this.language = wx.i18n.getLanguageCode()
      this.init()
    },
    handleFire () {
      redirectTo('webview')
    },
    handleDesc (url) {
      navigateTo('webview', {url})
    }
  },
  onLoad () {
    this.init()
    // console.log('information', this.$mp)
  },
  onShow () {
    this.common = this.getCommonLanguageConfig()
    this.language = wx.i18n.getLanguageCode()
  },
  created () {
    // let app = getApp()
  },
  onShareAppMessage: function () {
    return {
      title: 'Home',
      path: 'pages/home/main?id=123'
    }
  }
}
</script>

<style scoped lang="less">
page {
  overflow-x: hidden;
}
  #container {
    height:100%;
    overflow-x: hidden;
    overflow-y: scroll;
    box-sizing:border-box;
    // background: linear-gradient(to bottom,#7e6044,#ffffff);
    header{
      height:60rpx;
      padding-left:34rpx;
      padding-right:30rpx;
      display:flex;
      justify-content: space-between;
      margin-bottom:45rpx;
      margin-top:42rpx;
    }
    .swiper-content {
      // width:620rpx;
      height:355rpx;
    }
    .category{
      width:100%;
      height:183rpx;
      padding: 28rpx 30rpx 12rpx 30rpx;
      display:flex;
      justify-content: space-between;
      box-sizing:border-box;
      .category-item{
        width:98rpx;
        height:180rpx;
        display:flex;
        flex-direction: column;
        align-items: center;
        img {
          width:88rpx;
          height:88rpx;
          margin-bottom:10rpx;
        }
        p{
          width:98rpx;
          height:auto;
          text-align:center;
          word-wrap:break-word;
          font-size:22rpx;
          color:'#000';
        }
      }
    }
    .news-information {
      height: 50rpx;
      padding-left:30rpx;
      padding-right:30rpx;
      font-size: 32rpx;
      text-align: left;
      line-height: 50rpx;
      color: #000;
      font-family: 微软雅黑;
      font-weight: 800;
      margin-top: 50rpx;
      margin-bottom: 50rpx;
    }
    .inf-list {
      width: 100%;
      height: auto;
      box-sizing: border-box;
      padding-left:30rpx;
      padding-right:30rpx;
      margin-bottom:20rpx;
      .inf-item {
        width: 100%;
        height: auto;
        margin-bottom: 20rpx;
        .item-img {
          width: 100%;
          height: 380rpx;
          border-radius:14rpx;
          img {
            width: 100%;
            height: 380rpx;
            border-radius:14rpx;
          }
        }
        .item-desc{
          width: 100%;
          height: 50rpx;
          box-sizing: border-box;
          p {
            height: 30rpx;
            font-size: 30rpx;
            line-height: 30rpx;
            font-weight: 600;
            margin-top: 10rpx;
            color: #000;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
          }
        }
      }
    }
    .search-language{
      width:150rpx;
      height:60rpx;
      padding-left:20rpx;
      box-sizing:border-box;
      .picker{
        width:100%;
        height:60rpx;
        font-size:22rpx;
        overflow:hidden;
        .picker-content {
          width:98rpx;
          height:60rpx;
          line-height:60rpx;
        }
        .down-arrow{
          width:18rpx;
          height:60rpx;
          display:inline-block;
          float:right;
          display:flex;
          align-items:center;
          img {
            width:16rpx;
            height:12rpx;
          }
        }
      }
    }
  }

</style>
