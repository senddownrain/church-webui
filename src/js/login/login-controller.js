'use strict';

function LoginController($scope, $state, AuthService, ModalBoxService) {
    $scope.role = 'User';

    $scope.login = function () {
        $scope.submitted = true;

        if ($scope.loginForm.$invalid) {
            return;
        }
        ModalBoxService.showLoading();

        AuthService.login($scope.role, $scope.password).then(
            function () {
                $state.go('home');
            },
            function (data) {
                switch (data.status) {
                    case 401:
                        $scope.loginForm.password.$error.incorrect = true;
                        break;
                    default:
                        $scope.loginForm.$error.serverError = true;
                        break;
                }
            }
        )
            .finally(function () {
                ModalBoxService.hideLoading();
            });
    };
}

module.exports = ['$scope', '$state', 'AuthService', 'ModalBoxService', LoginController];