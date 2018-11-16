let app = getApp()
let addBookApiUrl = app.globalData.baseUrl

Page({
  data: {
    bookReview:""
  },
  onLoad() {}
  ,
  reviewBook(){

  },
  onBookIntroInput: function(e) {
    console.log(e.detail.value)
    this.setData({
      bookReview: e.detail.value
    })
  },

});
