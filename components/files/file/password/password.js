'use strict';

arikaim.component.onLoaded(function() {
    arikaim.ui.form.addRules("#file_password_form");  
    arikaim.ui.viewPasswordButton('.view-password','#password');

    arikaim.ui.form.onSubmit('#file_password_form',function() {
        var fileName = $('#file_name').val();
        return files.downloadProtetedFile(fileName,'file_password_form',function(result) {
            $('#pasword_panel').hide();
        },function(error) {                      
        });
    })
});