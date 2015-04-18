'use strict';

function modalBoxDirective($compile, $document) {
    return {
        restrict: 'E',

        controller: ['$scope', 'ModalBoxService', function ($scope, ModalBoxService) {
            $scope.data = ModalBoxService.data;

            $scope.close = function () {
                ModalBoxService.close();
            };
        }],

        link: function (scope, element) {
            var body = $document.find('body');

            scope.$watch('data.visible', function (newValue) {
                if (newValue) {
                    element.html(scope.data.config.template).append(require('./overlay.html'));
                    $compile(element.contents())(scope);
                } else {
                    element.html('');
                }

                body.toggleClass('blurred', scope.data.config && scope.data.config.overlay);
            });
        }
    };
}

module.exports = ['$compile', '$document', modalBoxDirective];
