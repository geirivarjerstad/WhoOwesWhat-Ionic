describe("Unittest.PersonStore: When adding a Person", function () {

    var $scope, $q, PersonStore;

    beforeEach(function () {
        module("whooweswhat");
        module(MockProvideFactory.CordovaSQLiteWrapperMock);
        module(MockProvideFactory.SQLiteDataProviderMock);
    });

    it('should create a Person successfully', inject(function ($rootScope, CordovaSQLiteWrapper, SQLiteDataProvider, PersonStore) {
        $scope = $rootScope.$new();

        // call through to the Mock implementation
        spyOn(SQLiteDataProvider, "getDatabase").and.callThrough();
        spyOn(CordovaSQLiteWrapper, "execute").and.callThrough();
        var personId = null,
            personGuid = "01cebb3d-53fa-4768-9561-168c6f2b63be",
            displayname = "GeirTest",
            email = "jerstad.geir.ivar@gmail.com",
            mobil = "123456789",
            username = "myusername";
        var person = new Person(personId, personGuid, displayname, username, email, mobil, false, false);
        var expectedBinding = [personId, personGuid, displayname, username, email, mobil, false, false];
        var expectSuccess = false;

        PersonStore.createPerson(person)
            .then(function () {
                expectSuccess = true;
            })
            .catch(function (reason) {
                // expect no errors
                expect(reason).toBeNull();
            });

        $scope.$digest();

        expect(expectSuccess).toBeTruthy();
        expect(SQLiteDataProvider.getDatabase).toHaveBeenCalled();
        expect(CordovaSQLiteWrapper.execute).toHaveBeenCalledWith(
            "wow_unittest.db",
            'INSERT INTO Person (personId, personGuid, displayname, username, email, mobil, existsOnServer, isDeleted) VALUES (?,?,?,?,?,?,?,?)',
            expectedBinding)

    }));

    it('should update a Person successfully', inject(function ($rootScope, CordovaSQLiteWrapper, SQLiteDataProvider, PersonStore) {
        $scope = $rootScope.$new();

        // call through to the Mock implementation
        spyOn(SQLiteDataProvider, "getDatabase").and.callThrough();
        spyOn(CordovaSQLiteWrapper, "execute").and.callThrough();
        var personId = 1,
            personGuid = "01cebb3d-53fa-4768-9561-168c6f2b63be",
            displayname = "GeirTest",
            email = "jerstad.geir.ivar@gmail.com",
            mobil = "123456789",
            username = "myusername";
        var person = new Person(personId, personGuid, displayname, username, email, mobil, false, false);
        var expectedBinding = [personGuid, displayname, username, email, mobil, false, false];
        var expectSuccess = false;

        PersonStore.updatePerson(person)
            .then(function () {
                expectSuccess = true;
            })
            .catch(function (reason) {
                // expect no errors
                expect(reason).toBeNull();
            });

        $scope.$digest();

        expect(expectSuccess).toBeTruthy();
        expect(SQLiteDataProvider.getDatabase).toHaveBeenCalled();
        expect(CordovaSQLiteWrapper.execute).toHaveBeenCalledWith(
            "wow_unittest.db",
            'UPDATE Person SET personGuid = ?, displayname = ?, username = ?, email = ?, mobil = ?, existsOnServer = ?, isDeleted = ? WHERE personId = ' + personId,
            expectedBinding)

    }));

});