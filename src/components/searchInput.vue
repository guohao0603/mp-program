<template>
    <div class="search-input-container">
        <div class="bg"></div>
        <span class="icon">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAaCAMAAACaYWzBAAAAeFBMVEUAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZlpXV9uAAAAJ3RSTlMA+AXu9AnhxBN6LBprVTvn186lkJ9+cyQfELmxY0yYiDTdq1xFQYOHJ40mAAABKElEQVQoz2WRV5LDIBBEGaIkUM5ZXtvb97/hUs5m+4vqR8MEdteYxZOWlJv9ErG3+LFpAnmBdHPlT185QxBma+N6EoQijh5+fIKs0sRGke3XRiDf7e2dTqPo+md+WErkrfKnrESxfPyoUm+kio0Vic77H2TRmC/skqPp2ZdsDVGzmkTKvwFfC5SshElYoKSCZAL1EAK7Awz4tSGIOg8I+/APxB6c8NOHYKg9qKCzEGQGOVsk2vHbV07SD+sNipWHgfLMuBOYs6AL0Vq/vM0Hr+rVdtYQVf39BsG4JOJeY7JMhPl4ZBsBMbXndU27WQB596o7NhIk9ElISC1lk7wKPOJJCyllbuJ0I1m/G1A2S507XwfFjxna2c81KMX5bbcFSnf3whmSaP8A2TUWJ92/cQ4AAAAASUVORK5CYII=" />
        </span>
        <input
            class="form-control"
            :style="cusStyle"
             @focus="focus"
            :placeholder="placeholder || common.searchPlaceholder"
            
        />
    </div>
</template>
<script>
export default {
  name: 'search-input',
  data () {
    return {

    }
  },
  onShow () {

  },
  props: ['cusStyle', 'placeholder'],
  methods: {
    focus () {
      console.log('onfocus!!!!')
    }
  }
}
</script>
<style lang="less">
.search-input-container{
    width:538rpx;
    height:60rpx;
    box-sizing:border-box;
    overflow: hidden;
    position: relative;
    border-radius: 12rpx;
}
.bg,input{
    width:100%;
    height:100%;
}
.bg{
    background-color: #f6f6f6;
    z-index: 0;
}
span.icon{
    position:absolute;
    display: inline-block;
    top:17rpx;
    left:25rpx;
    width:30rpx;
    height:30rpx;
    img{
        vertical-align: top;
        width:100%;
        height:100%;
    }
    z-index: 1;
}
input{
    padding:0 22rpx;
    position: absolute;
    top:0;
    left:50rpx;
    width:450rpx;
    height:60rpx;
    line-height:60rpx;
    box-sizing: border-box;
    z-index: 3;
    font-size:22rpx;
}
::-webkit-input-placeholder {
      color: #4d4d4d;
      text-align: left;
}
</style>