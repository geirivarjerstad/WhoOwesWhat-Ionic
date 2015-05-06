describe("MockFactory", function () {

    var $injector, mockFactory;

    beforeEach(function () {
        module("whooweswhat");
        inject(function (_$injector_) {
            $injector = _$injector_;
            mockFactory  = $injector.get(toolNames.MockFactory);
        });
    });

    it("should check all Mocks to be valid against real implementation", (function () {

        expect(getMethods(mockFactory.ErrorStoreMock)).toEqual(getMethods($injector.get(dataproviderNames.ErrorStore)));
        expect(getMethods(mockFactory.ErrorServiceMock)).toEqual(getMethods($injector.get(serviceNames.ErrorService)));
        expect(getMethods(mockFactory.IonicLoadingExtensionMock)).toEqual(getMethods($injector.get(toolNames.IonicLoadingExtension)));

        expect(getMethods(mockFactory.ControllerNavigationMock)).toEqual(getMethods($injector.get(controllerNames.ControllerNavigation)));

        expect(getMethods(mockFactory.PopupExtensionMock)).toEqual(getMethods($injector.get(toolNames.PopupExtension)));
        expect(getMethods(mockFactory.SQLiteDataProviderMock)).toEqual(getMethods($injector.get(dataproviderNames.SQLiteDataProvider)));
        expect(getMethods(mockFactory.ServerUrlStoreMock)).toEqual(getMethods($injector.get(dataproviderNames.ServerUrlStore)));
        expect(getMethods(mockFactory.CordovaSQLiteWrapperMock)).toEqual(getMethods($injector.get(dataproviderNames.CordovaSQLiteWrapper)));
        expect(getMethods(mockFactory.LoginCacheMock)).toEqual(getMethods($injector.get(dataproviderNames.LoginCache)));
        expect(getMethods(mockFactory.UserServiceMock)).toEqual(getMethods($injector.get(serviceNames.UserService)));

        expect(getMethods(mockFactory.PersonRepositoryMock)).toEqual(getMethods($injector.get(repositoryNames.PersonRepository)));
        expect(getMethods(mockFactory.UserRepositoryMock)).toEqual(getMethods($injector.get(repositoryNames.UserRepository)));
        expect(getMethods(mockFactory.PersonStoreMock)).toEqual(getMethods($injector.get(dataproviderNames.PersonStore)));
        //
        //expect(getMethods(mockFactory.DSCacheFactoryMock)).toEqual(getMethods($injector.get(toolNames.DSCacheFactory)));

    }));

    it("should return a wrapper for the http service", (function () {


    }));

});