'use strict';

arikaim.component.onLoaded(function() { 
    arikaim.ui.button('.create-token',function(element) {

        return arikaim.page.loadContent({
            id : 'token_content',
            component: 'current>api.token.form'
        },function(result) {
            arikaim.ui.form.onSubmit('#token_form',function() {        
                return apiTokens.create('#token_form');
            },function(result) {   
                return arikaim.page.loadContent({
                    id : 'token_content',
                    component: 'current>api.token.details'
                });
            },function(errors) {
                console.log('error');
            });
        });

    });   

    arikaim.ui.button('.delete-token',function(element) {
        var uuid = $(element).attr('uuid');

        arikaim.ui.withComponent('confirm_delete_token',function(component) {
            component.open(function() {
                apiTokens.delete(uuid,function(result) {
                    return arikaim.page.loadContent({
                        id : 'token_content',
                        component: 'current>api.token.details'
                    });
                },function(error) {
                    console.log('error');
                });
            });           
        });   
    });
});