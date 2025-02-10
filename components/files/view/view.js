/**
 *  Arikaim
 *  @copyright  Copyright (c) Intersoft Ltd <info@arikaim.com>
 *  @license    http://www.arikaim.com/license
 *  http://www.arikaim.com
 */
'use strict';

function FilesView() {
    var self = this;
    this.messages = null;

    this.init = function() {  
        if (isObject(this.messages) == false) {
            arikaim.component.loadProperties('current>files.messages',function(params) { 
                self.messages = params.messages;
            }); 
        }
        
        breadcrumb.init({
            onSelect: function(path) {  
                filesView.openDirectory(path);            
            },
            separatorClass: 'p-2',
            pathItemClass: 'p-2 cursor-pointer text-gray-800 hover:text-red-500 transition duration-1000 ease-in-out'
        });

        arikaim.ui.subscribe('view_type','view-type',function(value) {
            var path = breadcrumb.getCurrentPath();   
            self.openDirectory(path);       
        });

        arikaim.ui.subscribe('paginator_page_size','pageSize',function(value) {
            self.loadRows();

            arikaim.page.loadContent({
                id: 'paginator',           
                component: 'tailwind~paginator.daisyui',
                params: { 
                    namespace: 'myfiles',
                    button_class: 'btn-sm btn-outline',
                    rows_selector: 'files_items',
                    component: "current>files.view.items"
                }
            });          
        });

        $('.filesystem-dropdown').dropdown({
            onChange: function(value) {               
                filesView.openDirectory('',value);               
            }
        });

        arikaim.ui.button('.upload-file',function(element) {  
            var path = breadcrumb.getCurrentPath();
            var driverName = '';//$('#filesystem_dropdown').dropdown('get value');

            arikaim.page.loadContent({
                id: 'file_details',           
                component: 'current>files.upload',
                params: { 
                    path: path, 
                    filesystem: driverName
                }
            });           
        });

        arikaim.ui.button('.create-directory',function(element) {         
            var path = breadcrumb.getCurrentPath();
            var driverName = '';//$('#filesystem_dropdown').dropdown('get value');

            arikaim.page.loadContent({
                id: 'file_details',           
                component: 'current>files.directory.create',
                params: { 
                    path: path, 
                    filesystem: driverName 
                }
            });            
        });     
    };

    this.loadRows = function() {
        arikaim.page.loadContent({
            id: 'files_items',           
            component: 'current>files.view.items',
            params: {                
            }
        },function() {
            self.initRows();
        });
    }

    this.loadEmpty = function() {
        return arikaim.page.loadContent({
            id: 'view_content',           
            component: 'current>files.view.items.empty'
        });
    };

    this.openDirectory = function(path, driverName) {           
        breadcrumb.setPath(path);     
        arikaim.ui.setButtonGroupInactive('.files-buttons'); 
       
        return arikaim.page.loadContent({
            id: 'files_items',           
            component: 'current>files.view.items',
            params: { 
                path: path,
                driver_name: driverName            
            }
        },function(result) {         
            self.initRows();
        }); 
    };

    this.initRows = function() {   
        
        arikaim.ui.loadComponentButton('.file-action');

        $('.preview-image').off();
        $('.preview-image').on('load',function() {
            var uuid = $(this).attr('uuid');
            $('#image_loader_' + uuid).remove();
        });

        arikaim.ui.button('.preview-file',function(element) {
            var previewModal = arikaim.ui.getComponent('preview_file');         
            previewModal.setContent('');

            var uuid = $(element).attr('uuid');
           
            arikaim.page.loadContent({
                id: 'preview_file_content',           
                component: 'current>files.file.preview',
                params: { 
                    uuid: uuid
                }
            },function(result) {                    
                previewModal.open(function() {                        
                    $('#preview_file_content').html('');
                });
            });                                 
        });

        arikaim.ui.button('.move-trash-file',function(element) {
            var path = $(element).attr('path');
            var fileName = $(element).attr('name');
            var confirmModal = arikaim.ui.getComponent('confirm_delete_file');  
            var toast = arikaim.ui.getComponent('toast');

            confirmModal.open(function() {         
                files.moveToTrash(path,fileName,null,function(result) {
                    toast.show(result.message);
                    arikaim.ui.table.removeRow('#row_' + result.uuid,null,function() {
                        self.loadEmpty();
                    });                  
                },function(error) {
                    toast.show(error);                   
                });
            });
          
        });

        arikaim.ui.button('.delete-file',function(element) {
            var path = $(element).attr('path');
            var fileName = $(element).attr('name');
            var filesystem = '';//$('#filesystem_dropdown').dropdown('get value');
            var confirmModal = arikaim.ui.getComponent('confirm_delete_file');  
            var toast = arikaim.ui.getComponent('toast');

            confirmModal.open(function() {       
                files.delete(path,fileName,filesystem,null,function(result) {
                    toast.show(result.message);
                    arikaim.ui.table.removeRow('#row_' + result.uuid,null,function() {
                        self.loadEmpty();
                    });                   
                },function(error) {
                    toast.show(error);
                });
            });        
        });

        arikaim.ui.button('.delete-directory',function(element) {
            var path = $(element).attr('path');    
            var filesystem = '';//$('#filesystem_dropdown').dropdown('get value');         
            var toast = arikaim.ui.getComponent('toast');
            var confirmModal = arikaim.ui.getComponent('confirm_delete_file');
              
            confirmModal.open(function() {                 
                files.deleteDirectory(path,filesystem,function(result) {
                    arikaim.ui.table.removeRow('#row_'+ result.uuid);
                    toast.show(result.message);
                   
                },function(error) {
                    toast.show(error);
                });
            });        
        });

        arikaim.ui.button('.share-file',function(element) {
            var uuid = $(element).attr('uuid');
            var path = $(element).attr('path');
            var driverName = '';//$('#filesystem_dropdown').dropdown('get value');
           
            return arikaim.page.loadContent({
                id: 'file_details',           
                component: 'current>files.share',
                params: { 
                    uuid: uuid,
                    filesystem: driverName,
                    path: path 
                }
            });  
        });
        
        arikaim.ui.button('.open-directory',function(element) {
            var path = $(element).attr('path');
           
            return self.openDirectory(path);                    
        });   
        
        arikaim.ui.button('.file-details',function(element) {
            var uuid = $(element).attr('uuid');  
            
            return arikaim.page.loadContent({
                id: 'file_details',           
                component: 'current>files.file.details',
                hideLoader: true,
                params: { 
                    uuid: uuid                  
                }
            });                             
        });

        arikaim.ui.button('.file-qrcode',function(element) {
            var uuid = $(element).attr('uuid');  
          
            return arikaim.page.loadContent({
                id: 'file_details',           
                component: 'current>files.file.qrcode',
                hideLoader: true,
                params: { 
                    uuid: uuid                  
                }
            });                             
        });
    };
}

var filesView = new FilesView();

arikaim.component.onLoaded(function() {
    filesView.init();
    filesView.initRows();
});