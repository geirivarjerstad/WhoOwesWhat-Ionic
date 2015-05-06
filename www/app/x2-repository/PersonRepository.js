(function () {
    function PersonRepositoryException(message) {
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

    PersonRepositoryException.prototype = Object.create(Error.prototype, {
        constructor: {
            value: PersonRepositoryException,
            writable: true,
            configurable: true
        }
    });

    var personRepository = function ($q, PersonStore) {

        var _createPerson = function (person) {
            var deferred = $q.defer();

            PersonStore.getPersonByUsername(person.username)
                .then(function (personByUsername) {
                    if (isObjectValid(personByUsername)) {
                        deferred.reject(new PersonRepositoryException("SavePerson: username exists "));
                        return deferred.promise;
                    }
                    return PersonStore.getPersonByGuid(person.personGuid);
                })
                .then(function (personByGuid) {
                    if (isObjectValid(personByGuid)) {
                        deferred.reject(new PersonRepositoryException("SavePerson: personGuid exists "));
                        return deferred.promise;
                    }
                    return PersonStore.createPerson(person);
                })
                .then(function (insertId) {
                    console.log("PersonRepository=>createPerson=>onSuccess", insertId);
                    if (insertId) {
                        deferred.resolve(insertId);
                    }
                    else {
                        deferred.reject(new PersonRepositoryException("Error creating person."));
                    }
                })
                .catch(function (reason) {
                    // catches errors from previous then()
                    deferred.reject(new PersonRepositoryException(reason));
                });
            return deferred.promise;
        };

        return {
            createPerson: _createPerson
        };
    };

    var module = angular.module(moduleNames.WhoOwesWhatRepositories);
    module.factory("PersonRepository", personRepository);

}());