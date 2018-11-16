let app = getApp()
let addBookApiUrl = app.globalData.baseUrl
import config from '../../config/index.js';
import { ddPromise } from '../../config/utils.js';

Page({
  data: {
    bookPicUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Dwyane_Wade.jpg/440px-Dwyane_Wade.jpg",
    allBookCount: 1234,
  },
  onLoad() {
    this.loadPageInfo();
  },
  continueTypeIn() {
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
            url: `/pages/bookdetail/index?isbn=${isbn}&type=offer`
          })
        }).catch(err => {
          dd.alert({ content: err })
          dd.navigateTo({
            url: '/pages/typeInManual/typeInManual'
          })
        })
      },
    })
  },
  finishTypeIn() {
    dd.navigateTo({
      url: '/pages/index/index'
    })
  },
  loadPageInfo() {
    dd.showLoading();
    dd.httpRequest({
      url: addBookApiUrl,
      method: 'POST',
      data: {
        bookName: this.data.bookName,
        author: this.data.author,
        bookIntro: this.bookIntro
      },
      dataType: 'json',
      success: function(res) {
        dd.showToast({
          type: 'none',
          content: '图书录入成功',
        });
      },
      fail: function(res) {
        dd.showToast({
          type: 'none',
          content: '图书添加失败',
        });
      },
      complete: function(res) {
        dd.hideLoading();
      }
    });
  }
});
