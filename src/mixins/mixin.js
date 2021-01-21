import event from '../utils/event'

const mixin = {
  data () {
    return {
      i18n: {}
    }
  },
  onLoad: function () {
    // 每次加载页面都要更新一下语言 并 监听语言切换通知
    this.updateLanguage()
    // console.log('onLoad我被执行了') // 每个页面只执行一次
    event.on('languageChanged', this, this.updateLanguage)
  },
  onShow: function () {
    console.log('mixinonShow')
    // let page = getCurrentPages() // eslint-disable-line
    // console.log('页面栈', page)
    this.updateLanguage()
  },
  onUnload: function () {
    event.remove('languageChanged', this)
  },
  methods: {
    // 全局本地化配置
    getCommonLanguageConfig () {
      return wx.i18n.getLocales()['common'][wx.i18n.getLanguageCode()]
    },
    // 获取pageName
    getPageName () {
      let page = this.$root.$mp.page
      let pageName = ''
      if (!page) {
        pageName = this.$root.$mp.appOptions.path.split('/')[1]
      } else {
        pageName = this.$root.$mp.page.route.split('/')[1]
      }
      return pageName
    },
    updateLanguage () {
      let pageName = this.getPageName()
      if (!pageName) {
        this.i18n = {}
      } else {
        // page 配置了name 但是没有locale文件
        if (!wx.i18n.getLocales()[pageName]) {
          this.i18n = {}
        } else {
          this.i18n = wx.i18n.getLocales()[pageName][wx.i18n.getLanguageCode()]
        }
      }
      this.setTabBar()
      // 当收到 修改语言 的通知时，只对 page 对象还在（当前显示页面）更新 title
      if (this.$mp) {
        this.setTitle()
      }
    },
    setTitle (title = '') {
      let tempTitle = ''
      if (title !== '') {
        tempTitle = title
      } else if (this.customTitle) { // 如果页面定义了 customTitle，则直接拿 customTitle 返回值
        tempTitle = this.customTitle()
      } else if (this.i18n.title) {
        tempTitle = this.i18n['title']
      }
      // if (!tempTitle || tempTitle === '') {
      //   let pageName = this.getPageName()
      //   let barTitle = wx.i18n.getLocales()[pageName][wx.i18n.getLanguageCode()]['title']
      //   tempTitle = barTitle
      // }
      wx.setNavigationBarTitle({ title: tempTitle })
    },
    setTabBar () {
      wx.setTabBarItem({index: 0, text: this.getCommonLanguageConfig().tabBarHome})
      wx.setTabBarItem({index: 1, text: this.getCommonLanguageConfig().tabBarCategory})
      wx.setTabBarItem({index: 2, text: this.getCommonLanguageConfig().tabBarMine})
    }
  }
}
export default mixin
