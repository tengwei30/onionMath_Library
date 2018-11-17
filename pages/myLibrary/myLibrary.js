let TAB_MY_BORROW = 1
let TAB_MY_RESERVE = 2
let TAB_MY_CONTRIBUTE = 3
let app = getApp()

import config from '../../config/index.js';
import { ddPromise } from '../../config/utils.js';

Page({
  data: {
    myBorrowSeleted: true,
    myReserveSeleted: false,
    myContributeSeleted: false,
    seletedIndex: TAB_MY_BORROW,
    myLibraryData:{},
    bookList: []
  },
  onLoad() {
    this.getMyLibraryData()
  },
  onUnload() {

  },
  seletedTab: function(e) {
    let seletedIndex = e.target.dataset.selected
    this.setData({
      myBorrowSeleted: seletedIndex == TAB_MY_BORROW,
      myReserveSeleted: seletedIndex == TAB_MY_RESERVE,
      myContributeSeleted: seletedIndex == TAB_MY_CONTRIBUTE,
      seletedIndex: seletedIndex
    })
    let myLibraryData = this.data.myLibraryData
    if (seletedIndex == TAB_MY_BORROW) {
      this.setData({
        bookList: myLibraryData.borrowing
      })
    } else if (seletedIndex == TAB_MY_RESERVE){
      this.setData({
        bookList: myLibraryData.borrowing
      })
    } else if (seletedIndex == TAB_MY_CONTRIBUTE){
      this.setData({
        bookList: myLibraryData.borrowing
      })
    }
  },
  getMyLibraryData(){
    let _this = this
    dd.showLoading()
    ddPromise(dd.httpRequest)({
      url: `${config.domain.common}/user/books?userId=${app.globalData.userInfo.id}`,
      method: 'GET'
    }).then(res => {
      dd.hideLoading();
      console.log('scan', res)
      _this.setData({
        myLibraryData : res.data
      })
    }).catch(err => {
      dd.hideLoading();
      dd.showToast({
        type: 'none',
        content: '数据获取失败'
      });
    })
  },
  counttingTime() {
    this.bookList.forEach(bookItem => {
      let leftMinute = this.data.leftMinute
      let leftSecond = this.data.leftSecond
      let totalSecond = leftMinute * 60 + leftSecond
      var _this = this
      let timer = setInterval(function() {
        totalSecond--
        if (totalSecond < 0) {
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
    });
  },

});
