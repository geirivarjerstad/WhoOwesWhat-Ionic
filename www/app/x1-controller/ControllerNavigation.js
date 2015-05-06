(function () {

    function ControllerNavigationException(message) {
        this.name = 'ControllerNavigationException';
        this.message = message;
        console.error(this.name + ": " + message)
    }

    ControllerNavigationException.prototype = new Error();
    ControllerNavigationException.prototype.constructor = ControllerNavigationException;

    var controllerNavigation = function ($q, $location) {

        var toCreateNewUser = function () {
            $location.path("/createuser");
        };

        var toErrors = function () {
            $location.path("/errors");
        };

        var toLogin = function () {
            $location.path("/login");
        };

        var toPostMenu = function () {
            console.log("Navigating to PostMenu");
        };


        return {
            toCreateNewUser: toCreateNewUser,
            toPostMenu: toPostMenu,
            toLogin: toLogin,
            toErrors: toErrors
        };
    };

    var module = angular.module("whooweswhat.controllers");
    module.factory("ControllerNavigation", controllerNavigation);

}());
