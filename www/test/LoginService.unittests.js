describe('Unittest.UserService: When calling UserService->createUser', function () {
    var $scope, $httpBackend;
    var UserService, ServerUrlStore, LoginService, LoginCache;
    var user;
    beforeEach(module('whooweswhat'));

    beforeEach(function () {
        module("whooweswhat");
        module(MockProvideFactory.LoginCacheMock);
        module(MockProvideFactory.ServerUrlStoreMock);
        module(MockProvideFactory.HttpWrapperMock);
    });

    it('should make a mocked XHR GET for Authentication success', inject(function ($rootScope, ServerUrlStore, MockFactory, HttpWrapper, LoginService) {
        var $scope = $rootScope.$new();

        spyOn(ServerUrlStore, 'getServerUrlOrDefault').and.returnValue("An URL!");
        var httpResult = MockFactory.HttpWrapperMock.post("testurl", user);
        httpResult.successValue = {isSuccess: true, userExists: true};

        spyOn(HttpWrapper, 'get').and.returnValue(
            httpResult
        );


        var wasDone = false;
        LoginService.authenticate("asdasd", "asdasd").then(
            function (data) {
                console.log("LoginRepository=>authenticate=>onSuccess", data);
                expect(data).toEqual({isSuccess: true, userExists: true});
            },
            function (reason) {
                console.log("Ajaxerror: LoginRepository->authenticate: " + reason);
                console.log(reason);
            }).then(function () {
                wasDone = true;
            });

        $scope.$digest();

        expect(wasDone).toBe(true);
    }));

});
