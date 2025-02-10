'use strict';

arikaim.component.onLoaded(function() {  
    $('#actions_dropdown').dropdown({
        onChange: function(value) {                
            var selected = [];
            $('.selected-items:checkbox:checked').each(function(key,value) {            
                selected.push($(value).val());             
            });
        
            switch (value) {
                case 'select':                  
                    $('.selected-items').prop('checked',true);
                    break;
                case 'unselect':                  
                    $('.selected-items').prop('checked',false);
                    break;
                case 'share': {                         
                }                                            
                case 'delete': {
                    var confirmModal = arikaim.ui.getComponent('confirm_delete_file');  
                    var toast = arikaim.ui.getComponent('toast');

                    confirmModal.open(function() {     
                        files.moveToTrash(null,null,selected,function(result) {
                            toast.show(result.message);
                            selected.forEach(function(value) {
                                $('#row_' + value).remove();
                            });
                        },function(error) {
                            toast.show(error);                         
                        });
                    });
                    break;
                }
            }
        }
    });
}); 