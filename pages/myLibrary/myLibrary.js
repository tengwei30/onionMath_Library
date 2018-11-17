let TAB_MY_BORROW = 1
let TAB_MY_RESERVE = 2
let TAB_MY_CONTRIBUTE = 3

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
        state: "已借阅12天"
      },
      {
        bookName: "碟形世界:猫和少年魔笛手",
        bookPicUrl: "https://img1.doubanio.com/view/subject/m/public/s29471427.jpg",
        bookAuthor: "特里·普拉切特",
        state: "已借阅12天"
      }
    ]
  },
  onLoad() {

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
        this.requestBorrowList();
       break;
      case TAB_MY_RESERVE:
        this.requestReserveList();
        break;
      case TAB_MY_CONTRIBUTE:
        this.requestContribute();
        break;
    }
  },
  equestBorrowList(){

  },
  requestReserveList(){

  },
  requestContribute(){

  }

});
