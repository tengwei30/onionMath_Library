Page({
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  onReady() {
    // 页面加载完成
  },
  gotoScan (ev) {
    console.log(ev)
    dd.scan({
      type: 'qr',
      success: (res) => {
        console.log('res', res)
        dd.alert({ title: res.code });
      },
    })
  },
  gotoBooks (ev) {  // 跳转到图书库
    dd.navigateTo({
      url: '/pages/onionBooks/onionBooks'
    })
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: '洋葱图书馆',
      desc: '洋葱图书馆',
      path: 'pages/index/index',
    };
  },
});
