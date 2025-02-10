'use strict';

arikaim.component.onLoaded(function() {
    arikaim.ui.form.addRules('#qucode_create_form',{});   
    
    arikaim.ui.button('.twitter-link-type',function(element)  {
        var type = $(element).val();
        if (type == 'link') {
            $('#username_field').show();
            $('#username').attr('rule','empty');
            $('#text_field').hide();
            $('#text').removeAttr('rule');
            arikaim.ui.form.addRules('#qucode_create_form',{});   
        } else {
            $('#username_field').hide();
            $('#text').attr('rule','empty');
            $('#username').removeAttr('rule');
            $('#text_field').show();
            arikaim.ui.form.addRules('#qucode_create_form',{});   
        }
    });
});