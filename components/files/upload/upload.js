'use strict';

arikaim.component.onLoaded(function() {
    
    var fileUpload = new FileUpload('#file_form',{
        url: '/api/storage/upload',
        maxFiles: 1,
        allowMultiple: true,
        acceptedFileTypes: [],
        formFields: {            
            note: '#note',
            filesystem: '#filesystem',
            path: '#path'
        },
        onStart: function(file) {
            if (isEmpty(breadcrumb) == false) {           
                $('#path').val(breadcrumb.getCurrentPath());
            }          
        },
        onSuccess: function(result) {
            var toast = arikaim.ui.getComponent('toast');
            toast.show(result.message);
            
            arikaim.ui.form.clear('#file_form');          
            fileUpload.reset();
            
            filesView.openDirectory(result.path);                  
        },
        onError: function(result) {          
            arikaim.ui.form.showErrors(result);
        }
    });   
});