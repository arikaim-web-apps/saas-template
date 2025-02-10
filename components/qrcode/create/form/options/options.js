'use strict';

arikaim.component.onLoaded(function() {
    function setOptionsDefault() {
        $('.image-type').dropdown('set selected','png');
        $('.version-dropdown').dropdown('set selected',-1);
        $('.precision-dropdown').dropdown('set selected','M');
    };

    $('.default-options-button').on('click',function() {
        setOptionsDefault();
        qrcodeGenerator.preview();
    });
    
    $('.qrcode-option-dropdown').dropdown({
        onChange: function() {
            qrcodeGenerator.preview();
        }
    });
});