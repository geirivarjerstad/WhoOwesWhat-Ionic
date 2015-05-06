(function () {

    var SqltestController = function ($q, $log, $cordovaSQLite, SQLiteDataProvider, PersonStore, UUID) {

        var vm = this;
        vm.persons = [];

        vm.resetDatabase = function () {
            console.log("reset database");
            var db = SQLiteDataProvider.getDatabase();
            $cordovaSQLite.execute(db, "DROP TABLE IF EXISTS Person");
            $cordovaSQLite.execute(db, "CREATE TABLE [Person] (\
                    [personId] INTEGER  PRIMARY KEY AUTOINCREMENT NOT NULL,\
                    [personGuid] NVARCHAR(50)  UNIQUE NOT NULL,\
                    [displayname] NVARCHAR(255)  NOT NULL,\
                    [username] NVARCHAR(255)  UNIQUE NOT NULL,\
                    [email] NVARCHAR(255)  UNIQUE NOT NULL,\
                    [mobil] INTEGER  NULL,\
                    [existsOnServer] BOOLEAN  NULL,\
                    [isDeleted] BOOLEAN  NULL\
            )").then(function () {
                vm.updatePersonList();
            });
        };

        vm.insertPerson = function () {

            var personId = null,
                personGuid = UUID.newUUID(),
                displayname = "GeirTest",
                email = "jerstad.geir.ivar@gmail.com",
                mobil = "123456789",
                username = "myusername";
            var person = new Person(personId, personGuid, displayname, username, email, mobil, false, false);

            PersonStore.createPerson(person)
                .then(function () {
                    console.log("added person");
                    vm.updatePersonList();
                })
                .catch(function (reason) {
                    // expect no errors
                    console.error(reason);
                });
        };

        vm.insertPersonWithSamePersonGuid = function () {

            var personId = null,
                personGuid = "b31f26fa-acae-45d5-af35-5903d466150c",
                displayname = "GeirTest",
                email = "jerstad.geir.ivar@gmail.com" + UUID.newUUID(),
                mobil = "123456789",
                username = "myusername" + UUID.newUUID();
            var person = new Person(personId, personGuid, displayname, username, email, mobil, false, false);

            PersonStore.createPerson(person)
                .then(function () {
                    console.log("added person");
                    vm.updatePersonList();
                })
                .catch(function (reason) {
                    // expect no errors
                    console.error(reason);
                });
        };

        vm.insertPersonWithSameUsername = function () {

            var personId = null,
                personGuid = UUID.newUUID(),
                displayname = "GeirTest",
                email = "jerstad.geir.ivar@gmail.com" + UUID.newUUID(),
                mobil = "123456789",
                username = "myusername";
            var person = new Person(personId, personGuid, displayname, username, email, mobil, false, false);

            PersonStore.createPerson(person)
                .then(function () {
                    console.log("added person");
                    vm.updatePersonList();
                })
                .catch(function (reason) {
                    // expect no errors
                    console.error(reason);
                });
        };

        vm.insertPersonWithSameEmail = function () {

            var personId = null,
                personGuid = UUID.newUUID(),
                displayname = "GeirTest",
                email = "jerstad.geir.ivar@gmail.com",
                mobil = "123456789",
                username = "myusername" + UUID.newUUID();
            var person = new Person(personId, personGuid, displayname, username, email, mobil, false, false);

            PersonStore.createPerson(person)
                .then(function () {
                    console.log("added person");
                    vm.updatePersonList();
                })
                .catch(function (reason) {
                    // expect no errors
                    console.error(reason);
                });
        };
        vm.updatePerson = function () {

            var personId = null,
                personGuid = "fd7455d6-1100-43c1-ae8c-475f779cd04a",
                displayname = "GeirTest",
                email = "jerstad.geir.ivar@gmail.com",
                mobil = "123456789" + UUID.newUUID(),
                username = "myusername";
            var person = new Person(personId, personGuid, displayname, username, email, mobil, false, false);

            PersonStore.getPersonByGuid(personGuid).then(function(model){

                if (isObjectValid(model)) {
                    model.mobil = "123456789" + UUID.newUUID();
                    model.displayname = "GeirTest" + Math.random();
                    PersonStore.updatePerson(model)
                        .then(function () {
                            console.log("updated person");
                            vm.updatePersonList();
                        })
                        .catch(function (reason) {
                            // expect no errors
                            console.error(reason);
                        });
                } else {
                    PersonStore.createPerson(person)
                        .then(function () {
                            console.log("added person");
                            vm.updatePersonList();
                        })
                        .catch(function (reason) {
                            // expect no errors
                            console.error(reason);
                        });
                }
            });




        };

        vm.updatePersonList = function () {

            PersonStore.getPersons()
                .then(function (result) {
                    console.log(result);
                    vm.persons = angular.copy(result);
                })
                .catch(function (reason) {
                    // expect no errors
                    console.error(reason);
                });


        };

        vm.SqltestController = function () {
            console.log("SqltestController init");
        };

    };

    var module = angular.module("whooweswhat.controllers");
    module.controller("SqltestController", SqltestController);

}());