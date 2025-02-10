'use strict';

arikaim.component.onLoaded(function(component) {

    arikaim.ui.button('.cancel-subscription',function(element) {
        arikaim.ui.loadComponent({
            mountTo: 'subscripiption_details',
            name: 'current>subscriptions.cancel'
        });
    });
    
});