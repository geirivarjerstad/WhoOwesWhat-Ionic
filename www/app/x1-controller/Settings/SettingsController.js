(function () {

    var SettingsController = function (UserRepository, PopupExtension, IonicLoadingExtension, $timeout, UserService, ErrorStore) {
        var vm = this;
        vm.feedpassword;

        vm.saveFeedpassword = function () {
            IonicLoadingExtension.showLoading();
            UserRepository.saveFeedpassword(vm.feedpassword).then(
                function () {
                    // Success
                    $timeout(function () {
                        IonicLoadingExtension.hideLoading();
                    }, 200);
                },
                function (error) {
                    // Error
                    IonicLoadingExtension.hideLoading();
                    PopupExtension.showError(error);
                    ErrorStore.addError(error);
                });
        };

        vm.SettingsController = function () {
            IonicLoadingExtension.showLoading();
            UserService.getFeedpassword().then(
                function (model) {
                    $timeout(function () {
                        IonicLoadingExtension.hideLoading();
                    }, 200);
                    vm.feedpassword = model;
                },
                function (error) {
                    // Error
                    IonicLoadingExtension.hideLoading();
                    PopupExtension.showError(error);
                    ErrorStore.addError(error);
                    console.error(error);
                })
            ;

        };
    };

    var module = angular.module("whooweswhat.controllers");
    module.controller(controllerNames.SettingsController, SettingsController);

}());