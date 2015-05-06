//describe("Sqlite: When adding a Person to databased", function () {
//    var globaldatabase, database;
//    var $scope, $q, PersonStore;
//
//    beforeEach(function () {
//        module("whooweswhat");
//        module(function ($provide) {
//            $provide.factory(dataproviderNames.SQLiteDataProvider, function ($timeout, $rootScope, $cordovaSQLite) {
//                return {
//                    getDatabase: function () {
//                        var me = this;
//                        var $scope = $rootScope.$new();
//                        me.db = window.openDatabase("wowtest1337.db", "2.0", "My app", -1);
//                        $timeout(function(){
//                            var result = $cordovaSQLite.execute(me.db, "CREATE TABLE [Person] (\
//                            [personId] INTEGER  PRIMARY KEY AUTOINCREMENT NOT NULL,\
//                            [personGuid] NVARCHAR(50)  UNIQUE NOT NULL,\
//                            [displayname] NVARCHAR(255)  NOT NULL,\
//                            [username] NVARCHAR(255)  NOT NULL,\
//                            [email] NVARCHAR(255)  NOT NULL,\
//                            [mobil] INTEGER  NULL,\
//                            [existsOnServer] BOOLEAN  NULL,\
//                            [isDeleted] BOOLEAN  NULL )").then(function () {
//                                console.log("møøø1234");
//                            });
//                        }, 1000);
//
//                        $scope.$digest();
//                        $rootScope.$digest();
//                        $rootScope.$apply();
//                        $timeout.flush(1000);
//                        return me.db;
//                    }
//                };
//            })
//        });
//    });
//
//    iit('should check succesfully', inject(function ($timeout, $httpBackend, $rootScope, $controller) {
//        $httpBackend.whenGET(/^\w+.*/).respond("");
//        var $scope = $rootScope.$new();
//
//        var SqltestController = $controller("SqltestController", {
//            $scope: $scope
//        });
//
//        $timeout(function(){
//            SqltestController.insertPerson();
//        }, 1000);
//
//
//        SqltestController.insertPerson();
//        SqltestController.insertPerson();
//        SqltestController.insertPerson();
//
//        $scope.$digest();
//        $rootScope.$digest();
//
//        $rootScope.$digest();
//
//    }));
//
//
//    it('should check succesfully', inject(function ($rootScope, $cordovaSQLite, SQLiteDataProvider, PersonStore) {
//        var $scope = $rootScope.$new();
//        //var result = $cordovaSQLite.execute(database, "CREATE TABLE [Person] (\
//        //                    [personId] INTEGER  PRIMARY KEY AUTOINCREMENT NOT NULL,\
//        //                    [personGuid] NVARCHAR(50)  UNIQUE NOT NULL,\
//        //                    [displayname] NVARCHAR(255)  NOT NULL,\
//        //                    [username] NVARCHAR(255)  NOT NULL,\
//        //                    [email] NVARCHAR(255)  NOT NULL,\
//        //                    [mobil] INTEGER  NULL,\
//        //                    [existsOnServer] BOOLEAN  NULL,\
//        //                    [isDeleted] BOOLEAN  NULL )");
//        //
//        //result.then(function (data) {
//        //    console.log(data);
//        //}).catch(function (error) {
//        //    console.log(error);
//        //});
//        //
//        //$cordovaSQLite.execute(database, "SELECT personId, username, displayname, personGuid, email, mobil, existsOnServer, isDeleted FROM Person").then(
//        //    function (result) {
//        //        console.log("PersonStore->_getPerson()");
//        //        var person = result.rows.item(0);
//        //    },
//        //    function (reason) {
//        //        console.error("PersonStore->_getPerson(). See print in console.error log: ");
//        //    });
//        //
//        ////
//
//        $scope.$digest();
//
//        //console.log(result);
//
//    }));
//
//
//})
//;