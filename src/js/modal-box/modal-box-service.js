'use strict';

function ModalBoxService() {
    this.data = {
        visible: false,
        config: null
    };

    this.show = function (config) {
        this.close();

        this.data.config = config;
        this.data.visible = true;
    };

    this.close = function () {
        this.data.visible = false;
        delete this.data.config;
    };

    this.showLoading = function () {
        this.show({
            overlay: true,
            template: require('./loading.html')
        });
    };

    this.hideLoading = function () {
        this.close();
    };

    this.showConfirm = function (message, action) {
        this.show({
            overlay: true,
            template: require('./confirm.html'),
            message: message,
            action: action
        });
    };

}

module.exports = ModalBoxService;