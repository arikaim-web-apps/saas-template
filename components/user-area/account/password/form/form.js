'use strict';

arikaim.component.onLoaded(function() {
    arikaim.ui.viewPasswordButton('.view-password');

    arikaim.ui.form.addRules("#change_password_form");
    
    arikaim.ui.form.onSubmit('#change_password_form',function() {    
       return users.changeProfilePassword('#change_password_form');
    },function(result) {
        arikaim.ui.form.showMessage(result.message);
    });
});