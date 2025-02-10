'use strict';

arikaim.component.onLoaded(function() {

    arikaim.ui.subscribe('file_public','value',function(value) {
        var uuid = $('#file_uuid').val();         
        if (value == 1) {
            files.setPublic(uuid,1,null,function(result) {
                var toast = arikaim.ui.getComponent('toast');
                toast.show(result.message); 
                $('#password_content').hide();        
            });
        } else {
            files.setPublic(uuid,0,null,function(result) {
                var toast = arikaim.ui.getComponent('toast');
                toast.show(result.message);    
                $('#password_content').show();              
            });
        }
    });
    
});