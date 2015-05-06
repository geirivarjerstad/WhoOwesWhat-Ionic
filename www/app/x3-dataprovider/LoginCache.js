(function () {

    function LoginCacheException(message) {
        this.name = this.constructor.name;
        this.message = message;
        console.error(this.name + ": " + message)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        } else {
            var stack = new Error().stack;
            if (typeof stack === "string") {
                stack = stack.split("\n");
                stack.shift();
                this.stack = stack.join("\n");
            }
        }
    }

    LoginCacheException.prototype = Object.create(Error.prototype, {
        constructor: {
            value: LoginCacheException,
            writable: true,
            configurable: true
        }
    });



    var LoginCache = function (DSCacheFactory) {

        var usernameKey = "username";
        var passwordKey = "password";

        var __getLoginCache = function () {
            var cache = DSCacheFactory.get("LoginCache");
            if(!angular.isDefined(cache)){
                cache = DSCacheFactory('LoginCache');
            }
            return cache;
        };

        var _getUsername = function () {
            var cache = __getLoginCache();
            return cache.get(usernameKey);
        };

        var _getPassword = function () {
            var cache = __getLoginCache();
            return cache.get(passwordKey);
        };

        var _clearLoginCache = function () {
            DSCacheFactory.clearAll();
        };

        var _saveUsername = function (username) {
            if (!isObjectValid(username)) {
                throw new LoginCacheException("username was null or empty");
            }
            var cache = __getLoginCache();
            return cache.put(usernameKey, username);
        };

        var _savePassword = function (password) {
            if (!isObjectValid(password)) {
                throw new LoginCacheException("password was null or empty");
            }
            var cache = __getLoginCache();
            return cache.put(passwordKey, password);
        };

        var _hasLoginDetails = function () {
            var username = _getUsername();
            var password = _getPassword();
            return (isObjectValid(username) && isObjectValid(password));
        };


        return {
            getUsername: _getUsername,
            saveUsername: _saveUsername,
            getPassword: _getPassword,
            savePassword: _savePassword,
            hasLoginDetails: _hasLoginDetails,
            clearLoginCache: _clearLoginCache
        };

    };

    var module = angular.module("whooweswhat.dataproviders");
    module.factory("LoginCache", LoginCache);

}());