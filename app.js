import config from './config/index.js';
import { ddPromise } from './config/utils.js';

App({
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    dd.getAuthCode({
      success: (res) => {
        const code = res.authCode
        ddPromise(dd.httpRequest)({
          url: `${config.domain.common}/user/login`,
          method: 'POST',
          data: { code }
        }).then(res => {
          console.log(res)
          this.globalData.userInfo = res.data
        }).catch(err => {
          console.error('error ---> ', err)
        })
      },
      fail: (err) => {
        dd.alert({ content: JSON.stringify(err) })
      }
    })
  },
  onLoad () {
    
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },
  globalData: {
    baseUrl: "http://httpbin.org/post",
    userInfo: null
  }
});
