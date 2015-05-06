describe("Unittest.PersonStore: When getting a Person", function () {

    var personId = 1337,
        personGuid = "01cebb3d-53fa-4768-9561-168c6f2b63be",
        displayname = "GeirTest",
        email = "jerstad.geir.ivar@gmail.com",
        mobil = "123456789",
        username = "myusername";
    var _person = new Person(personId, personGuid, displayname, username, email, mobil, false, false);

    beforeEach(function () {
        module("whooweswhat");
        module(MockProvideFactory.CordovaSQLiteWrapperMock);
        module(MockProvideFactory.SQLiteDataProviderMock);
    });

    it('should get a Person successfully', inject(function ($q, $rootScope, CordovaSQLiteWrapper, SQLiteDataProvider, PersonStore) {
        var $scope = $rootScope.$new();

        // call through to the Mock implementation
        spyOn(SQLiteDataProvider, "getDatabase").and.callThrough();

        var rows = [{person: _person}];
        var payload = {
            rows: {
                item: function (i) {
                    return rows[i];
                },
                length: rows.length
            }
        };

        spyOn(CordovaSQLiteWrapper, "execute").and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve(payload);
            return deferred.promise;
        });


        var personId = 1337;
        var isSuccessful = false;
        PersonStore.getPerson(personId).then(
            function (data) {
                isSuccessful = true;
            }
        ).catch(
            function (reason) {
                expect(reason).toBeNull();
            }
        );

        $scope.$digest();

        expect(isSuccessful).toBeTruthy();
        expect(SQLiteDataProvider.getDatabase).toHaveBeenCalled();
        expect(CordovaSQLiteWrapper.execute).toHaveBeenCalledWith("wow_unittest.db", 'SELECT personId, username, displayname, personGuid, email, mobil, existsOnServer, isDeleted FROM Person WHERE personId = ?', [personId])
    }));

    it('should get one Person unsuccessfully', inject(function ($q, $rootScope, CordovaSQLiteWrapper, SQLiteDataProvider, PersonStore) {
        var $scope = $rootScope.$new();

        // call through to the Mock implementation
        spyOn(SQLiteDataProvider, "getDatabase").and.callThrough();

        var result = {
            rows: []
        };

        spyOn(CordovaSQLiteWrapper, "execute").and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve(result);
            return deferred.promise;
        });

        var expextedToFail = false;
        var personId = 1337;
        PersonStore.getPerson(personId).catch(function (error) {
            expect(error).toBeDefined();
            expextedToFail = true;
        });

        $scope.$digest();

        expect(expextedToFail).toBeTruthy();
        expect(SQLiteDataProvider.getDatabase).toHaveBeenCalled();
    }));


    it('should fail when geting several Persons successfully', inject(function ($q, $rootScope, CordovaSQLiteWrapper, SQLiteDataProvider, PersonStore) {
        var $scope = $rootScope.$new();

        // call through to the Mock implementation
        spyOn(SQLiteDataProvider, "getDatabase").and.callThrough();

        var result = {
            rows: [{}, {}]
        };

        spyOn(CordovaSQLiteWrapper, "execute").and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve(result);
            return deferred.promise;
        });

        var personId = 1337;
        var expextedToFail = false;
        PersonStore.getPerson(personId).catch(function (error) {
            expect(error).toBeDefined();
            expextedToFail = true;
        });

        $scope.$digest();

        expect(expextedToFail).toBeTruthy();
    }));

    it('should get Person by username successfully', inject(function ($q, $rootScope, CordovaSQLiteWrapper, SQLiteDataProvider, PersonStore) {
        var $scope = $rootScope.$new();

        // call through to the Mock implementation
        spyOn(SQLiteDataProvider, "getDatabase").and.callThrough();

        var rows = [{person: _person}];
        var payload = {
            rows: {
                item: function (i) {
                    return rows[i];
                },
                length: rows.length
            }
        };

        spyOn(CordovaSQLiteWrapper, "execute").and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve(payload);
            return deferred.promise;
        });

        var isSuccess = false;
        var isFailure = false;

        PersonStore.getPersonByUsername(_person.username)
            .then(function (data) {
                expect(data).toBeDefined();
                isSuccess = true;
            })
            .catch(function (error) {
                console.log(error);
                isFailure = true;
            });

        $scope.$digest();

        expect(isSuccess).toBeTruthy();
        expect(isFailure).toBeFalsy();

    }));

    it('should not fail return empty array when geting Person by username successfully', inject(function ($q, $rootScope, CordovaSQLiteWrapper, SQLiteDataProvider, PersonStore) {
        var $scope = $rootScope.$new();

        // call through to the Mock implementation
        spyOn(SQLiteDataProvider, "getDatabase").and.callThrough();

        var rows = [];
        var payload = {
            rows: {
                item: function (i) {
                    return rows[i];
                },
                length: rows.length
            }
        };

        spyOn(CordovaSQLiteWrapper, "execute").and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve(payload);
            return deferred.promise;
        });

        var isSuccess = false;
        var isFailure = false;

        PersonStore.getPersonByUsername(_person.username)
            .then(function (data) {
                expect(data).not.toBeDefined();
                isSuccess = true;
            })
            .catch(function (error) {
                console.log(error);
                isFailure = true;
            });

        $scope.$digest();

        expect(isSuccess).toBeTruthy();
        expect(isFailure).toBeFalsy();

    }));

    it('should get Person by personGuid successfully', inject(function ($q, $rootScope, CordovaSQLiteWrapper, SQLiteDataProvider, PersonStore) {
        var $scope = $rootScope.$new();

        // call through to the Mock implementation
        spyOn(SQLiteDataProvider, "getDatabase").and.callThrough();

        var rows = [{person: _person}];
        var payload = {
            rows: {
                item: function (i) {
                    return rows[i];
                },
                length: rows.length
            }
        };

        spyOn(CordovaSQLiteWrapper, "execute").and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve(payload);
            return deferred.promise;
        });

        var isSuccess = false;
        var isFailure = false;

        PersonStore.getPersonByGuid(_person.personGuid)
            .then(function (data) {
                expect(data).toBeDefined();
                isSuccess = true;
            })
            .catch(function (error) {
                console.log(error);
                isFailure = true;
            });

        $scope.$digest();

        expect(isSuccess).toBeTruthy();
        expect(isFailure).toBeFalsy();

    }));

    it('should not fail return empty array when geting Person by personGuid successfully', inject(function ($q, $rootScope, CordovaSQLiteWrapper, SQLiteDataProvider, PersonStore) {
        var $scope = $rootScope.$new();

        // call through to the Mock implementation
        spyOn(SQLiteDataProvider, "getDatabase").and.callThrough();

        var rows = [];
        var payload = {
            rows: {
                item: function (i) {
                    return rows[i];
                },
                length: rows.length
            }
        };

        spyOn(CordovaSQLiteWrapper, "execute").and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve(payload);
            return deferred.promise;
        });

        var isSuccess = false;
        var isFailure = false;

        PersonStore.getPersonByGuid(_person.personGuid)
            .then(function (data) {
                expect(data).not.toBeDefined();
                isSuccess = true;
            })
            .catch(function (error) {
                console.log(error);
                isFailure = true;
            });

        $scope.$digest();

        expect(isSuccess).toBeTruthy();
        expect(isFailure).toBeFalsy();

    }));

});