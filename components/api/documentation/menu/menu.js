'use strict';

function ApiDocsView() {   
    this.initRows = function() {
        arikaim.ui.button('.view-api-details',function(element) {
            var uuid = $(element).attr('uuid');
            $('.view-api-details').removeClass('bordered');
            $(element).addClass('bordered');

            return arikaim.page.loadContent({
                id: 'api_details_content',
                params: { uuid: uuid },
                component: 'current>api.documentation.details'
            });
        });
    };
}

var apiDocsView = new ApiDocsView();

arikaim.component.onLoaded(function() {   
    apiDocsView.initRows();
});