'use strict';

arikaim.component.onLoaded(function() {
  
    arikaim.ui.button('.send-confirm-email',function(button) {
        var token = $(button).attr('token');

        return users.sendConfirmEmail(token,function(result) {
            arikaim.page.loadContent({
                id: 'content_box',
                component: 'current>users.message',
                params: {
                    message: 'send',
                    title: 'success',
                    hide_login: true                   
                }
            });
        },function(error) {
            console.log(error);
        });
    });

});