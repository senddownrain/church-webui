'use strict';

var angular = require('angular');

function exportFileDirective($document) {
    return {
        restrict: 'A',

        link: function (scope, element, attrs) {
            element.on('click', function (event) {
                event.preventDefault();

                var body = $document.find('body');
                var form = angular
                    .element('<form>')
                    .attr({
                        action: attrs.exportUrl,
                        method: 'post'
                    });

                var filesExport = angular
                    .element('<input>')
                    .attr({
                        name: 'files_export',
                        value: attrs.rootFolder + attrs.folderUrl
                    });

                var folderName = angular
                    .element('<input>')
                    .attr({
                        name: 'folder_name',
                        value: attrs.folderUrl
                    });

                form.append(folderName);
                form.append(filesExport);
                body.append(form);
                form[0].submit();
                form.remove();
            });
        }
    };
}

module.exports = ['$document', exportFileDirective];