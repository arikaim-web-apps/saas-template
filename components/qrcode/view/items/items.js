'use strict';

arikaim.component.onLoaded(function() {
    safeCall('qrcodeView',function(obj) {
        obj.initRows();
    },false);
});