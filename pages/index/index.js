import config from '../../config/index.js';
import { ddPromise } from '../../config/utils.js';

Page({
  onLoad(query) {
    // 页面加载
  },
  onReady() {
    // 页面加载完成
    let data = dd.getStorageSync({ key: 'userInfo' })
    console.log('index', data)
  },
  gotoScan (ev) { // 扫码借书
    dd.scan({
      type: 'qr',
      success: (res) => {
        const onionId = res.code
        dd.navigateTo({
          url: `/pages/bookdetail/index?onionId=${onionId}&type=borrow&isbn=''`
        })
      },
    })
  },
  gotoBooks (ev) {  // 跳转到图书库
    dd.navigateTo({
      url: '/pages/onionBooks/onionBooks'
    })
  },
  gotoMyLibrary (ev) {
    dd.navigateTo({
      url: '/pages/myLibrary/myLibrary'
    })
  },
  scanBook (ev) { // 扫码献书
    dd.scan({
      type: 'qr',
      success: (res) => {
        const isbn = res.code
        ddPromise(dd.httpRequest)({
          url: `${config.domain.common}/book/auto`,
          method: 'POST',
          data: { isbn }
        }).then(res => {
          if (res.data.find) {
            dd.navigateTo({
              url: `/pages/bookdetail/index?isbn=${isbn}&type=offer&onionId=''`
            })
          } else {
            dd.navigateTo({
              url: '/pages/typeInManual/typeInManual'
            })
          }
        }).catch(err => {
          dd.alert({ content: err })
        })
      },
    })
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: '洋葱图书馆',
      desc: '洋葱图书馆',
      path: 'pages/index/index',
    };
  },
});
