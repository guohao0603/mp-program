<template>
  <div class="my-item" :style="borderStyle" @click="action">
    <p class="my-item-content">
        <span class="my-icon">
            <img :src="icon"/>
        </span>
        <span class="my-desc">{{title}}</span>
    </p>
    <p class="my-arrow">
        <span v-if="subTitle" style="color: #4d4d4d;font-size: 28rpx;margin-right:20rpx;">{{subTitle}}</span>
        <img src="/static/images/arrow.png"/>
    </p>
  </div>
</template>
<script>
export default {
  name: 'mineItem',
  props: ['title', 'subTitle', 'icon', 'action', 'bottomLineStyle'],
  computed: {
    borderStyle () {
      let style = ''

      if (this.bottomLineStyle) {
        style += this.bottomLineStyle
      }
      return style
    }
  }
}
</script>
<style lang="less" scoped>
.my-item {
    width:100%;
    height:112rpx;
    box-sizing:border-box;
    padding:0 40rpx;
    background-color:#ffffff;
    display:flex;
    justify-content: space-between;
    align-items:center;
    .my-item-content {
        width:202rpx;
        height:112rpx;
        display:flex;
        align-items:center;
        .my-icon {
            width:40rpx;
            height:40rpx;
            img {
                width:40rpx;
                height:40rpx;
            }
        }
        .my-desc {
            font-size:30rpx;
            color:#000;
            margin-left:20rpx;
        }
    }
    .my-arrow {
        height:30rpx;
        display:flex;
        align-items:center;
        img {
            width:18rpx;
            height:30rpx;
        }
    }
}
</style>