
describe("Unittest.PersonStore: When getting all persons", function () {

    beforeEach(function () {
        module("whooweswhat");
        module(MockProvideFactory.CordovaSQLiteWrapperMock);
        module(MockProvideFactory.SQLiteDataProviderMock);
    });

    it('should get a list of Persons successfully', inject(function ($q, $rootScope, CordovaSQLiteWrapper, SQLiteDataProvider, PersonStore) {
        var $scope = $rootScope.$new();

        // call through to the Mock implementation
        spyOn(SQLiteDataProvider, "getDatabase").and.callThrough();
        var result = {
            rows : [{}, {}]
        };

        spyOn(CordovaSQLiteWrapper, "execute").and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve(result);
            return deferred.promise;
        });

        var isSuccessfull = false;
        PersonStore.getPersons().then(
            function(data){
                isSuccessfull = true;
            }
        ).catch(
            function(reason){
                expect(reason).toBeNull();
            }
        );

        $scope.$digest();

        expect(isSuccessfull).toBeTruthy();
        expect(SQLiteDataProvider.getDatabase).toHaveBeenCalled();
        expect(CordovaSQLiteWrapper.execute).toHaveBeenCalledWith("wow_unittest.db", 'SELECT personId, username, displayname, personGuid, email, mobil, existsOnServer, isDeleted FROM Person')
    }));


});