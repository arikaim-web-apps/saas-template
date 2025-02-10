'use strict';

arikaim.component.onLoaded(function() {
    arikaim.ui.form.addRules('#qucode_create_form',{});   
    
    $('.country-dropdown').dropdown({
        onChange: function(value) {
            $('#country_code_value').html('+' + value);
        }
    });
});