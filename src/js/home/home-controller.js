'use strict';

function HomeController($scope, RequestService, ChurchModel, ModalBoxService) {
    ModalBoxService.showLoading();

    function loadData() {

        return RequestService
            .request({
                url: 'top-churches',
                method: 'get'
            })
            .then(function (response) {
                $scope.churchList = [];

                if(response.data.churchList){
                    response.data.churchList.forEach(function(ch){
                        $scope.churchList.push(new ChurchModel(ch));
                    });
                }
            });
    }


    loadData()
        .finally(function () {
            ModalBoxService.hideLoading();
        });


}

module.exports = ['$scope', 'RequestService', 'ChurchModel', 'ModalBoxService', HomeController];