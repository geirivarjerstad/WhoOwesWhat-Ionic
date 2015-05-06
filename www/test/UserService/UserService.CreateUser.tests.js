describe('Unittest.UserService: When calling UserService->createUser', function () {

    beforeEach(function () {
        module("whooweswhat");
        module(MockProvideFactory.ServerUrlStoreMock);
        module(MockProvideFactory.HttpWrapperMock);
    });

    it('should successfully create a user', inject(function ($rootScope, HttpWrapper, ServerUrlStore, UserService, MockFactory) {
        var $scope = $rootScope.$new();

        var password = "mypassword";

        var personId = 1337,
            personGuid = "01cebb3d-53fa-4768-9561-168c6f2b63be",
            displayname = "GeirTest",
            email = "jerstad.geir.ivar@gmail.com",
            mobil = "123456789",
            username = "myusername";
        var person = new Person(personId, personGuid, displayname, username, email, mobil, false, false);


        spyOn(ServerUrlStore, 'getServerUrlOrDefault').and.returnValue("An URL!");

        var httpResult = MockFactory.HttpWrapperMock.post("testurl", person);
        httpResult.successValue = {isSuccess: true};

        spyOn(HttpWrapper, 'post').and.returnValue(
            httpResult
        );

        var wasDone = false;
        var result = UserService.createUser(person, password).then(
            function (data) {
                console.log("UserService=>createUser=>onSuccess", data);
                expect(data).toEqual({isSuccess: true});
            },
            function (reason) {
                console.log("Ajaxerror: UserService->createUser: " + reason);
                expect(reason).toBeNull();
            }).then(function () {
                wasDone = true;
            });

        // flush mock $httpBackend & promises
        $scope.$digest();

        expect(wasDone).toBe(true); // confirm callBacks were called
    }));

});