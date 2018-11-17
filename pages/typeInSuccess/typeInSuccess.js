let app = getApp()
import config from '../../config/index.js';
import { ddPromise } from '../../config/utils.js';

Page({
  data: {
    coverImg: "",
    count: 0,
    onionId: '',
    isbn: '',
    userId: ''
  },
  onLoad(options) {
    console.log(options)
    const { isbn, onionId, userId } = options
    ddPromise(dd.httpRequest)({
      url: `${config.domain.common}/bind/onionId`,
      method: 'POST',
      data: {
        isbn,
        onionId,
        userId
      }
    }).then(res => {
      console.log(res)
      const { count, coverImg } = res.data
      this.setData({
        count,
        coverImg
      })
    }).catch(err => {
      console.error('error ---> ', err)
    })
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
  }
});
