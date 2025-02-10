'use strict';

arikaim.component.onLoaded(function() {
    arikaim.ui.form.addRules('#reset_password_form',{});
 
    arikaim.ui.form.onSubmit('#reset_password_form',function() {   
        return users.resetPassword('#reset_password_form');
    },function(result) {     
        arikaim.page.loadContent({
            id: 'content_box',
            component: 'current>users.message',
            params: {
                message: 'password',
                title: 'success',
                email: result.email
            }
        });
    });
});