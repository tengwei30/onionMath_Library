
require('./config$');
require('./importScripts$');
function success() {
require('../..//app');
require('../../pages/index/index');
require('../../pages/bookReview/bookReview');
require('../../pages/bookdetail/index');
require('../../pages/scanResult/scanResult');
require('../../pages/typeInManual/typeInManual');
require('../../pages/reserveSuccess/reserveSuccess');
require('../../pages/myLibrary/myLibrary');
require('../../pages/typeInSuccess/typeInSuccess');
require('../../pages/borrowSuccess/borrowSuccess');
require('../../pages/onionBooks/onionBooks');
require('../../pages/returnbook/returnbook');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
