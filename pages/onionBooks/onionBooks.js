Page({
  data: {
    isActive: '0'
  },
  onLoad() {},
  tabClick (ev) { // tab 切换
    const { type } = ev.target.dataset
    if (type === 'hot') {
      this.setData({
        isActive: '0'
      })
    }
    if (type === 'new') {
      this.setData({
        isActive: '1'
      })
    }
  }
});
