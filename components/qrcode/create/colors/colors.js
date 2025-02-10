'use strict';

arikaim.component.onLoaded(function() {
    var colorComponents = [
        'bg_color',
        'finder-color',
        'timing-color',
        'format-color',
        'version-color',
        'data-color'
    ];

    var bg = arikaim.ui.getComponent('bg_color');
 
    colorComponents.forEach(function(name) {
        arikaim.ui.subscribe(name,'selected',function(value) {       
            qrcodeGenerator.preview();
        });
    });
  
    arikaim.ui.button('.clear-colors',function(element) {     
        colorComponents.forEach(function(name) {
            arikaim.ui.withComponent(name,function(component) {
                component.selectColor('','');
            });
        });
    });
});