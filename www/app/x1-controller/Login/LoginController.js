(function () {

    var LoginController = function ($q, $log, $timeout, $controller, LoginRepository,
                                    LoginCache, PopupExtension, ControllerNavigation,
                                    ErrorStore, IonicLoadingExtension, ErrorService, UUID) {

        var vm = this;
        vm.username = "";
        vm.password = "";
        vm.isLoginSuccess;

        vm.login = function (username, password) {
            var deferred = $q.defer();

            vm.username = username;
            vm.password = password;
            IonicLoadingExtension.showLoading();
            LoginRepository.authenticate(username, password).then(
                function (data) {
                    IonicLoadingExtension.hideLoading();
                    vm.isLoginSuccess = data.isSuccess;
                    console.log("LoginController=>login=>onSuccess", data);
                    vm.tryNavigateToPostMenu();
                    deferred.resolve();
                },
                function (error) {
                    IonicLoadingExtension.hideLoading();
                    PopupExtension.showError("Error: LoginController->authenticate", error);
                    console.error(error);
                    ErrorStore.addError(error);
                    ErrorService.saveError(error);

                    deferred.reject();
                });

            return deferred.promise;
        };

        vm.tryNavigateToPostMenu = function () {
            console.log("Navigate to PostMenu");
            //PersonStore.createPerson("MornDu!", UUID.newUUID(), "jerstad_geir_ivar@hotmail.com", "90103063");
            //ControllerNavigation.toCommoditiesOrFeed().catch(
            //    function (error) {
            //        PopupExtension.showError("Unable to navigate: ", error);
            //        ErrorStore.addError(error);
            //    });
        };

        vm.createNewUser = function () {
            ControllerNavigation.toCreateNewUser();
            console.log("createuser");
        };

        vm.showErrors = function () {
            ControllerNavigation.toErrors();
            console.log("Errors");
        };

        vm.showLoading = function () {
            IonicLoadingExtension.showLoadingForever();
        };

        vm.logout = function () {
            console.log("Logging out!");
            LoginCache.clearLoginCache();
            ControllerNavigation.toLogin();
        };

        vm.LoginController = function () {
            console.log("LoginController init");
            if (LoginCache.hasLoginDetails()) {
                vm.username = LoginCache.getUsername();
                vm.password = LoginCache.getPassword();
                vm.login(vm.username, vm.password);
            }
        };

    };

    var module = angular.module("whooweswhat.controllers");
    module.controller("LoginController", LoginController);

}());