var WXBizDataCrypt = require('./WXBizDataCrypt')
var appId = 'wx220584793284e9d6'
var sessionKey = 'mbPzcxnasRVWGrv3TufKvw=='
var encryptedData = "ExoAB7nkFd7HpGoXKjQnsWlxXvccd4rxcV5CtVODSdBFG+oGC4+zJ6ZSwVo39SO/WE4jQx6lLcWG3EI37e2GbKS+/ccUXbG+pgBGDFVzCB8w9evHfRGJjMpsf2WP5PotT5zMEGuBRMiM6hMrHvHgs5V3hxm8MMdoVjOcyKW5ozSsqLz3mC7cJoiuC1Y59yw58J2biWi/Oed601jcVfsk0g=="
var iv = "P5DinNxlTU6SganU0eOPpw=="
var pc = new WXBizDataCrypt(appId, sessionKey)
var data = pc.decryptData(encryptedData , iv)
console.log('解密后 data: ', data)
// 解密后的数据为
//
// data = {
//   "nickName": "Band",
//   "gender": 1,
//   "language": "zh_CN",
//   "city": "Guangzhou",
//   "province": "Guangdong",
//   "country": "CN",
//   "avatarUrl": "http://wx.qlogo.cn/mmopen/vi_32/aSKcBBPpibyKNicHNTMM0qJVh8Kjgiak2AHWr8MHM4WgMEm7GFhsf8OYrySdbvAMvTsw3mo8ibKicsnfN5pRjl1p8HQ/0",
//   "unionId": "ocMvos6NjeKLIBqg5Mr9QjxrP1FA",
//   "watermark": {
//     "timestamp": 1477314187,
//     "appid": "wx4f4bc4dec97d474b"
//   }
// }
