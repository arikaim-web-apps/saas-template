/**
 *  Arikaim
 *  @copyright  Copyright (c) Intersoft Ltd <info@arikaim.com>
 *  @license    http://www.arikaim.com/license
 *  http://www.arikaim.com
 */
'use strict';

function QrCodeView() {
    var self = this;
    this.messages = null;

    this.init = function() {   
        if (isObject(this.messages) == false) {
            arikaim.component.loadProperties('current>qrcode.messages',function(params) { 
                self.messages = params.messages;
            }); 
        }   
        
        arikaim.ui.subscribe('search_qrcode','action',function(value) {
            if (value == 'search') {
                arikaim.ui.withComponent('qrcode_paginator',function(component) {
                    component.load(1,function() {                      
                        component.reload();
                    });
                });
            }
        });

        arikaim.events.on('paginator.load.items',function(page) {
            self.initRows();
        },'qrcodePaginatorItems');


        arikaim.ui.subscribe('paginator_page_size','pageSize',function(value) {
            self.loadRows();

            arikaim.page.loadContent({
                id: 'paginator',           
                component: 'tailwind~paginator.daisyui',
                params: { 
                    namespace: 'qrtags',
                    button_class: 'btn-sm btn-outline',
                    rows_selector: 'qrcode_items',
                    component: "current>qrcode.view.items"
                }
            });          
        });

        arikaim.events.on('qrcode.create',function(uuid) {
            $('#empty_row').remove();
            self.loadRow(uuid);
        },'onQrCodeCreate');

        this.initRows();
    };

    this.loadRow = function(uuid) {
        arikaim.page.loadContent({
            id: 'qrcode_items', 
            prepend: true,          
            component: 'current>qrcode.view.item',
            params: { uuid: uuid }
        },function() {
            self.initRows();
        });
    };

    this.loadRows = function() {
        arikaim.page.loadContent({
            id: 'qrcode_items',           
            component: 'current>qrcode.view.items',
            params: {                
            }
        },function() {
            self.initRows();
        });
    }

    this.loadEmpty = function() {
        arikaim.page.loadContent({
            id: 'qrcode_items',           
            component: 'current>qrcode.view.empty'
        });
    }

    this.loadDetails = function(uuid) {
        arikaim.page.loadContent({
            id: 'qrcode_details_' + uuid,           
            component: 'current>qrcode.details',
            params: { 
                uuid: uuid,
                id: 'details_panel_' + uuid    
            }
        });
    };

    this.initRows = function() {   
        arikaim.ui.button('.create-template',function(element) {
            var uuid = $(element).attr('uuid');
            arikaim.ui.loadComponent({
                id: 'qrcode_details_' + uuid,           
                component: 'current>qrcode.template.create',
                params: { 
                    uuid: uuid,
                    id: 'create_template_panel_' + uuid                   
                }
            });
        });

        arikaim.ui.button('.edit-qrcode',function(element) {
            var uuid = $(element).attr('uuid');
            arikaim.page.loadContent({
                id: 'qrcode_details_' + uuid,           
                component: 'current>qrcode.edit',
                params: { 
                    uuid: uuid,
                    id: 'edit_panel_' + uuid                   
                }
            });
        });

        arikaim.ui.button('.edit-qrcode-title',function(element) {
            var uuid = $(element).attr('uuid');
            arikaim.page.loadContent({
                id: 'qrcode_details_' + uuid,           
                component: 'current>qrcode.edit.title',
                params: { 
                    uuid: uuid,
                    id: 'edit_title_panel_' + uuid    
                }
            });
        });

        arikaim.ui.button('.view-analytics',function(element) {
            var uuid = $(element).attr('uuid');
            arikaim.page.loadContent({
                id: 'qrcode_details_' + uuid,           
                component: 'current>qrcode.analytics',
                params: { 
                    uuid: uuid,
                    id: 'analytics_panel_' + uuid    
                }
            });
        });

        arikaim.ui.button('.details-button',function(element) {
            var uuid = $(element).attr('uuid');
            self.loadDetails(uuid);
        });

        arikaim.ui.button('.delete-qrcode',function(element) {                     
            var uuid = $(element).attr('uuid');
            var confirmDelete = arikaim.ui.getComponent('confirm_delete_qrcode');
            var toast = arikaim.ui.getComponent('toast');

            confirmDelete.open(function() { 
                qrcodeApi.delete(uuid,function(result) {
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

var qrcodeView = new QrCodeView();

arikaim.component.onLoaded(function() {
    qrcodeView.init();
});