'use strict';
arikaim.component.onLoaded(function() {

    arikaim.ui.withComponent('billing-toggle',function(component) {
        component.onChange('selected',function(type) {
            $('.plan-price').each(function() { 
                var price = (type == 'annual') ? $(this).attr('annual-price') : $(this).attr('monthly-price');
                $(this).html(price);              
            });
        
            $('.subscribe-button').each(function() {          
                var url = (type == 'annual') ? $(this).attr('annual-url') : $(this).attr('monthly-url');
                $(this).attr('href',url);
            });

            $('.price-label').each(function() {
                var label = (type == 'annual') ? $(this).attr('annual-label') : $(this).attr('monthly-label');         
                $(this).html(label);              
            });
        });
    });

});
