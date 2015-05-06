describe("UserRepository: When creating new a user", function () {

    var _person;
    var _password;

    beforeEach(function () {
        module("whooweswhat");
        module(MockProvideFactory.UserServiceMock);
        module(MockProvideFactory.LoginCacheMock);
        module(MockProvideFactory.PersonRepositoryMock);


        _password = "myPassword";
        var personId = null,
            personGuid = "01cebb3d-53fa-4768-9561-168c6f2b63be",
            displayname = "GeirTest",
            email = "jerstad.geir.ivar@gmail.com",
            mobil = null,
            username = "myusername";
        _person = new Person(personId, personGuid, displayname, username, email, mobil, false, false);
    });

    it("should create a new User and a Person successfully", inject(function ($q, $rootScope, UserService, LoginCache, PersonRepository, UUID, UserRepository) {
        var $scope = $rootScope.$new();

        spyOn(UUID, "newUUID").and.callFake(function (data) {
           return "01cebb3d-53fa-4768-9561-168c6f2b63be";
        });

        spyOn(UserService, "createUser").and.callFake(function (data) {
            expect(data).toEqual(_person);
            var deferred = $q.defer();
            deferred.resolve({isSuccess: true});
            return deferred.promise;
        });

        spyOn(PersonRepository, "createPerson").and.callFake(function (data) {
            var deferred = $q.defer();
            deferred.resolve({personTest: true});
            return deferred.promise;
        });

        UserRepository.createUserAndLogin(_person.displayname, _person.username, _person.email, _password).then(function (data) {
            expect(data).toEqual({personTest: true});
        });
        $scope.$digest();

        expect(PersonRepository.createPerson).toHaveBeenCalledWith(_person);

    }));

    it("should create a new User, but fail in UserService", inject(function ($q, $rootScope, UserService, LoginCache, PersonRepository, UUID, UserRepository) {
        var $scope = $rootScope.$new();

        spyOn(UUID, "newUUID").and.callFake(function (data) {
            return "01cebb3d-53fa-4768-9561-168c6f2b63be";
        });

        spyOn(UserService, "createUser").and.callFake(function (data) {
            expect(data).toEqual(_person);
            var deferred = $q.defer();
            deferred.reject("Error in the system!");
            return deferred.promise;
        });

        spyOn(PersonRepository, "createPerson").and.callFake(function (data) {
            var deferred = $q.defer();
            deferred.resolve({personTest: true});
            return deferred.promise;
        });

        UserRepository.createUserAndLogin(_person.displayname, _person.username, _person.email, _password)
            .then(function (data) {
                expect(data).not.toEqual({personTest: true});
            })
            .catch(function (reason) {
                expect(reason.name).toEqual('UserRepositoryException');
                expect(reason.message).toEqual('Error in the system!');
            })
        ;
        $scope.$digest();

        expect(PersonRepository.createPerson).not.toHaveBeenCalledWith(_person, _password);
    }));

    it("should create a new User, but fail in PersonRepository", inject(function ($q, $rootScope, UserService, LoginCache, PersonRepository, UUID, UserRepository) {
        var $scope = $rootScope.$new();

        spyOn(UUID, "newUUID").and.callFake(function (data) {
            return "01cebb3d-53fa-4768-9561-168c6f2b63be";
        });

        spyOn(UserService, "createUser").and.callFake(function (data) {
            var deferred = $q.defer();
            deferred.resolve({isSuccess: true});
            return deferred.promise;
        });

        spyOn(PersonRepository, "createPerson").and.callFake(function (data) {
            var deferred = $q.defer();
            deferred.reject({name: 'PersonRepositoryException', message: 'Bugs! in the system'});
            return deferred.promise;
        });

        UserRepository.createUserAndLogin(_person.displayname, _person.username, _person.email, _password)
            .then(function (data) {
                expect(data).toEqual({personTest: true});
            })
            .catch(function (reason) {
                expect(reason).toEqual({name: 'PersonRepositoryException', message: 'Bugs! in the system'});
            })
        ;
        $scope.$digest();

        expect(PersonRepository.createPerson).toHaveBeenCalledWith(_person);
    }));

    it("should create a new user and login successfully", inject(function ($q, $rootScope, UserService, LoginCache, UUID, UserRepository) {
        var $scope = $rootScope.$new();

        spyOn(UUID, "newUUID").and.callFake(function (data) {
            return "01cebb3d-53fa-4768-9561-168c6f2b63be";
        });

        spyOn(LoginCache, "saveUsername").and.callThrough();
        spyOn(LoginCache, "savePassword").and.callThrough();

        try {
            UserRepository.createUserAndLogin(_person.displayname, _person.username, _person.email, _password)
                .then(function (data) {
                    expect(LoginCache.saveUsername).toHaveBeenCalledWith(_person.username);
                    expect(LoginCache.savePassword).toHaveBeenCalledWith(_password);
                });

            $scope.$digest();
        }
        catch (err) {
            expect(err).toBeNull(err);
            throw err;
        }

    }));

    it("should fail if server returns unsuccessfully when creating user", inject(function ($q, $rootScope, UserService, LoginCache, UUID, UserRepository) {
        var $scope = $rootScope.$new();
        spyOn(LoginCache, "saveUsername").and.callThrough();
        spyOn(LoginCache, "savePassword").and.callThrough();

        spyOn(UUID, "newUUID").and.callFake(function (data) {
            return "01cebb3d-53fa-4768-9561-168c6f2b63be";
        });

        spyOn(UserService, "createUser").and.callFake(function (data) {
            var deferred = $q.defer();
            deferred.resolve({isSuccess: false}); // Test false
            return deferred.promise;
        });

        UserRepository.createUserAndLogin(_person.displayname, _person.username, _person.email, _password)
            .catch(function (reason) {
                expect(reason).not.toBeNull();
                expect(reason.name).toBe("UserRepositoryException");
            });

        $scope.$digest();

        expect(LoginCache.saveUsername).not.toHaveBeenCalled();
        expect(LoginCache.savePassword).not.toHaveBeenCalled();
    }));

    it("should fail if there is an exception with the UserService", inject(function ($q, $rootScope, UserService, LoginCache, UUID, UserRepository) {
        var $scope = $rootScope.$new();
        spyOn(LoginCache, "saveUsername").and.callThrough();
        spyOn(LoginCache, "savePassword").and.callThrough();
        spyOn(UUID, "newUUID").and.callFake(function (data) {
            return "01cebb3d-53fa-4768-9561-168c6f2b63be";
        });

        spyOn(UserService, "createUser").and.callFake(function (data) {
            var deferred = $q.defer();
            deferred.reject("for some reason!");
            return deferred.promise;
        });

        try {
            UserRepository.createUserAndLogin(_person.displayname, _person.username, _person.email, _password).then(function (data) {
                expect(data).toBeNull();
            }).then(function (reason) {
                expect(reason).not.toBeNull();
            });

            $scope.$digest();

            expect(LoginCache.saveUsername).not.toHaveBeenCalled();
            expect(LoginCache.savePassword).not.toHaveBeenCalled();
        }
        catch (err) {
            expect(err).toBeNull(err);
            throw err;
        }
    }));

});
