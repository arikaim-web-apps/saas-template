'use strict';

arikaim.component.onLoaded(function() { 
    arikaim.ui.subscribe('preview_content_toggle','checked',function(checked) {  
        var uuid = $('#preview_content').attr('uuid');
        
        if (checked == true) {
            arikaim.ui.loadComponent({
                mountTo: 'preview_content',           
                component: 'current>content',
                params: { 
                    uuid: uuid
                }
            });   
        }
    });   
});