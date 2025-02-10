'use strict';

arikaim.component.onLoaded(function() {
    hljs.highlightAll(); 
    
    arikaim.ui.loadComponentButton('.example-tab',function(button) {
        $('.example-tab').removeClass('bg-blue-100');
        $(button).addClass('bg-blue-100');
    });
});