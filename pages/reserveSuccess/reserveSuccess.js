let app = getApp()
import config from '../../config/index.js';
import { ddPromise } from '../../config/utils.js';


Page({
  data: {
    bookPicUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Dwyane_Wade.jpg/440px-Dwyane_Wade.jpg",
    leftMinute: 29,
    leftSecond:16,
    leftTotalTime:0,
    towerNumber:5,
    floorNumber:2,
    corner:"东南角",
    shelfPosition:"B2格",
    totalSecond:0,
    position:"",
    onionId:""
  },
  onLoad(options) {

    const { invalidTime, bookUrlEncode, positionEncode, onionId } = options
    this.setData({
      bookPicUrl: decodeURIComponent(bookUrlEncode),
      position: decodeURIComponent(positionEncode),
      leftTotalTime: parseInt((invalidTime - new Date().getTime()) / 1000),
      onionId: onionId
    })
    this.counttingTime()
  },
  requestReserveInfo() {
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
  },
  counttingTime() {
    let totalSecond = this.data.leftTotalTime
    let _this = this
    let timer = setInterval(function() {
      totalSecond--
      if(totalSecond < 0){
        clearInterval()
        return
      }
      let leftSecond = totalSecond % 60
      let leftMinute = parseInt(totalSecond / 60)
      _this.setData({
        leftMinute: leftMinute,
        leftSecond: leftSecond
      })
    }, 1000);
  },
  cancelReserve() {
    dd.showLoading();
    let _this = this
    ddPromise(dd.httpRequest)({
      url: `${config.domain.common}/book/order/cancel`,
      method: 'POST',
      data: { 
        onionId: _this.data.onionId,
        userId: app.globalData.userInfo.id
       }
    }).then(res => {
      dd.hideLoading();
      dd.showToast({
        type: 'none',
        content: '取消预订成功'
      });
      dd.navigateBack()
    }).catch(err => {
      dd.hideLoading();
      dd.showToast({
        type: 'none',
        content: '数据获取失败'
      });
    })
  }
});
