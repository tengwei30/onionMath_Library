let app = getApp()
let addBookApiUrl = app.globalData.baseUrl

Page({
    data: {
        bookName: "",
        author: "",
        bookIntro: ""
    },
    onLoad() {
    },
    onBookNameInput: function (e) {
      console.log(e.detail.value)
      this.setData({
        bookName: e.detail.value
      })
    },
    onAuthorNameInput: function(e) {
      console.log(e.detail.value)
      this.setData({
        author: e.detail.value
      })
    },
    onBookIntroInput: function(e) {
      console.log(e.detail.value)
      this.setData({
        bookIntro: e.detail.value
      })
    },
    addBook() {
      if(!this.checkBookInfoComplete())
        return;  
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
          dd.alert({ content: '图书添加成功' });
        },
        fail: function(res) {
          dd.alert({ content: '图书添加失败' });
        },
        complete: function(res) {
          dd.hideLoading();
        }
      });
    },
    checkBookInfoComplete: function() {
      if (this.isEmpty(this.data.bookName)){
        dd.alert({ content: '请填写书名' });
        return false
      }
      if (this.isEmpty(this.data.author)){
        dd.alert({ content: '请填写作者名称' });
        return false
      }
      if (this.isEmpty(this.data.bookIntro)) {
        dd.alert({ content: '请填写书籍简介' });
        return false
      }
      return true
    },
    isEmpty: function(obj) {
      if (typeof obj == "undefined" || obj == null || obj == "") {
        return true;
      } else {
        return false;
      }
  }
});
