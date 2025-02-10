'use strict';

arikaim.component.onLoaded(function(component) {   
    arikaim.ui.form.addRules('#link_password_form',{});

    arikaim.ui.form.onSubmit("#link_password_form",function() {  
        return linksApi.saveOptions('#link_password_form');
    },function(result) {       
        arikaim.ui.form.showMessage(result.message); 
        arikaim.events.emit('link.update',result.uuid);       
    });
});