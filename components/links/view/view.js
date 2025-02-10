/**
 *  Arikaim
 *  @copyright  Copyright (c) Intersoft Ltd <info@arikaim.com>
 *  @license    http://www.arikaim.com/license
 *  http://www.arikaim.com
 */
'use strict';

function LinksView() {
    var self = this;
    this.messages = null;

    this.init = function() {       
        if (isObject(this.messages) == false) {
            arikaim.component.loadProperties('current>links.messages',function(params) { 
                self.messages = params.messages;
            }); 
        }  
        
        search.init({
            id: 'links_items',
            component: 'current>links.view.items',
            event: 'link.search.load'
        },'links')  

        arikaim.ui.subscribe('link_status_filter','selected',function(value) {
            var searchData = {
                search: {
                    link_type_filter: value,                       
                }          
            };
    
            search.setSearch(searchData,'links',function(result) {                  
                self.loadRows();
            });  
        });
              
        arikaim.ui.button('.create-link',function(element) {   
            arikaim.ui.loadComponent({
                mountTo: 'details_panel',           
                component: 'current>links.create' 
            });            
        }); 

        arikaim.events.on('link.create',function(uuid) {
            self.loadRows();
        },'LinkCreated');

        arikaim.events.on('link.update',function(uuid) {
            self.loadRow(uuid);
        },'LinkUpdated');        
    };

    this.loadRow = function(uuid) {
        arikaim.page.loadContent({
            id: 'row_' + uuid,           
            component: 'current>links.view.item',
            params: {
                uuid: uuid
            }
        },function() {
            self.initRows();
        });
    };
    
    this.loadEmpty = function() {
        arikaim.page.loadContent({
            id: 'links_items',           
            component: 'current>links.view.empty',
            params: {}
        });
    };
    
    this.loadRows = function() {
        arikaim.page.loadContent({
            id: 'links_items',           
            component: 'current>links.view.items',
            params: {}
        },function() {
            self.initRows();
        });
    };

    this.initRows = function() {    
        arikaim.ui.loadComponentButton('.link-action');

        arikaim.ui.button('.link-status-toggle',function(element) {  
            var uuid = $(element).attr('uuid');
            var status = 0;

            if ($(element).prop("checked") == true) {
                status = 1;
            };
           
            linksApi.setStatus(uuid,status,function(result) {
                console.log(result);
            });
        });

        arikaim.ui.button('.delete-link',function(element) {          
            var uuid = $(element).attr('uuid');
            var confirmDelete = arikaim.ui.getComponent('confirm_delete_link');
            var toast = arikaim.ui.getComponent('toast');

            confirmDelete.open(function() { 
                linksApi.delete(uuid,function(result) {
                    toast.show(result.message);
                    // hide details panel
                    $('#details_panel').html('');                    
                    arikaim.ui.table.removeRow('#row_' + result.uuid,null,function() {
                        self.loadEmpty();                       
                    });                   
                },function(error) {
                    
                });  
            });
        });
    };
}

var linksView = new LinksView();

arikaim.component.onLoaded(function() {
    linksView.init();
    linksView.initRows();
});