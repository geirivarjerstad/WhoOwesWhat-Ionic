(function () {

    function UserServiceException(message) {
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

    UserServiceException.prototype = Object.create(Error.prototype, {
        constructor: {
            value: UserServiceException,
            writable: true,
            configurable: true
        }
    });

    var userService = function ($q, HttpWrapper, ServerUrlStore) {

        var _createUser = function (person, password) {

            var deferred = $q.defer();

            try {
                _validateUser(person, password);
            }
            catch (err) {
                deferred.reject(err);
                return deferred.promise;
            }

            var serverUrl = ServerUrlStore.getServerUrlOrDefault();

            var model = person;
            model.format = "json";
            model.password = password;

            var postURL = serverUrl + "user/new";

            HttpWrapper.post(postURL, model)
                .success(function (data) {
                    try {
                        var domain = mapToDomain(data);
                        console.log("UserService->updateUser()");
                        if (domain.isSuccess) {
                            deferred.resolve(domain);
                        }
                        else {
                            deferred.reject("Unable to update the server. ");
                        }
                    }
                    catch (err) {
                        deferred.reject(err);
                    }
                })
                .error(function (reason) {
                    console.error("ServerError: UserService->updateUser(). See print in console.error log: ");
                    if (reason.ResponseStatus !== undefined) {
                        console.error(JSON.stringify(reason.ResponseStatus));
                        deferred.reject(new UserServiceException("Servererror: " + reason.ResponseStatus.Message));
                    }
                    else {
                        console.error("Ajaxerror: UserService->updateUser(): " + reason);
                        deferred.reject(new UserServiceException(reason));
                    }
                });

            return deferred.promise;
        };

        var _validateUser = function (user, password) {

            if (!isObjectValid(user.username)) {
                throw new UserServiceException("username was null");
            }
            if (!isObjectValid(password)) {
                throw new UserServiceException("password was null");
            }
//            if (!isObjectValid(user.email)) {
//                throw new UserServiceException("email was null");
//            }
        };

        var mapToDomain = function (data) {

            if (!isObjectValid(data.isSuccess)) {
                throw new UserServiceException("UserServiceException=>mapToDomain: 'data.isSuccess' was null ");
            }
            return {
                isSuccess: data.isSuccess
            }
        };

        return {
            createUser: _createUser
        };

    };


    var module = angular.module(moduleNames.WhoOwesWhatDataproviders);
    module.factory(serviceNames.UserService, userService);

}());