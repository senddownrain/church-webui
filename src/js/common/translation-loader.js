'use strict';

// default translation
function TranslationLoader($q/*, RequestService*/) {
    return function (/*options*/) {
        return $q.when(require('../translations.json'));

        /*return RequestService.request({
         url: 'get-translations',
         method: 'get',
         data: {
         key: options.key
         }
         });*/
    };
}

module.exports = ['$q', /*'RequestService', */ TranslationLoader];

/*
// dev version

'use strict';

function TranslationLoader(RequestService, ModalBoxService) {
    return function (options) {
        ModalBoxService.showLoading();

        return RequestService.request({
            url: 'get-translations?key=' + options.key,
            method: 'get'
        }).then(function (respose){
            return respose.data;
        }).finally(function () {
            ModalBoxService.hideLoading();
        });
    };
}

module.exports = ['RequestService', 'ModalBoxService', TranslationLoader];*/
