'use strict';

arikaim.component.onLoaded(function() {
    arikaim.ui.form.addRules('#qucode_create_form',{});   
    
    $('.encryption-dropdown').dropdown({
        onChange: function(value) {            
        }
    });
});