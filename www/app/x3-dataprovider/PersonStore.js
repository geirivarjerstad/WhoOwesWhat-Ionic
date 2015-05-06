(function () {

    function PersonStoreException(message) {
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

    PersonStoreException.prototype = Object.create(Error.prototype, {
        constructor: {
            value: PersonStoreException,
            writable: true,
            configurable: true
        }
    });


    var PersonDB = {
        Table: "Person",
        personId: "personId",
        username: "username",
        displayname: "displayname",
        personGuid: "personGuid",
        email: "email",
        mobil: "mobil",
        existsOnServer: "existsOnServer",
        isDeleted: "isDeleted",
        Properties: function () {
            return this.personId + ", " + this.username + ", " + this.displayname + ", " + this.personGuid + ", " + this.email + ", " + this.mobil + ", " + this.existsOnServer + ", " + this.isDeleted;
        }
    };

    var PersonStore = function ($q, CordovaSQLiteWrapper, SQLiteDataProvider) {

        var _getPerson = function (personId) {

            var deferred = $q.defer();

            if (!isObjectValid(personId)) {
                deferred.reject(new PersonStoreException("personId was null or empty"));
                return deferred.promise;
            }

            var database = SQLiteDataProvider.getDatabase();
            var query = "SELECT " + PersonDB.Properties() + " FROM " + PersonDB.Table + " WHERE " + PersonDB.personId + " = ?";
            CordovaSQLiteWrapper.execute(database, query, [personId]).then(
                function (result) {
                    try {
                        console.log("PersonStore->_getPerson()");
                        if (result.rows.length > 1) {
                            deferred.reject(new PersonStoreException("_getPerson() returned multiple rows"));
                        }
                        else if (result.rows.length == 1) {
                            var person = result.rows.item(0);
                            deferred.resolve(person);
                        }
                        else {
                            deferred.reject(new PersonStoreException("Unable to get person with personId: " + personId));
                        }
                    }
                    catch (err) {
                        deferred.reject(new PersonStoreException(err));
                    }
                },
                function (reason) {
                    console.error("PersonStore->_getPerson(). See print in console.error log: ");
                    deferred.reject(new PersonStoreException(reason));
                });
            return deferred.promise;


            //    .then(function(res) {
            //    if(res.rows.length > 0) {
            //        console.log("SELECTED -> " + res.rows.item(0).personId + " " + res.rows.item(0).displayname + " " + res.rows.item(0).email);
            //    } else {
            //        console.log("No results found");
            //    }
            //}, function (err) {
            //    console.error(err);
            //});

        };

        var _getPersons = function () {

            var deferred = $q.defer();
            var database = SQLiteDataProvider.getDatabase();
            var query = "SELECT " + PersonDB.Properties() + " FROM " + PersonDB.Table;
            CordovaSQLiteWrapper.execute(database, query).then(
                function (result) {
                    try {
                        console.log("PersonStore->_getPersons()");
                        var persons = result.rows;
                        deferred.resolve(persons);
                    }
                    catch (err) {
                        deferred.reject(err);
                    }
                },
                function (reason) {
                    console.error("PersonStore->_getPerson(). See print in console.error log: ");
                    deferred.reject(new PersonStoreException(reason));
                });
            return deferred.promise;
        };


        var _getPersonHash = function (person, isUpdate) {
            var map = new DBHashTable();
            if(isUpdate !== true){
                map.setItem(PersonDB.personId, person.personId);
            }
            map.setItem(PersonDB.personGuid, person.personGuid);
            map.setItem(PersonDB.displayname, person.displayname);
            map.setItem(PersonDB.username, person.username);
            map.setItem(PersonDB.email, person.email);
            map.setItem(PersonDB.mobil, person.mobil);
            map.setItem(PersonDB.existsOnServer, person.existsOnServer);
            map.setItem(PersonDB.isDeleted, person.isDeleted);
            return map;
        };

        var _getInsertIntoQueryString = function (hash) {

            var queryString = "INSERT INTO " + PersonDB.Table + " (";

            for (var i = 0; i < hash.insertionKeys.length; i++) {
                queryString += hash.insertionKeys[i];
                if (i < hash.length - 1) {
                    queryString += ", ";
                }
            }

            queryString += ") VALUES (";
            queryString += "?";
            for (var j = 0; j < hash.length - 1; j++) {
                queryString += ",?"
            }

            queryString += ")";

            return queryString;
        };

        var _getUpdateQueryString = function (personId, hash) {

            //UPDATE Person SET personGuid = ?, displayname = ?, username = ?, email = ?, mobil = ?, existsOnServer = ?, isDeleted = ? WHERE personId = 1
            var queryString = "UPDATE " + PersonDB.Table + " SET ";

            for (var i = 0; i < hash.insertionKeys.length; i++) {
                queryString += hash.insertionKeys[i] + " = ?";
                if (i < hash.length - 1) {
                    queryString += ", ";
                }
            }

            queryString += " WHERE personId = " + personId;

            return queryString;
        };

        var _getBinding = function (hash) {
            var binding = [];

            for (var i = 0; i < hash.insertionKeys.length; i++) {
                binding.push(hash.items[hash.insertionKeys[i]]);
            }

            return binding;
        };

        var _createPerson = function (person) {
            var deferred = $q.defer();
            try {
                validatePerson(person);
                if (isObjectValid(person.personId)) {
                    throw new PersonStoreException("personId was NOT null");
                }
            }
            catch (err) {
                deferred.reject(err);
                return deferred.promise;
            }

            var database = SQLiteDataProvider.getDatabase();
            var map = _getPersonHash(person);
            var queryString = _getInsertIntoQueryString(map);
            var binding = _getBinding(map);


            CordovaSQLiteWrapper.execute(database, queryString, binding).then(
                function (result) {
                    try {
                        console.log("PersonStore->_createPerson()");
                        deferred.resolve(result.insertId);
                    }
                    catch (err) {
                        deferred.reject(new PersonStoreException(err));
                    }
                },
                function (reason) {
                    console.error("PersonStore->_createPerson(). See print in console.error log: ");
                    console.info(queryString);
                    console.info(binding);
                    deferred.reject(new PersonStoreException(reason));
                });
            return deferred.promise;
        };
        var _updatePerson = function (person) {
            var deferred = $q.defer();
            try {
                validatePerson(person);
                if (!isObjectValid(person.personId)) {
                    throw new PersonStoreException("personId was null");
                }
            }
            catch (err) {
                deferred.reject(err);
                return deferred.promise;
            }

            var database = SQLiteDataProvider.getDatabase();
            var map = _getPersonHash(person, true);
            var queryString = _getUpdateQueryString(person.personId, map);
            var queryString = 'UPDATE Person SET personGuid = ?, displayname = ?, username = ?, email = ?, mobil = ?, existsOnServer = ?, isDeleted = ? WHERE personId = 1';
            var binding = _getBinding(map);


            CordovaSQLiteWrapper.execute(database, queryString, binding).then(
                function (result) {
                    try {
                        console.log("PersonStore->_updatePerson()");
                        deferred.resolve(result.rowsAffected);
                    }
                    catch (err) {
                        deferred.reject(new PersonStoreException(err));
                    }
                },
                function (reason) {
                    console.error("PersonStore->_createPerson(). See print in console.error log: ");
                    console.info(queryString);
                    console.info(binding);
                    deferred.reject(new PersonStoreException(reason));
                });
            return deferred.promise;
        };

        var _insertOrUpdatePerson = function (person) {
            if (person.personId == null) {
                return _createPerson(person)
            }
            else {
                return _updatePerson(person);
            }
        };

        var validatePerson = function (person) {
            if (!isObjectValid(person.displayname)) {
                throw new PersonStoreException("displayname was null or empty");
            }
            if (!isObjectValid(person.personGuid)) {
                throw new PersonStoreException("personGuid was null or empty");
            }
            if (!isObjectValid(person.email)) {
                throw new PersonStoreException("email was null or empty");
            }
            //if (!isObjectValid(person.mobil)) {
            //    throw new PersonStoreException("mobil was null or empty");
            //}
        };

        var validateUser = function (user) {
            validatePerson(user);
            if (!isObjectValid(user.username)) {
                throw new PersonStoreException("username was null or empty");
            }
        };

        var _getPersonByUsername = function (username) {
            var deferred = $q.defer();

            if (!isObjectValid(username)) {
                deferred.reject(new PersonStoreException("username was null or empty"));
                return deferred.promise;
            }

            var database = SQLiteDataProvider.getDatabase();
            var query = "SELECT " + PersonDB.Properties() + " FROM " + PersonDB.Table + " WHERE " + PersonDB.username + " = ?";
            CordovaSQLiteWrapper.execute(database, query, [username]).then(
                function (result) {
                    console.log("PersonStore->_getPersonByUsername()");
                    if (result.rows.length > 1) {
                        deferred.reject(new PersonStoreException("_getPersonByUsername() returned multiple rows"));
                    }
                    else if (result.rows.length == 1) {
                        var person = result.rows.item(0);
                        deferred.resolve(person);
                    }
                    else {
                        deferred.resolve();
                    }
                },
                function (reason) {
                    console.error("PersonStore->_getByUsername(). See print in console.error log: ");
                    deferred.reject(new PersonStoreException(reason));
                });
            return deferred.promise;

        };

        var _getPersonByGuid = function (personGuid) {
            var deferred = $q.defer();

            if (!isObjectValid(personGuid)) {
                deferred.reject(new PersonStoreException("personGuid was null or empty"));
                return deferred.promise;
            }

            var database = SQLiteDataProvider.getDatabase();
            var query = "SELECT " + PersonDB.Properties() + " FROM " + PersonDB.Table + " WHERE " + PersonDB.personGuid + " = ?";
            CordovaSQLiteWrapper.execute(database, query, [personGuid]).then(
                function (result) {
                    console.log("PersonStore->_getPersonByGuid()");
                    if (result.rows.length > 1) {
                        deferred.reject(new PersonStoreException("_getPersonByGuid() returned multiple rows"));
                    }
                    else if (result.rows.length == 1) {
                        var person = result.rows.item(0);
                        deferred.resolve(person);
                    }
                    else {
                        deferred.resolve();
                    }
                },
                function (reason) {
                    console.error("PersonStore->_getPersonByGuid(). See print in console.error log: ");
                    deferred.reject(new PersonStoreException(reason));
                });
            return deferred.promise;
        };

        return {
            getPersonHash: _getPersonHash,
            getInsertIntoQueryString: _getInsertIntoQueryString,
            getUpdateQueryString: _getUpdateQueryString,
            getBinding: _getBinding,

            getPerson: _getPerson,
            getPersonByUsername: _getPersonByUsername,
            getPersonByGuid: _getPersonByGuid,
            getPersons: _getPersons,
            createPerson: _insertOrUpdatePerson,
            updatePerson: _insertOrUpdatePerson
        };

    };

    var module = angular.module("whooweswhat.dataproviders");
    //module.controller(dataproviderNames.PersonStore, PersonStore);
    module.factory(dataproviderNames.PersonStore, PersonStore);

}());