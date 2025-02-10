'use strict';

arikaim.component.onLoaded(function() {  

    $('#template_select').off();
    $('#template_select').on('change',function(event) {
        var selected = $(this).val();
      
        arikaim.ui.loadComponent({
            mountTo: 'content_editor',           
            component: 'current>qrcode.create.template.form.content',
            params: { 
                uuid: selected                           
            }
        });
    });

    arikaim.ui.form.addRules("#qrcode_create_form");

    arikaim.ui.form.onSubmit("#qrcode_create_form",function() {  
        return qrcodeApi.createFromTemplate('#qrcode_create_form');
    },function(result) {       
        arikaim.ui.form.showMessage(result.message);   
        arikaim.ui.form.clear("#qrcode_create_form");
    });
});