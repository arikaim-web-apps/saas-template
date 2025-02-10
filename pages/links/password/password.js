'use strict';

arikaim.component.onLoaded(function(component) {   
    arikaim.ui.form.addRules('#link_unlock_form',{});

    arikaim.ui.form.onSubmit("#link_unlock_form",function() {  
        return linksApi.checkPassword('#link_unlock_form');
    },function(result) {   
        $('#link_unlock_form').remove();
        arikaim.loadUrl(result.url);
        arikaim.page.showLoader('#form_content');
    });
});