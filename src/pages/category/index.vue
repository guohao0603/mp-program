<template>
  <div>
     <div class="fix-mode" v-if="showModal" @touchmove.stop.prevent="moveHandle">
        <div class="fix-header">
          <p class="fix-title">全部分类</p>
          <div class="fix-close" @click="handleModal">
            <img src="/static/images/close.png"/>
          </div>
        </div>
        <div class="fix-item">
          <div 
              v-for="(item,index) in itemList" 
              :key="index" 
              :class="(item.key === activeKey) ? 'fix-item-desc-active' : 'fix-item-desc'"
              @click="searchTitle(item.key)"
            >
              {{item.title}}
            </div>
        </div>
      </div>
     <div class="find-content">
        <div class="find-header">
          <scroll-view class="find-item" :scroll-left="x" :scroll-x="true" :scroll-with-animation="true">
            <div 
              v-for="(item,index) in itemList" 
              :key="index" 
              :class="(item.key === activeKey) ? 'active-title' : 'find-title'"
              @click="searchTitle(item.key)"
            >
              {{item.title}}
            </div>
          </scroll-view>
          <div class="find-btn" @click="handleModal">
            <img class="icon" src="/static/images/menu.png"/>
          </div>
        </div>
      </div>
     <div class="find-main">
      <div 
        class="find-main-item"   
        v-for="(item,index) in contentList" 
        :key="index" 
      >
        <div class="find-main-icon">
          <img :src="item && item.imgSrc"/>
        </div>
        <div class="find-main-desc">
          <p class="find-main-h1">{{item && item.title}}</p>
          <p class="find-main-h2">{{item && item.desc}}</p>
        </div>
        <div class="find-main-btn">
          <div class="find-main-btn-con"><span>+</span>加入</div>
        </div>
      </div>
     </div>
  </div>
  
</template>

<script>
export default {
  components: {

  },

  data () {
    return {
      itemList: [], // item List
      activeKey: 0, // 选中的item
      x: 0, // x轴移动的距离
      showModal: false,
      contentList: [] // item 内容 List
    }
  },
  onLoad () {
    this.init()
    this.searchItem({key: 0, lang: 'ch'})
  },
  onShow () {},
  created () {

  },
  methods: {
    moveHandle () {},
    async init () {
      await this.$http.get('/find').then((res) => {
        let value = res.data
        if (!!value && value.code === '200') {
          this.itemList = value.list
        }
      })
    },
    async searchItem (value) {
      await this.$http.get('/find', value).then((res) => {
        let result = res.data
        if (result.code === '200') {
          this.contentList = result.list[0].arrayList
        }
      })
    },
    handleModal () {
      this.showModal = !this.showModal
    },
    searchTitle (key) {
      let screenWidth = wx.getSystemInfoSync().windowWidth
      let itemWidth = screenWidth / 7.5
      let scrollX = itemWidth * (key + 1) - itemWidth * 3
      let maxScrollx = (this.itemList.length + 1) * itemWidth
      if (scrollX <= 0) {
        console.log('min-----------------')
        scrollX = 0
      } else if (scrollX >= maxScrollx) {
        console.log('max--------------------')
        scrollX = maxScrollx
      }
      this.x = scrollX
      this.activeKey = key
      this.searchItem({key: this.activeKey, lang: 'ch'})
      this.showModal = false
    }
  }
}
</script>

