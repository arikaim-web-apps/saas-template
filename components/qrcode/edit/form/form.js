'use strict';

arikaim.component.onLoaded(function(component) {
    var formId = '#' + component.getId();
    var uuid = $('#uuid').val();
    
    arikaim.ui.form.onSubmit(formId,function() {  
        return qrcodeApi.update(formId);
    },function(result) {       
        arikaim.ui.form.showMessage({
            selector: formId,
            message: result.message
        });     
        
        qrcodeView.loadDetails(uuid);
    });
});