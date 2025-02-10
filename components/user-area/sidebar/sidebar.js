'use strict';

arikaim.component.onLoaded(function() {
    arikaim.ui.loadComponentButton('.sidebar-item',function(button) {
        $('.sidebar-item').removeClass('active-menu-item');
        $(button).addClass('active-menu-item');     
    });
});