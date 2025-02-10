'use strict';

arikaim.component.onLoaded(function() {
    arikaim.ui.loadComponentButton('.files-tab',function(button) {
        $('.files-tab').removeClass('active-button');
        $(button).addClass('active-button');
    });
});