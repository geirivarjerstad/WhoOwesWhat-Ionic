(function () {

    function UserRepositoryException(message) {
        this.name = this.constructor.name;
        this.message = message;
        console.error(this.name + ": " + message);
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

    UserRepositoryException.prototype = Object.create(Error.prototype, {
        constructor: {
            value: UserRepositoryException,
            writable: true,
            configurable: true
        }
    });

    var userRepository = function ($q, UserService, LoginRepository, LoginCache, PersonRepository, UUID) {

        var _createUser = function (person, password) {
            console.log("UserRepository->_createUser ");

            var deferred = $q.defer();
            UserService.createUser(person, password)
                .then(function (model) {
                    console.log("UserRepository=>authenticate=>onSuccess", model);
                    if (model.isSuccess) {
                        LoginCache.saveUsername(person.username);
                        LoginCache.savePassword(password);
                        deferred.resolve(model);
                    }
                    else {
                        deferred.reject(new UserRepositoryException("Error creating user."));
                    }
                })
                .catch(function (reason) {
                    // catches errors from previous then()
                    console.log("Ajaxerror: UserRepository->createUserAndLogin: " + reason);
                    deferred.reject(new UserRepositoryException(reason));
                });

            return deferred.promise;
        };

        /// create user online first, then add a new person to local storage
        var _createUserAndLogin = function (displayname, username, email, password) {
            console.log("UserRepository->createUserAndLogin ");
            var deferred = $q.defer();

            var uuid = UUID.newUUID();
            var person = new Person(null, uuid, displayname, username, email, null, false, false);

            _createUser(person, password)
                .then(function () {
                    // thenables. Fullfillment on next then()
                    return PersonRepository.createPerson(person);
                })
                .then(function (result) {
                    // Fullfillment for previous then
                    deferred.resolve(result);
                })
                .catch(function (reason) {
                    // Chaining errors. Catches errors from previous thens()
                    console.log("Ajaxerror: UserRepository->createUserAndLogin: " + reason);
                    deferred.reject(reason);
                });

            return deferred.promise;
        };

        return {
            createUserAndLogin: _createUserAndLogin
        };
    };

    var module = angular.module(moduleNames.WhoOwesWhatRepositories);
    module.factory("UserRepository", userRepository);

}());