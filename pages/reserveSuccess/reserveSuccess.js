let app = getApp()
let addBookApiUrl = app.globalData.baseUrl

Page({
  data: {
    bookPicUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Dwyane_Wade.jpg/440px-Dwyane_Wade.jpg",
    leftMinute: 29,
    leftSecond:16,
    towerNumber:5,
    floorNumber:2,
    corner:"东南角",
    shelfPosition:"B2格",
    totalSecond:0,
  },
  onLoad() {
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
    let leftMinute =  this.data.leftMinute
    let leftSecond = this.data.leftSecond
    let totalSecond = leftMinute * 60 + leftSecond
    var _this = this
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
