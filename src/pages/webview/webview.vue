<template>
  <web-view :src="url"></web-view>
</template>
<script>
export default {
  name: 'webview',
  data () {
    return {
      url: ''
    }
  },
  onLoad () {
    this.url = this.$root.$mp.query.url || 'https://www.baidu.com'
  }
}
</script>