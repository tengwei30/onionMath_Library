let TAB_MY_BORROW = 1
let TAB_MY_RESERVE = 2
let TAB_MY_CONTRIBUTE = 3

Page({
  data: {
    myBorrowSeleted: false,
    myReserveSeleted: true,
    myContributeSeleted: false
  },
  onLoad() {

  },
  seletedTab: function(e) {
    console.log(e)
    console.log(e.detail.target.dataset.seleted)
  }
});
