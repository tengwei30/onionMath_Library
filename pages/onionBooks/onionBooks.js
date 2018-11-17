import config from '../../config/index.js';
import { ddPromise } from '../../config/utils.js';

Page({
  data: {
    isActive: '0',
    datalists: [],
    userInfo: {}
  },
  onLoad() {
    this.getAllbooks()
  },
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
  },
  getAllbooks () {
    ddPromise(dd.httpRequest)({
      url: `${config.domain.common}/book/use/books`,
      method: 'GET',
    }).then(res => {
      console.log(res)
      this.setData({
        datalists: res.data
      })
    }).catch(err => {
      console.error('error ----> ', err)
    })
  },
  toBookDetial:function(e) {
    console.log(e.target.dataset.onionId)
    dd.navigateTo({
      url: `/pages/scanResult/scanResult?onionId=${e.target.dataset.onionId}`
    })
  }
});
