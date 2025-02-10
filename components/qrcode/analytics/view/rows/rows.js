'use strict';

arikaim.component.onLoaded(function() {
    safeCall('qrcodeAnalyticsView',function(obj) {
        obj.initRows();
    },true);    
});