<style scoped lang="less">
@keyframes animationFade {
  from {
    opacity:0;
  }
  to {
    opacity:1;
  }
}
.find-content{
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  height:auto;
  z-index: 1;
  padding-left:40rpx;
  padding-right:28rpx;
  overflow-x:hidden;
  overflow-y: scroll;
  box-sizing:border-box;
  transition:height 2s;
  .find-header {
    width:100%;
    height:112rpx;
    padding-top:32rpx;
    padding-bottom:12rpx;
    box-sizing:border-box;
    .find-item {
      width:627rpx;
      float:left;
      height:68rpx;
      white-space: nowrap;
      overflow-x:scroll;
      overflow-y:hidden;
      .find-title {
        width:116rpx;
        height:68rpx;
        line-height:68rpx;
        text-align:center;
        font-size:26rpx;
        display:inline-block;
        color:#ababab;
      }
      .active-title {
        width:116rpx;
        height:68rpx;
        line-height:68rpx;
        text-align:center;
        font-size:26rpx;
        display:inline-block;
        background-color:#3b3b3b;
        border-radius: 38rpx;
        color:#fff;
      }
    }
    .find-btn{
      width:55rpx;
      float:right;
      height:68rpx;
      background-color:#fff;
      opacity:0.4;
      display:flex;
      align-items: center;
      justify-content:center;
      .icon {
        width:24rpx;
        height:20rpx;
      }
    }
  }
}
.fix-mode {
    position:fixed;
    top:0;
    left:0;
    z-index: 2;
    width:100%;
    height:100%;
    box-sizing:border-box;
    background-color:rgba(178,178,178,0.5);
    .fix-header {
      height:112rpx;
      padding-left:40rpx;
      padding-right:34rpx;
      display:flex;
      justify-content: space-between;
      align-items:center;
      background-color:#fff;
      animation:animationFade 1s;
      .fix-title {
        font-size:26rpx;
        color:#666666;
      }
      .fix-close {
         width:60rpx;
         height:60rpx;
         padding:14rpx 18rpx;
         box-sizing:border-box;
         img {
           width:24rpx;
           height:20rpx;
         }
      }
    }
    .fix-item {
      max-height:570rpx;
      padding:0 40rpx 22rpx 40rpx;
      overflow-x:hidden;
      overflow-y:scroll;
      background-color:#fff;
      display:flex;
      flex-direction: row;
      justify-content:space-between;
      align-content: flex-start;
      flex-wrap:wrap;
      animation:animationFade 1s;
      &:after {
        content: "";
        flex: auto;
      }
      .fix-item-desc {
        width:148rpx;
        height:68rpx;
        line-height:68rpx;
        text-align:center;
        background-color:#f6f6f6;
        border-radius:14rpx;
        margin-bottom:22rpx;
        margin-right:26rpx;
        box-sizing:border-box;
        color:#666666;
        font-size:26rpx;
      }
      & .fix-item-desc:nth-child(4n+4) {
        margin-right:0;
      }
      .fix-item-desc-active {
        width:148rpx;
        height:68rpx;
        line-height:68rpx;
        text-align:center;
        border-radius:14rpx;
        margin-bottom:22rpx;
        margin-right:26rpx;
        box-sizing:border-box;
        background-color:#3b3b3b;
        color:#ffffff;
        font-size:26rpx;
      }
       & .fix-item-desc-active:nth-child(4n+4) {
        margin-right:0;
      }
    }
  }


.find-main {
  height:auto;
  box-sizing:border-box;
  margin-top:112rpx;
  background-color:#f7f7f7;
  .find-main-item {
    height:186rpx;
    padding:24rpx 40rpx;
    margin-bottom:16rpx;
    background-color:#fff;
    box-sizing:border-box;
    .find-main-icon {
      width:138rpx;
      height:138rpx;
      float:left;
      border-radius:14rpx;
      img {
        width:138rpx;
        height:138rpx;
        border-radius:14rpx;
      }
    }
    .find-main-desc {
      width:289rpx;
      height:138rpx;
      float:left;
      box-sizing:border-box;
      padding:16rpx 0 18rpx 26rpx;
      .find-main-h1{
        width:100%;
        font-size:32rpx;
        color:#000;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        margin-bottom:6rpx;
      }
      .find-main-h2 {
        width:100%;
        height:55rpx;
        overflow:hidden;
        text-overflow:ellipsis;
        color:#ababab;
        font-size:20rpx;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
    .find-main-btn {
      width:244rpx;
      height:138rpx;
      float:right;
      display:flex;
      justify-content: flex-end;
      align-items: center;
      .find-main-btn-con {
        width:138rpx;
        height:64rpx;
        box-sizing:border-box;
        border:1rpx solid #3b3b3b;
        color:#000;
        font-size:26rpx;
        text-align:center;
        line-height:64rpx;
        border-radius:32rpx;
        span {
          font-size:26rpx;
          margin-right:14rpx;
        }
      }
    }
  }
}
</style>
