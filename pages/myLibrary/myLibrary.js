let TAB_MY_BORROW = 1
let TAB_MY_RESERVE = 2
let TAB_MY_CONTRIBUTE = 3
let app = getApp()
let addBookApiUrl = app.globalData.baseUrl
import config from '../../config/index.js';
import { ddPromise } from '../../config/utils.js';

Page({
  data: {
    myBorrowSeleted: false,
    myReserveSeleted: true,
    myContributeSeleted: false,
    seletedIndex: TAB_MY_BORROW,
    bookList: [
      {
        bookName: "碟形世界:猫和少年魔笛手",
        bookPicUrl: "https://img1.doubanio.com/view/subject/m/public/s29471427.jpg",
        bookAuthor: "特里·普拉切特",
        tag: "已归还",
        isReturn:true
      },
      {
        bookName: "碟形世界:猫和少年魔笛手",
        bookPicUrl: "https://img1.doubanio.com/view/subject/m/public/s29471427.jpg",
        bookAuthor: "特里·普拉切特",
        tag: "已借阅12天",
        isReturn:false
      }
    ]
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
    switch(seletedIndex){
      case TAB_MY_BORROW:
        this.setData({
          bookList: this.data.bookList
        })
       break;
      case TAB_MY_RESERVE:
        this.setData({
          bookList: this.data.bookList
        })
        start
        break;
      case TAB_MY_CONTRIBUTE:
        this.setData({
          bookList: this.data.bookList
        })
        break;
    }
  },
  getMyLibraryData(){
    let _this = this
    dd.showLoading()
    ddPromise(dd.httpRequest)({
      url: `${config.domain.common}/book/auto`,
      method: 'POST',
      data: {}
    }).then(res => {
      dd.hideLoading();
      console.log('scan', res)
      _this.setData({

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
