//var MockProvideFactory = function ($provide) {
//    $provide.factory(dataproviderNames.SQLiteDataProvider, function (MockFactory) {
//        return MockFactory.SQLiteDataProviderMock;
//    });
//
//    $provide.factory(dataproviderNames.CordovaSQLiteWrapper, function (MockFactory) {
//        return MockFactory.CordovaSQLiteWrapperMock;
//    });
//
//    $provide.factory(toolNames.DSCacheFactory, function (MockFactory) {
//        return MockFactory.DSCacheFactoryMock;
//    });
//};

var MockProvideFactory = {
    SQLiteDataProviderMock: function ($provide) {
        $provide.factory(dataproviderNames.SQLiteDataProvider, function (MockFactory) {
            return MockFactory.SQLiteDataProviderMock;
        })
    },
    CordovaSQLiteWrapperMock: function ($provide) {
        $provide.factory(dataproviderNames.CordovaSQLiteWrapper, function (MockFactory) {
            return MockFactory.CordovaSQLiteWrapperMock;
        })
    },
    DSCacheFactoryMock: function ($provide) {
        $provide.factory(toolNames.DSCacheFactory, function (MockFactory) {
            return MockFactory.DSCacheFactoryMock;
        })
    },
    LoginCacheMock: function ($provide) {
        $provide.factory(toolNames.LoginCache, function (MockFactory) {
            return MockFactory.LoginCacheMock;
        })
    },
    UserServiceMock: function ($provide) {
        $provide.factory(serviceNames.UserService, function (MockFactory) {
            return MockFactory.UserServiceMock;
        })
    },
    HttpWrapperMock: function ($provide) {
        $provide.factory(dataproviderNames.HttpWrapper, function (MockFactory) {
            return MockFactory.HttpWrapperMock;
        })
    },
    PersonStoreMock: function ($provide) {
        $provide.factory(dataproviderNames.PersonStore, function (MockFactory) {
            return MockFactory.PersonStoreMock;
        })
    },
    PersonRepositoryMock: function ($provide) {
        $provide.factory(dataproviderNames.PersonRepository, function (MockFactory) {
            return MockFactory.PersonRepositoryMock;
        })
    },
    ServerUrlStoreMock: function ($provide) {
        $provide.factory(dataproviderNames.ServerUrlStore, function (MockFactory) {
            return MockFactory.ServerUrlStoreMock;
        })
    },

    ControllerNavigationMock: function ($provide) {
        $provide.factory(controllerNames.ControllerNavigation, function (MockFactory) {
            return MockFactory.ControllerNavigationMock;
        })
    },
    ErrorStoreMock: function ($provide) {
        $provide.factory(dataproviderNames.ErrorStore, function (MockFactory) {
            return MockFactory.ErrorStoreMock;
        })
    },
    IonicLoadingExtensionMock: function ($provide) {
        $provide.factory(toolNames.IonicLoadingExtension, function (MockFactory) {
            return MockFactory.IonicLoadingExtensionMock;
        })
    },
    UserRepositoryMock: function ($provide) {
        $provide.factory(repositoryNames.UserRepository, function (MockFactory) {
            return MockFactory.UserRepositoryMock;
        })
    },
    PopupExtensionMock: function ($provide) {
        $provide.factory(toolNames.PopupExtension, function (MockFactory) {
            return MockFactory.PopupExtensionMock;
        })
    }

};

