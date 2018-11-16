let app = getApp()
let addBookApiUrl = app.globalData.baseUrl

Page({
  data: {
    bookPicUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Dwyane_Wade.jpg/440px-Dwyane_Wade.jpg",
    bookName:"少数派报告",
    bookAuthor:"菲利普·迪克",
    bookIntor:"本书荟萃科幻鬼才菲利普·迪克最具代表性的短篇小说结集： 《第二代》《冒名顶替》本书荟萃科幻鬼才菲利普·迪克最具代表性的短篇小说结集： 《第二代》《冒名顶替》本书荟萃科幻鬼才菲利普·迪克最具代表性的短篇小说结集： 《第二代》《冒名顶替》本书荟萃科幻鬼才菲利普·迪克最具代表性的短篇小说结集： 《第二代》《冒名顶替》本书荟萃科幻鬼才菲利普·迪克最具代表性的短篇小说结集： 《第二代》《冒名顶替》本书荟萃科幻鬼才菲利普·迪克最具代表性的短篇小说结集： 《第二代》《冒名顶替》《规划小组》《少数派报告》《战争游戏》《啊，当个布洛贝尔人！》《死者的话》《全面回忆》和《电子蚂蚁》。  ",
    bookReview:"Psycho-Pass的世界观设定完全脱胎于少数派报告啊，故事的内核也差不多，都是思考人类需要在高度程式化的社会里继续保持对人性的信任。",
    bookReviewAuthor:"某光年"
  },
  onLoad() {},
  addBook() {
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
        dd.redirectTo({
          url: '/pages/typeInSuccess/typeInSuccess'
        })
      },
      fail: function(res) {
        dd.alert({ content: '图书添加失败' });
      },
      complete: function(res) {
        dd.hideLoading();
      }
    });
  }
});
