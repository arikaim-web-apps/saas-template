/**
 *  Arikaim
 *  @copyright  Copyright (c) Intersoft Ltd <info@arikaim.com>
 *  @license    http://www.arikaim.com/license
 *  http://www.arikaim.com
*/
'use strict';

function QrCodeGenerator() {   
    var self = this;
    
    this.svgToData = function(svg) {
        var el = (isObject(svg) == false) ? document.getElementById(svg) : svg;
        if (isEmpty(el) == true) {
            return null;
        }
        try {
            var serializer = new XMLSerializer();
        } catch (error) {
            return null;
        }
        var svgXML = serializer.serializeToString(el);

        return "data:image/svg+xml," + encodeURIComponent(svgXML);
    }

    this.preview = function() {
        self.generateQrCode(false);
    };

    this.generateQrCode = function(save) {
        var toast = arikaim.ui.getComponent('toast');
        $('#save_field').val(save);
        
        if (arikaim.ui.form.validate('#qucode_create_form') == false) {
            arikaim.ui.form.showValidationErrors('#qucode_create_form');
            return true;
        }
       
        return qrcodeApi.generate('#qucode_create_form',function(result) {                   
            var imageData = result.image;        
            if (save == true) {
                toast.show(result.message);
                arikaim.events.emit('qrcode.create',result.uuid,'qrCodeGenerate');
            }       
    
            if (result.image_type == 'svg') {
                // SVG image                             
                $('#svg_image').html(result.image);
                var img = $('#svg_image').children();

                imageData = self.svgToData($(img).get(0));
                $('#qrcode_image').hide();   
                $('#qrcode_image').attr('src','');   
            } else {    
                $('#svg_image').html('');                                     
                $('#qrcode_image').attr('src',result.image);   
                $('#qrcode_image').show();                                                                                                                 
            }   

            $('#qrcode_download').attr('href',imageData);  
            $('#qrcode_download').attr('download',result.image_file_name);   
            $('.download-content').removeClass('invisible');          
        });
    };

    this.initGenerateButton = function() {
        arikaim.ui.button('.preview-button',function(element) {    
            self.generateQrCode(false);
        });

        arikaim.ui.button('.generate-button',function(element) {    
            self.generateQrCode(true);
        });
    };
}

var qrcodeGenerator = new QrCodeGenerator();

function openQrCodeGeneratorTabItem(button) {
    $('.create-type-tab').removeClass('bg-stone-50 border border-stone-200 rounded-t-lg');
    $(button).addClass('bg-stone-50 border border-stone-200 rounded-t-lg');
}

arikaim.component.onLoaded(function() {
    arikaim.ui.loadComponentButton('.create-type-tab',function(button) {
        openQrCodeGeneratorTabItem(button);
    });

    arikaim.ui.loadComponentButton('.qrcode-images-tab',function(button) {
        openQrCodeGeneratorTabItem(button);
    });

    arikaim.events.on('image.select',function(uuid, fieldId) {
        if (isEmpty(fieldId) == true) {
            fieldId = 'logo_image';
        }
        
        $('#' + fieldId).val(uuid);
        qrcodeGenerator.preview();
    },'onQrCodeLogoSelected');
});