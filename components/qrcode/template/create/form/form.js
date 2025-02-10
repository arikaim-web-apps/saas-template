'use strict';

arikaim.component.onLoaded(function(component) {  
    var formId = '#' + component.getId();

    arikaim.ui.form.addRules(formId);

    arikaim.ui.form.onSubmit(formId,function() {  
        return qrcodeTemplateApi.add(formId);
    },function(result) {       
        arikaim.ui.form.showMessage(result.message);   
        arikaim.ui.form.clear(formId);
    });
});