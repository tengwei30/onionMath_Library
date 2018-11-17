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
    bookList: [],
    userId: ''
  },
  onLoad() {
    let userInfo = dd.getStorageSync({ key: 'userInfo' })
    this.setData({
      userId: userInfo.data.id
    })
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
        bookList: myLibraryData.order
      })
      this.counttingTime()
    } else if (seletedIndex == TAB_MY_CONTRIBUTE){
      this.setData({
        bookList: myLibraryData.contribute
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
        myLibraryData : res.data,
        bookList: res.data.borrowing
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
    this.data.bookList.forEach(bookItem => {
      let leftTotal = parseInt(new Date(bookItem.invalidTime).getTime() / 60)
      var _this = this
      let timer = setInterval(function() {
        leftTotal--
        if (leftTotal < 0) {
          clearInterval()
          return
        }
        let leftSecond = leftTotal % 60
        let leftMinute = parseInt(leftTotal / 60)
        _this.setData({
          leftMinute: leftMinute,
          leftSecond: leftSecond
        })
      }, 1000);
    });
  },
  tapBookItem:function(res) {
    console.log('my', this.data.userId)
    const { userId, myBorrowSeleted } = this.data
    if (myBorrowSeleted){
      dd.navigateTo({
        url: `/pages/returnbook/returnbook?onionId=${res.target.dataset.bookItem.onionId}&userId=${userId}`
      })
    }
  }
});
