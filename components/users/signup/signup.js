'use strict';

arikaim.component.onLoaded(function() {
    arikaim.ui.form.addRules("#signup_form"); 
    arikaim.ui.viewPasswordButton('.view-password');
    
    arikaim.ui.form.onSubmit('#signup_form',function() {
        return users.signup('#signup_form');
    },function(result) {          
        if (isEmpty(result.redirect_url) == false) {
            arikaim.loadUrl(result.redirect_url);
        } else {           
            arikaim.page.loadContent({
                id: 'content_box',
                component: 'current>users.message',
                params: {
                    message: 'signup',
                    email_send: result.email_send
                }
            });  
        }  
    });
});