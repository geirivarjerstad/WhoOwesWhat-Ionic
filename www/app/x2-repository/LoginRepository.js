(function () {

    function LoginRepositoryException(message) {
        this.name = this.constructor.name;
        this.message = message;
        console.error(this.name + ": " + message);
        console.error(message);
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

    LoginRepositoryException.prototype = Object.create(Error.prototype, {
        constructor: {
            value: LoginRepositoryException,
            writable: true,
            configurable: true
        }
    });
    

    var loginRepository = function (LoginService, LoginCache, $q) {

        var _authenticate = function (username, password) {
            var deferred = $q.defer();

            console.log("LoginRepository->authenticate ");
            try {
                if (!isObjectValid(username)) {
                    throw new LoginRepositoryException("username was null");
                }
                if (!isObjectValid(password)) {
                    throw new LoginRepositoryException("password was null");
                }
            }
            catch (err) {
                deferred.reject(err);
                return deferred.promise;
            }
            //
            //// automatic login
            //if (LoginCache.getUsername() === username && LoginCache.getPassword() === password) {
            //    deferred.resolve({isSuccess: true});
            //    return deferred.promise;
            //}

            LoginService.authenticate(username, password).then(
                function (model) {
                    console.log("LoginRepository=>authenticate=>onSuccess", model);
                    try {
                        if (model.isSuccess) {
                            LoginCache.saveUsername(username);
                            LoginCache.savePassword(password);
                            deferred.resolve(model);
                        }
                        else {
                            deferred.reject(new LoginRepositoryException("Error when login"));
                        }
                    }
                    catch (err) {
                        deferred.reject(err);
                    }
                },
                function (reason) {
                    console.log("Ajaxerror: LoginRepository->authenticate: " + reason);
                    deferred.reject(reason);
                });

            return deferred.promise;
        };

        return {
            authenticate: _authenticate
        };
    };

    var module = angular.module(moduleNames.WhoOwesWhatRepositories);
    module.factory(repositoryNames.LoginRepository, loginRepository);

}());