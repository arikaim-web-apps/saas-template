/**
 *  Arikaim
 *  @copyright  Copyright (c) Intersoft Ltd <info@arikaim.com>
 *  @license    http://www.arikaim.com/license
 *  http://www.arikaim.com
*/
'use strict';

function QrcodeAnalyticsView() {   
    var self = this;

    this.init = function() {        
        var qrcodeId = $('#analytics_views_rows').attr('qrcode-id');

        console.log(qrcodeId);
        
        paginator.init('analytics_views_rows',{
            name: 'current>qrcode.analytics.view.rows',
            params: { qrcode_id: qrcodeId }
        },'qrcode.views');
    };

    this.loadRows = function(qrcodeId) {
        arikaim.page.loadContent({
            id: 'analytics_views_rows',
            component: 'current>qrcode.analytics.view.rows',
            params: { qrcode_id: qrcodeId }
        },function(result) {
            paginator.reload();
        }); 
    };

    this.initRows = function() {    
        arikaim.ui.button('.map-button',function(element) {
            var uuid = $(element).attr('uuid');
            $('#qrcode_details_content').show();

            arikaim.page.loadContent({
                id: 'qrcode_details_content',     
                params: { uuid: uuid },    
                component: 'qrcode::admin.analytics.map'
            });
        });
    };
}

var qrcodeAnalyticsView = new QrcodeAnalyticsView();

arikaim.component.onLoaded(function() {
    qrcodeAnalyticsView.init();   
    qrcodeAnalyticsView.initRows();
});