let app = getApp()
// let addBookApiUrl = app.globalData.baseUrl
import config from '../../config/index.js';
import { ddPromise } from '../../config/utils.js';

Page({
  data: {
    bookdetail: null,
    bookPicUrl: '',
    type: '',
    state: '',
    onionId: '',  // 洋葱Id
    userId: '',
    isbn: ''  // 扫码献书
  },
  onLoad (options) {
    let userInfo = dd.getStorageSync({ key: 'userInfo' })
    const { onionId, type, isbn } = options
    this.setData({ type, onionId, userId: userInfo.data.id, isbn })
    if (type === 'borrow') {
      ddPromise(dd.httpRequest)({
        url: `${config.domain.common}/book/${onionId}`,
        method: 'GET'
      }).then(res => {
        this.setData({
          bookdetail: res.data,
          state: res.data.state
        })
      }).catch(err => {
        console.error('error ----> ', err)
      })
    }
    if (type === 'offer') {
      ddPromise(dd.httpRequest)({
        url: `${config.domain.common}/book/auto`,
        method: 'POST',
        data: { isbn }
      }).then(res => {
        this.setData({
          bookdetail: res.data.book
        })
      }).catch(err => {
        console.error('error ----> ', err)
      })
    }
  },
  addBook () {
    const { type, state, onionId, userId } = this.data
    if (type === 'borrow' && state === 'idle') {
      // ddPromise(dd.httpRequest)({
      //   url: `${config.domain.common}/book/borrow`,
      //   method: 'POST',
      //   data: {
      //     onionId,
      //     userId
      //   }
      // }).then(res => {
        dd.navigateTo({
          url: `/pages/borrowSuccess/borrowSuccess?onionId=${onionId}&userId=${userId}`
        })
      // }).catch(err => {
      //   console.error('error ---> ', err)
      // })
    }
    if (type === 'offer') {
      dd.scan({
        type: 'qr',
        success: (res) => {
          const onionId = res.code
          this.bindonionCode(onionId)
        }
      })
    }
  },
  bindonionCode(onionId) {
    const { userId, isbn } = this.data
    // ddPromise(dd.httpRequest)({
    //   url: `${config.domain.common}/bind/onionId`,
    //   method: 'POST',
    //   data: {
    //     onionId,
    //     isbn,
    //     userId
    //   }
    // }).then(res => {  // 录入成功
      dd.navigateTo({
        url: `/pages/typeInSuccess/typeInSuccess?onionId=${onionId}&isbn=${isbn}&userId=${userId}`
      })
    // }).catch(err => {
    //   console.error('error ---> ', err)
    // })
  },
});
