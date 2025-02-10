'use strict';

arikaim.component.onLoaded(function() {
    var activeClass = $('#type_buttons').attr('active-class');

    arikaim.ui.button('.content-type-card',function(element) {   
        var componentName = $(element).attr('component');
        $('.content-type-card').removeClass(activeClass);
        $(element).addClass(activeClass);
        
        $('#error_message').html('');
        arikaim.page.loadContent({
            id: 'qrcode_content_type',
            component: componentName
        });   
    });   
});