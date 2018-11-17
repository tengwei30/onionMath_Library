let app = getApp()

import config from '../../config/index.js';
import { ddPromise } from '../../config/utils.js';

Page({
  data: {
    onionId:"",
    bookdetail:{},
    showComment:false
  },
  onLoad(options) {
    const { onionId } = options
    this.setData({
      onionId: onionId
    })
    this.getBookInfo(onionId)
  },
  getBookInfo(onionId) {
    dd.showLoading()
    let _this =this
    ddPromise(dd.httpRequest)({
      url: `${config.domain.common}/book/${onionId}`,
      method: 'GET'
    }).then(res => {
      dd.hideLoading();
      console.log('res', res)
      _this.setData({
        bookdetail: res.data
      })
      if (res.data.comments != null && res.data.comments.length!=0){
        _this.setData({
          showComment: true
        })
      }
    }).catch(err => {
      dd.hideLoading();
      dd.showToast({
        type: 'none',
        content: '数据获取失败'
      });
    })
  },
  orderBook() {
    dd.showLoading()
    let _this = this
    console.log("app.globalData.userInfo.id" + app.globalData.userInfo.id)
    ddPromise(dd.httpRequest)({
      url: `${config.domain.common}/book/order`,
      method: 'POST',
      data: {
        onionId: _this.data.bookdetail.onionId,
        userId: app.globalData.userInfo.id
      }
    }).then(res => {
      dd.hideLoading();
      dd.showToast({
        type: 'none',
        content: res.data.message
      });
      if (!res.data.canOrder) {
        return
      }
      console.log(_this.data.bookdetail)
      let invalidTime = new Date(res.data.invalidTime).getTime()
      let bookUrlEncode = encodeURIComponent(_this.data.bookdetail.coverImg)
      let positionEncode = encodeURIComponent(_this.data.bookdetail.position)
      let onionId = _this.data.bookdetail.onionId
      let url = `/pages/reserveSuccess/reserveSuccess?invalidTime=${invalidTime}&bookUrlEncode=${bookUrlEncode}&positionEncode=${positionEncode}&onionId=${onionId}`
      dd.redirectTo({
        url: url
      })
    }).catch(err => {
      dd.hideLoading();
      console.log(err)
      dd.showToast({
        type: 'none',
        content: '预定失败'
      });
    })
  }
});
