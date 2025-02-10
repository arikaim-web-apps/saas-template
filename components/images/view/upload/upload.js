'use strict';

arikaim.component.onLoaded(function() {
    arikaim.ui.button('.upload-image',function() {
        $('.qrcode-images-tab').click();
    }); 
});