'use strict';

arikaim.component.onLoaded(function() {
    arikaim.ui.viewPasswordButton('.view-password');
    arikaim.ui.form.addRules("#user_details_form"); 

    arikaim.ui.form.onSubmit('#user_details_form',function() {
        return users.changeDetails('#user_details_form');
     },function(result) {        
         arikaim.ui.form.showMessage({           
             message: result.message
         });
     });
});