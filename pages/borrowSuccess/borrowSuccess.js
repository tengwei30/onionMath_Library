import config from '../../config/index.js';
import { ddPromise } from '../../config/utils.js';

Page({
  data: {
    coverImg: '',
    count: '',
    canBorrow: true
  },
  onLoad(options) {
    const { userId, onionId } = options
    ddPromise(dd.httpRequest)({
      url: `${config.domain.common}/book/borrow`,
      method: 'POST',
      data: {
        userId,
        onionId
      }
    }).then(res => {
      if (res.data.canBorrow) {
        this.setData({
          coverImg: res.data.coverImg,
          count: res.data.history.length
        })
      } else {
        this.setData({
          coverImg: res.data.coverImg,
          canBorrow: false
        })
      }
    })
  }
});
