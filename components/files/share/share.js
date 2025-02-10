'use strict';

arikaim.component.onLoaded(function() {
    $('.file-button').removeClass('active');
    $('.file-button').attr('active','false');

    $('.files-dropdown').on('change',function(element) {
        var selected = $(this).dropdown('get value');    
        if (isEmpty(selected) == true) {
            $('#form_content').html("");
        } else {
            arikaim.page.loadContent({
                id: 'form_content',
                component: 'current>files.share.access',
                params: { uuid: selected }
            },function(result) {              
            });  
        }            
    });   
});