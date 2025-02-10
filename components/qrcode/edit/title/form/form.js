'use strict';

arikaim.component.onLoaded(function(component) {  
    var formId = '#' + component.getId();
    var title = $(formId).find('#title');
    var uuid = $('#uuid').val();

    arikaim.ui.form.onSubmit(formId,function() {  
        return qrcodeApi.updateTitle(formId);
    },function(result) {       
        arikaim.ui.form.showMessage({
            selector: formId,
            message: result.message
        });    
        $('#title_' + result.uuid).html($(title).val());
        
        qrcodeView.loadDetails(uuid);
    });
});