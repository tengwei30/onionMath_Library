import config from '../../config/index.js';
import { ddPromise } from '../../config/utils.js';

Page({
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  onReady() {
    // 页面加载完成
  },
  gotoScan (ev) {
    dd.scan({
      type: 'qr',
      success: (res) => {
        const isbn = res.code
        ddPromise(dd.httpRequest)({
          url: `${config.domain.common}/book/auto`,
          method: 'POST',
          data: { isbn }
        }).then(res => {
          console.log('scan', res)
          dd.navigateTo({
            url: `/pages/bookdetail/index?isbn=${isbn}&type=borrow`
          })
        }).catch(err => {
          dd.alert({content: err})
        })
      },
    })
  },
  gotoBooks (ev) {  // 跳转到图书库
    dd.navigateTo({
      url: '/pages/onionBooks/onionBooks'
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
