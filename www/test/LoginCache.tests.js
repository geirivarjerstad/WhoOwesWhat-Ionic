
describe("LoginCache: When checking if LoginCache have username and password", function () {

    var $scope, $q, PersonStore;

    beforeEach(function () {
        module("whooweswhat");
        module(MockProvideFactory.DSCacheFactoryMock);
    });

    it('should check succesfully', inject(function ($rootScope, DSCacheFactory, LoginCache) {
        $scope = $rootScope.$new();

        // call through to the Mock implementation
        spyOn(DSCacheFactory, "get").and.callFake(function (cacheKey) {
            expect(cacheKey).toBe("LoginCache");
            return {
                get: function(itemKey){
                    return "testItem";
                }
            };
        });

        var result = LoginCache.hasLoginDetails();

        $scope.$digest();

        expect(DSCacheFactory.get).toHaveBeenCalled();
        expect(result).toBeTruthy();
    }));


});