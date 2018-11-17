import config from '../../config/index.js';
import { ddPromise } from '../../config/utils.js';

Page({
  data: {
    userId: '',
    onionId: '',
    bookdetail: {}
  },
  onLoad (options) {
    console.log(options)
    const { userId, onionId } = options
    this.setData({ userId, onionId })
    this.getBookDetail()
  },
  returnBook () {
    dd.scan({
      type: 'qr',
      success: (res) => {
        const position = res.code
        ddPromise(dd.httpRequest)({
          url: `${config.domain.common}/book/back`,
          method: 'POST',
          data: {
            onionId,
            userId,
            position
          }
        }).then(res => {
          dd.alert({ content: '还书成功' })
          sertTimeOut(() => {
            dd.navigateTo({
              url: 'pages/index/index'
            })
          }, 2500)
        }).catch(err => {
          console.error('error ---> ', err)
        })
      },
    })
  },
  getBookDetail () {
    const { onionId } = this.data
    ddPromise(dd.httpRequest)({
      url: `${config.domain.common}/book/${onionId}`,
      method: 'GET'
    }).then(res => {
      this.setData({
        bookdetail: res.data
      })
    }).catch(err => {
      console.error('error ---> ', err)
    })
  }
})