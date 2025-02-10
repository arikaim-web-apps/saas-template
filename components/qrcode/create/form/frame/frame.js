'use strict';

arikaim.component.onLoaded(function() {

    arikaim.ui.subscribe('frame-color','selected',function(value) {      
        qrcodeGenerator.preview();
    });
   
    arikaim.ui.subscribe('frame-text-color','selected',function(value) {
        qrcodeGenerator.preview();
    });

    arikaim.ui.button('.select-frame-image',function(element) {
        var type = $(element).attr('type');     
        if (isEmpty(type) == false) {
            arikaim.ui.withComponent('transparent_toggle',function(component) {
                component.setUnchecked();
            });           
        }

        $('#frame_type').val(type);
        
        $('.select-frame-image').removeClass('border-green-600').addClass('border-gray-300');
        $(element).addClass('border-green-600').removeClass('border-gray-300');    
        
        qrcodeGenerator.preview();
    });
});