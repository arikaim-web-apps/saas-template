'use strict';

arikaim.component.onLoaded(function() {
    arikaim.ui.button('.shape-select',function(button) {
        var radius = $(button).attr('radius');
        $('#circleRadius').val(radius);

        $('.shape-select').removeClass('border-green-600').addClass('border-stone-300');
        $(button).addClass('border-green-600').removeClass('border-stone-300');   

        qrcodeGenerator.preview();
    });
});