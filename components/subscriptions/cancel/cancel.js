'use strict';

arikaim.component.onLoaded(function(component) {

    arikaim.ui.button('.confirm-cancel-subscription',function(element) {
        subscriptionsApi.cancel(function(result) {
            $('#message').hide();
            $('#confirm_button').hide();
            $('#success_message').show();
        },function(error) {
            console.log(error);
        });
    });
    
});