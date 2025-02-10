'use strict';

arikaim.component.onLoaded(function() {
    arikaim.ui.button('.cancel-button',function() {
        return arikaim.page.loadContent({
            id : 'token_content',
            component: 'current>api.token.details'
        });
    });

    arikaim.ui.form.addRules('#token_form');
});