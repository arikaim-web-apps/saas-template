'use strict';

arikaim.component.onLoaded(function() {

    $('#url').focus();

    arikaim.ui.form.onSubmit("#link_form",function() { 
        return linksApi.add('#link_form');
    },function(result) {              
        arikaim.ui.form.showMessage(result.message);   
        arikaim.ui.form.clear('#link_form');
        arikaim.events.emit('link.create',result.uuid);    
        $('#details_panel').html('');    
    });   
});