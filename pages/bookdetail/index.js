let app = getApp()
// let addBookApiUrl = app.globalData.baseUrl
import config from '../../config/index.js';
import { ddPromise } from '../../config/utils.js';

Page({
  data: {
    bookdetail: null,
    bookPicUrl: '',
    type: ''
  },
  onLoad (options) {
    const { isbn, type } = options
    this.setData({ type })
    ddPromise(dd.httpRequest)({
      url: `${config.domain.common}/book/${options.isbn}`,
      method: 'GET'
    }).then(res => {
      console.log(res.data)
      ddPromise(dd.httpRequest)({
        url: `${config.domain.common}/img?imgUrl=${encodeURIComponent(res.data.coverImg)}`,
        method: 'GET'
      }).then(res => {
        this.setData({
          bookPicUrl: res.data
        })
      })
      this.setData({
        bookdetail: res.data
      })
    })
  },
  addBook () {
    const { type } = this.data
    if (type === 'borrow') {
      dd.navigateTo({
        url: '/pages/borrowSuccess/borrowSuccess'
      })
    }
    if (type === 'offer') {
      dd.scan({
        type: 'qr',
        success: (res) => {
          console.log(res)
          dd.navigateTo({
            url: '/pages/typeInSuccess/typeInSuccess'
          })
        }
      })
    }
  }
});
