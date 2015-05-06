describe("HttpWrappers: When using the mock instead of the real function", function () {

    var $scope, $q, PersonStore;

    beforeEach(function () {
        module("whooweswhat");
        module(MockProvideFactory.HttpWrapperMock);
    });

    it('should call success and the error delegates on HttpWrapper post', inject(function ($rootScope, HttpWrapper) {
        $scope = $rootScope.$new();
        var isRunningOk = false;
        var isRunningOkError = false;
        var username = "garg";
        var password = "asdasd";
        var email = "asd@asd.com";

        var user = { username: username, password: password, email: email};

        var result = HttpWrapper.post("testurl", user);
        result.successValue = user;
        result.errorValue = "my reason";
        result.success(function (data) {
                isRunningOk = true;
                expect(data).toBeDefined();
                expect(data).toEqual(user)
            })
            .error(function (reason) {
                isRunningOkError = true;

            });
        expect(isRunningOk).toBeTruthy();
        expect(isRunningOkError).toBeTruthy();
    }));

    it('should call success and the error delegates on HttpWrapper post', inject(function ($rootScope, HttpWrapper) {
        $scope = $rootScope.$new();
        var isRunningOk = false;
        var isRunningOkError = false;
        var username = "garg";
        var password = "asdasd";
        var email = "asd@asd.com";

        var user = { username: username, password: password, email: email};

        var result = HttpWrapper.get("testurl", user);
        result.successValue = user;
        result.errorValue = "my reason";
        result.success(function (data) {
                isRunningOk = true;
                expect(data).toBeDefined();
                expect(data).toEqual(user)
            })
            .error(function (reason) {
                isRunningOkError = true;

            });
        expect(isRunningOk).toBeTruthy();
        expect(isRunningOkError).toBeTruthy();
    }));


});