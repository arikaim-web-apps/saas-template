'use strict';

arikaim.component.onLoaded(function() {
    arikaim.ui.subscribe('analytics_toggle','value',function(value) {
        var uuid = $('#analytics_content').attr('uuid');
      
        qrcodeApi.setAnalytics(uuid,value,function(result) {            
            if (value == false) {
                $('#analytics_content').html(' ');
            } else {
                arikaim.ui.loadComponent({
                    mountTo: 'analytics_content',
                    name: 'current>qrcode.analytics.content',
                    params: {
                        uuid: uuid
                    }
                })
            }
        });

    })
});