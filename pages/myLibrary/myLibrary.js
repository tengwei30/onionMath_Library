let TAB_MY_BORROW = 1
let TAB_MY_RESERVE = 2
let TAB_MY_CONTRIBUTE = 3

Page({
  data: {
    myBorrowSeleted: false,
    myReserveSeleted: true,
    myContributeSeleted: false,
    bookList: [
      {
        bookName: "碟形世界:猫和少年魔笛手",
        bookPicUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Dwyane_Wade.jpg/440px-Dwyane_Wade.jpg",
        bookAuthor: "特里·普拉切特",
        state: "已借阅12天"
      },
    ]
  },
  onLoad() {

  },
  seletedTab: function(e) {
    let seletedIndex = e.target.dataset.selected
    this.setData({
      myBorrowSeleted: seletedIndex == TAB_MY_BORROW,
      myReserveSeleted: seletedIndex == TAB_MY_RESERVE,
      myContributeSeleted: seletedIndex == TAB_MY_CONTRIBUTE
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
