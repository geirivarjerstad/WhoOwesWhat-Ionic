describe("PersonRepository: When adding a new person", function () {

    var _person;
    var _password;

    beforeEach(function () {
        module("whooweswhat");
        module(MockProvideFactory.PersonStoreMock);

        _password = "myPassword";
        var personId = null,
            personGuid = "01cebb3d-53fa-4768-9561-168c6f2b63be",
            displayname = "GeirTest",
            email = "jerstad.geir.ivar@gmail.com",
            mobil = "123456789",
            username = "myusername";
        _person = new Person(personId, personGuid, displayname, username, email, mobil, false, false);
    });

    it("should create a new Person if personId is undefined/null, personGuid and username is unique", inject(function ($q, $rootScope, PersonStore, PersonRepository) {
        var $scope = $rootScope.$new();

        spyOn(PersonStore, "createPerson").and.callThrough();
        spyOn(PersonStore, "getPersonByUsername").and.callThrough();
        spyOn(PersonStore, "getPersonByGuid").and.callThrough();

        var isSuccess = false;

        PersonRepository.createPerson(_person).then(function (data) {
            isSuccess = true;
        });
        $scope.$digest();

        expect(isSuccess).toBeTruthy();
        expect(PersonStore.getPersonByUsername).toHaveBeenCalledWith(_person.username);
        expect(PersonStore.getPersonByGuid).toHaveBeenCalledWith(_person.personGuid);
        expect(PersonStore.createPerson).toHaveBeenCalledWith(_person);

    }));

    it("should fail when username exists", inject(function ($q, $rootScope, PersonStore, PersonRepository) {
        var $scope = $rootScope.$new();

        spyOn(PersonStore, "createPerson").and.callThrough();
        spyOn(PersonStore, "getPersonByUsername").and.callFake(function (data) {
            var deferred = $q.defer();
            deferred.resolve(angular.copy(_person));
            return deferred.promise;
        });

        spyOn(PersonStore, "getPersonByGuid").and.callThrough();

        var isSuccess = false;
        var isFailure = false;

        PersonRepository.createPerson(_person).then(function (data) {
            isSuccess = true;
        }).catch(function(){
            isFailure = true;
        });
        $scope.$digest();

        expect(isSuccess).toBeFalsy();
        expect(isFailure).toBeTruthy();
        expect(PersonStore.getPersonByUsername).toHaveBeenCalledWith(_person.username);
        expect(PersonStore.getPersonByGuid).not.toHaveBeenCalledWith(_person.personGuid);
        expect(PersonStore.createPerson).not.toHaveBeenCalledWith(_person);

    }));

    it("should fail when personGuid exists", inject(function ($q, $rootScope, PersonStore, PersonRepository) {
        var $scope = $rootScope.$new();

        spyOn(PersonStore, "createPerson").and.callThrough();
        spyOn(PersonStore, "getPersonByUsername").and.callThrough();

        spyOn(PersonStore, "getPersonByGuid").and.callFake(function (data) {
            var deferred = $q.defer();
            deferred.resolve(angular.copy(_person));
            return deferred.promise;
        });

        var isSuccess = false;
        var isFailure = false;

        PersonRepository.createPerson(_person).then(function (data) {
            isSuccess = true;
        }).catch(function(){
            isFailure = true;
        });
        $scope.$digest();

        expect(isSuccess).toBeFalsy();
        expect(isFailure).toBeTruthy();
        expect(PersonStore.getPersonByUsername).toHaveBeenCalledWith(_person.username);
        expect(PersonStore.getPersonByGuid).toHaveBeenCalledWith(_person.personGuid);
        expect(PersonStore.createPerson).not.toHaveBeenCalledWith(_person);

    }));

});
