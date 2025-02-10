/**
 *  Arikaim  
 *  @copyright  Copyright (c) Intersoft Ltd <info@arikaim.com>
 *  @license    http://www.arikaim.com/license
 *  http://www.arikaim.com
 */
'use strict';

function TrashView() {
    var self = this;  
    this.mesages = null;

    this.init = function() {
        if (isObject(this.mesages) == false) {
            arikaim.component.loadProperties('current>files.messages',function(params) { 
                self.messages = params.messages;
            });
        }
      
        breadcrumb.init({
            onSelect: function(path) {
                self.loadTrashItems(path);                
            },
            separatorClass: 'p-2',
            pathItemClass: 'p-2 cursor-pointer text-gray-800 hover:text-red-500 transition duration-1000 ease-in-out'           
        });

        arikaim.ui.button('.empty-trash',function(element) {       
            var confirmModal = arikaim.ui.getComponent('confirm_empty_bin');

            return confirmModal.open(function() {         
                files.emtyTrash(function(result) {
                    self.loadTrashItems('');       
                });
            });               
        });
    
        arikaim.ui.button('.restore-trash',function(element) {   
            var toast = arikaim.ui.getComponent('toast');

            files.restoreTrash(function(result) {
                $('.trash-button').addClass('disabled');
                self.loadEmpty();
                toast.show(result.message);

                return self.loadTrashItems('');       
            },function(error) {
                toast.show(error);            
            });
        });
    };

    this.loadEmpty = function() {
        return arikaim.page.loadContent({
            id: 'trash_items',           
            component: 'current>files.view.items.empty'
        });
    };

    this.initRows = function() { 
        arikaim.ui.button('.restore-file',function(element) {   
            var path = $(element).attr('path');
            var uuid = $(element).attr('uuid');
            var toast = arikaim.ui.getComponent('toast');

            files.restore(path,function(result) {
                arikaim.ui.table.removeRow('#row_' + uuid,null,function(element) {
                    $('.trash-button').addClass('disabled');
                    self.loadEmpty();
                });
                toast.show(result.message);                   
            },function(error) {
                toast.show(error);                   
            });
        });
        
        arikaim.ui.button('.open-directory',function(element) {
            var path = $(element).attr('path');
            breadcrumb.setPath(path);
            return self.loadTrashItems(path);               
        }); 
    };

    this.loadTrashItems = function(path,viewType) {
        return arikaim.page.loadContent({
            id: 'trash_items',           
            component: 'current>files.trash.rows',
            params: { 
                path: path,                  
                view_type: viewType                
            }
        });
    };
}

var trashView = new TrashView();

arikaim.component.onLoaded(function() {
    trashView.init();
});
