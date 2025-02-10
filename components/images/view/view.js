/**
 *  Arikaim
 *  @copyright  Copyright (c) Intersoft Ltd <info@arikaim.com>
 *  @license    http://www.arikaim.com/license
 *  http://www.arikaim.com
 */
'use strict';

function ImagesView() {
    var self = this;
    this.messages = null;

    this.init = function() {    
        if (isObject(this.messages) == false) {
            arikaim.component.loadProperties('current>images.messages',function(params) { 
                self.messages = params.messages;
            }); 
        }   
        
        arikaim.ui.subscribe('paginator_page_size','pageSize',function(value) {
            self.loadRows();

            arikaim.page.loadContent({
                id: 'images_paginator',           
                component: 'tailwind~paginator.daisyui',
                params: { 
                    namespace: 'images',
                    button_class: 'btn-sm btn-outline',
                    rows_selector: 'image_items',
                    component: "current>image.view.items"
                }
            });          
        });

        arikaim.events.on('image.upload',function(result) {
            var toast = arikaim.ui.getComponent('toast');
            toast.show(result.message);
        
            self.loadRow(result.uuid,$('#images_menu').attr('mode'));
        },'onImageUpload');
    };

    this.loadRow = function(uuid, mode) {
        arikaim.page.loadContent({
            id: 'images_items', 
            prepend: true,          
            component: 'current>images.view.item',
            params: { 
                uuid: uuid,
                mode: mode
            }
        },function() {
            self.initRows();
        });
    };

    this.loadRows = function() {
        arikaim.page.loadContent({
            id: 'images_items',           
            component: 'current>images.view.items',
            params: {                
            }
        },function() {
            self.initRows();
        });
    }

    this.loadEmpty = function() {
        arikaim.page.loadContent({
            id: 'images_items',           
            component: 'current>images.view.empty'
        });
    }

    this.initRows = function() {   
        arikaim.ui.button('.select-image',function(element) {  
            var mode = $('#images_items').attr('mode');
            if (mode != 'select') {
                return;
            }

            arikaim.events.emit(
                'image.select',
                $(element).attr('uuid'),
                $(element).attr('fieldId')
            );

            $('.select-image').removeClass('border-green-600').addClass('border-gray-300');
            $(element).addClass('border-green-600').removeClass('border-gray-300');     
        });

        arikaim.ui.button('.delete-image',function(element) {                     
            var uuid = $(element).attr('uuid');
            var confirmDelete = arikaim.ui.getComponent('confirm_delete_image');
            var toast = arikaim.ui.getComponent('toast');
        
            confirmDelete.open(function() { 
                imageApi.delete(uuid,function(result) {
                    toast.show(result.message);
                    arikaim.ui.table.removeRow('#row_' + result.uuid,null,function() {
                        self.loadEmpty();                       
                    }); 
                },function(error) {
                    toast.show(error);
                });
            });                  
        });
    };
}

var imagesView = new ImagesView();

arikaim.component.onLoaded(function() {
    imagesView.init();
    imagesView.initRows();
});