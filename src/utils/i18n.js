let i18n = {
  languageCode: 'zh_CN',
  languageIndex: 0,
  locales: {}, // 本地化配置 各个页面的中英文
  languageCodes: ['zh_CN', 'en']
}
/**
 * 注册本地化配置
 * @param locales
 */
i18n.registerLocales = function (locales) {
  i18n.locales = locales
}
/**
 * 如果系统语言不是 中文 或者 英文， 默认用 中文
 * @param languageCode
 */
i18n.setLanguageCode = function (languageCode) {
  if (i18n.languageCodes.includes(languageCode)) {
    i18n.languageCode = languageCode
    return
  }
  i18n.languageCode = i18n.languageCodes[0]
}

/**
 * 获取 语言
 * @returns {string}
 */
i18n.getLanguageCode = function () {
  return i18n.languageCode
}
/**
 * 获取 本地化 配置
 * @returns {*}
 */
i18n.getLocales = function () {
  return i18n.locales
}
export default i18n
