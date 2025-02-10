'use strict';

arikaim.component.onLoaded(function() {
    arikaim.ui.form.addRules("#change_password_form");
    arikaim.ui.viewPasswordButton('.view-password');
    
    arikaim.ui.form.onSubmit('#change_password_form',function() {    
       return users.changePassword('#change_password_form');
    },function(result) {
        arikaim.page.loadContent({
            id: 'content_box',
            component: 'current>users.message',
            params: {
                message: 'password_changed',
                title: 'success'
            }
        });
    });
});