'use strict';

arikaim.component.onLoaded(function() {
    safeCall('linksView',function(obj) {
        obj.initRows();
    },false);
});