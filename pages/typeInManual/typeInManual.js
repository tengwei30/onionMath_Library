let app = getApp()
// let userInfo = app.globalData.userInfo
import config from '../../config/index.js';
import { ddPromise } from '../../config/utils.js';

Page({
    data: {
        bookName: "",
        author: "",
        bookIntro: "",
        ISBNName: "",
        userInfo: ''
    },
    onLoad() {
      let data = dd.getStorageSync({ key: 'userInfo' })
      this.setData({
        userInfo: data.data
      })
    },
    onReady () {   
    },
    onBookNameInput: function (e) {
      this.setData({
        bookName: e.detail.value
      })
    },
    onAuthorNameInput: function(e) {
      this.setData({
        author: e.detail.value
      })
    },
    onBookIntroInput: function(e) {
      this.setData({
        bookIntro: e.detail.value
      })
    },
    onISBNNameInput: function(e) {
      this.setData({
        ISBNName: e.detail.value
      })
    },
    addBook() {
      if(!this.checkBookInfoComplete())
      return;
      dd.showLoading();
      const { bookName, author, bookIntro, ISBNName } = this.data
      ddPromise(dd.httpRequest)({
        url: `${config.domain.common}/book`,
        method: 'POST',
        data: {
          "name": bookName,
          "author": author,
          "publisher": "",
          "summary": bookIntro,
          "coverImg": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542456125632&di=bc033177e8038a5e5a9795c7a3ad3ccd&imgtype=0&src=http%3A%2F%2Fwww.reader8.cn%2Fuploadfile%2F2017%2F0722%2F20170722095740544.jpg",
          "isbn": ISBNName
        }
      }).then(res => {
        dd.hideLoading()
        dd.scan({
          type: 'qr',
          success: (res) => {
            const { code } = res.code
            this.bindonionCode(code)
          }
        })
      }).catch(err => {
        dd.hideLoading()
        console.error('error ---> ', err)
      })
    },
    bindonionCode (onionId) {
      const { userInfo, isbn } = this.data
      console.log('userInfo', userInfo)
      ddPromise(dd.httpRequest)({
        url: `${config.domain.common}/bind/onionId`,
        method: 'POST',
        data: {
          "onionId": onionId,
          "isbn": isbn,
          "userId": userInfo.store.id
        }
      }).then(res => {
        dd.navigateTo({
          url: '/pages/typeInSuccess/typeInSuccess'
        })
      }).catch(err => {
        console.error('error ---> ', err)
      })
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
      if (this.isEmpty(this.data.ISBNName)) {
        dd.alert({ content: '请填写书籍ISBN码' });
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
