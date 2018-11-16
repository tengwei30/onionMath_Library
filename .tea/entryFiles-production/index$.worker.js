
require('./config$');
require('./importScripts$');
function success() {
require('../..//app');
require('../../pages/index/index');
require('../../pages/bookReview/bookReview');
require('../../pages/bookdetail/index');
require('../../pages/scanResult/scanResult');
require('../../pages/typeInManual/typeInManual');
require('../../pages/typeInSuccess/typeInSuccess');
require('../../pages/borrowSuccess/borrowSuccess');
require('../../pages/onionBooks/onionBooks');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
