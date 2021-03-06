(function () {

    function LoginServiceException(message) {
        this.name = 'LoginServiceException';
        this.message = message;
        console.error(this.name + ": " + message)
    }

    LoginServiceException.prototype = new Error();
    LoginServiceException.prototype.constructor = LoginServiceException;

    var loginService = function (HttpWrapper, $q, ServerUrlStore) {

        var _authenticate = function (username, password) {

            if (!isObjectValid(username)) {
                deferred.reject(new LoginServiceException("LoginServiceException=>_authenticate: 'username' was null or empty"));
                return deferred.promise;
            }
            if (!isObjectValid(password)) {
                deferred.reject(new LoginServiceException("LoginServiceException=>_authenticate: 'password' was null or empty"));
                return deferred.promise;
            }

            var serverUrl = ServerUrlStore.getServerUrlOrDefault();
            var deferred = $q.defer();

            console.log("LoginService ServerURL = " + serverUrl);

            HttpWrapper.get(serverUrl + "authenticateUser?format=json&username=" + username + "&password=" + password)
                .success(function (data) {
                    console.log("LoginService=>authenticate=>onSuccess", data);
                    try {
                        var model = mapToDomain(data);
                        validateAuthenticated(model);
                        deferred.resolve(model);
                    }
                    catch (err) {
                        deferred.reject(err);
                    }

                })
                .error(function (reason) {
                    console.error("ServerError: LoginService->authenticate(). See print in console.error log: ");

                    if (reason.ResponseStatus !== undefined) {
                        console.error(JSON.stringify(reason.ResponseStatus));
                        deferred.reject(new LoginServiceException("Servererror: " + reason.ResponseStatus.Message));
                    }
                    else {
                        console.error("Ajaxerror: CommodityService->getCommodities(): " + reason);
                        deferred.reject(new LoginServiceException(reason));
                    }
                });

            return deferred.promise;
        };

        var mapToDomain = function (data) {

            if (!isObjectValid(data.isSuccess)) {
                throw new LoginServiceException("LoginRepositoryException=>mapToDomain: 'data.isSuccess' was null ");
            }

            var isSuccess = data.isSuccess;

            return {
                isSuccess: isSuccess
            };
        };

        var validateAuthenticated = function (model) {
            if (!isObjectValid(model.isSuccess)) {
                throw new LoginServiceException("validateAuthenticated: 'data.isSuccess' was null ");
            }
            //
            //if (!isObjectValid(model.userExists)) {
            //    throw new LoginServiceException("validateAuthenticated: 'data.userExists' was null ");
            //}

            // TODO: Dette skal erstattes med en liste av feilmeldinger fra server
            //if (!model.isSuccess && !model.userExists) {
            //    throw new LoginServiceException("User does not exist");
            //}
            if (!model.isSuccess) {
                throw new LoginServiceException("Incorrect user or password");
            }
        };

        return {
            authenticate: _authenticate
        };

    };

    var module = angular.module("whooweswhat.dataproviders");
    module.factory("LoginService", loginService);

}());