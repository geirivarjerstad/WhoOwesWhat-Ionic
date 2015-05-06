
describe("PersonStore: When creating insert into query", function () {

    beforeEach(function () {
        module("whooweswhat");
        module(MockProvideFactory.CordovaSQLiteWrapperMock);
        module(MockProvideFactory.SQLiteDataProviderMock);
    });

    it('should map Person correctly', inject(function (PersonStore) {
        var personId = 1337,
            personGuid = "01cebb3d-53fa-4768-9561-168c6f2b63be",
            displayname = "GeirTest",
            email = "jerstad.geir.ivar@gmail.com",
            mobil = "123456789",
            username = "myusername";
        var person = new Person(personId, personGuid, displayname, username, email, mobil, false, false);
        expect(person.personId).toBe(personId);
        expect(person.personGuid).toBe(personGuid);
        expect(person.displayname).toBe(displayname);
        expect(person.email).toBe(email);
        expect(person.mobil).toBe(mobil);
        expect(person.username).toBe(username);
        expect(person.existsOnServer).toBe(false);
        expect(person.isDeleted).toBe(false);
    }));

    it('should map Person correctly', inject(function ($rootScope, PersonStore) {
        var $scope = $rootScope.$new();

        var personId = 1337,
            personGuid = "01cebb3d-53fa-4768-9561-168c6f2b63be",
            displayname = "GeirTest",
            email = "jerstad.geir.ivar@gmail.com",
            mobil = "123456789",
            username = "myusername";
        var person = new Person(personId, personGuid, displayname, username, email, mobil, false, false);


    }));

    it('should get INSERT querystring correctly', inject(function ($rootScope, PersonStore) {
        var $scope = $rootScope.$new();

        var personId = 1337,
            personGuid = "01cebb3d-53fa-4768-9561-168c6f2b63be",
            displayname = "GeirTest",
            email = "jerstad.geir.ivar@gmail.com",
            mobil = "123456789",
            username = "myusername";
        var person = new Person(personId, personGuid, displayname, username, email, mobil, false, false);

        var map = PersonStore.getPersonHash(person);
        var query = PersonStore.getInsertIntoQueryString(map);
        $scope.$digest();

        expect(query).toBe('INSERT INTO Person (personId, personGuid, displayname, username, email, mobil, existsOnServer, isDeleted) VALUES (?,?,?,?,?,?,?,?)');

    }));

    it('should get UPDATE querystring correctly', inject(function ($rootScope, PersonStore) {
        var $scope = $rootScope.$new();

        var personId = 1337,
            personGuid = "01cebb3d-53fa-4768-9561-168c6f2b63be",
            displayname = "GeirTest",
            email = "jerstad.geir.ivar@gmail.com",
            mobil = "123456789",
            username = "myusername";
        var person = new Person(personId, personGuid, displayname, username, email, mobil, false, false);

        var map = PersonStore.getPersonHash(person, true);
        var query = PersonStore.getUpdateQueryString(person.personId, map);
        $scope.$digest();

        expect(query).toBe('UPDATE Person SET personGuid = ?, displayname = ?, username = ?, email = ?, mobil = ?, existsOnServer = ?, isDeleted = ? WHERE personId = 1337');

    }));

    it('should create Binding correctly', inject(function (PersonStore) {

        var personId = 1337,
            personGuid = "01cebb3d-53fa-4768-9561-168c6f2b63be",
            displayname = "GeirTest",
            email = "jerstad.geir.ivar@gmail.com",
            mobil = "123456789",
            username = "myusername";
        var person = new Person(personId, personGuid, displayname, username, email, mobil, false, false);
        var expectedBinding = [personId, personGuid, displayname, username, email, mobil, false, false];
        var map = PersonStore.getPersonHash(person);
        var binding = PersonStore.getBinding(map);

        expect(binding).toEqual(expectedBinding);

    }));


});