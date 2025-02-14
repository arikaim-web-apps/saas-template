'use strict';

arikaim.component.onLoaded(function() {
    arikaim.ui.preloadImages(function(image) {
        $(image).addClass('opacity-100');
        $(image).parent().find('.image-loader').remove();
    });
});