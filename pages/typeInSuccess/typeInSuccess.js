let app = getApp()
let addBookApiUrl = app.globalData.baseUrl

Page({
  data: {
    bookPicUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Dwyane_Wade.jpg/440px-Dwyane_Wade.jpg",
    allBookCount: 1234,
  },
  onLoad() {
    this.loadPageInfo();
  },
  continueTypeIn() {
    dd.redirectTo({
      url: 'new_page?count=100'
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
