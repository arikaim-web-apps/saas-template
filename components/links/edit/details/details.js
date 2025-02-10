'use strict';

arikaim.component.onLoaded(function() {
    arikaim.ui.form.onSubmit("#link_form",function() {  
        return linksApi.update('#link_form');
    },function(result) {       
        arikaim.ui.form.showMessage(result.message); 
        arikaim.events.emit('link.update',result.uuid);       
    });
});