(function () {

    var UserController = function ($scope, $q, PopupExtension, UserRepository, IonicLoadingExtension, ControllerNavigation, ErrorStore) {

        var vm = this;
        vm.displayname = null;
        vm.username = null;
        vm.password = null;
        vm.email = null;

        vm.createUser = function (displayname, username, email, password) {
            var deferred = $q.defer();
            var user = {
                username: username,
                email: email
            };
            IonicLoadingExtension.showLoading();
            UserRepository.createUserAndLogin(displayname, username, email, password).then(
                function (data) {
                    IonicLoadingExtension.hideLoading();
                    console.log("UserController=>createuser=>onSuccess", data);
                    deferred.resolve();
                },
                function (error) {
                    IonicLoadingExtension.hideLoading();
                    console.error("Ajaxerror: UserController->createuser:");
                    console.error(error);
                    PopupExtension.showError("Unable to create user: " + error);
                    ErrorStore.addError(error);
                    deferred.reject();
                });
            return deferred.promise;
        };

        vm.createUserAndLogin = function (displayname, username, email, password) {
            vm.createUser(displayname, username, email, password).then(function () {
                ControllerNavigation.toPostMenu();
            })
        };

        vm.goBackTologin = function () {
            ControllerNavigation.toLogin();
        };

        vm.UserController = function () {
            console.log("UserController init");
        };


    };

    var module = angular.module("whooweswhat.controllers");
    module.controller("UserController", UserController);

}());