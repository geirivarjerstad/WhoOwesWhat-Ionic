describe("UserController: When creating a new user", function () {

    beforeEach(function () {
        module("whooweswhat");
        module(MockProvideFactory.PopupExtensionMock);
        module(MockProvideFactory.UserRepositoryMock);
        module(MockProvideFactory.IonicLoadingExtensionMock);
        module(MockProvideFactory.ControllerNavigationMock);
        module(MockProvideFactory.ErrorStoreMock);
    });

    it('should create a User successfully', inject(function ($rootScope, $controller) {
        var $scope = $rootScope.$new();

        var UserController = $controller("UserController", {
            $scope: $scope
        });
        UserController.createUser();

        $scope.$digest();
    }));

});