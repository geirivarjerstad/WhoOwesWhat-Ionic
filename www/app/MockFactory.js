(function () {

    var mockFactory = function ($q) {

        var _returnEmptySuccessPromise = function () {
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        };

        var _returnSuccessPromise = function () {
            var deferred = $q.defer();
            deferred.resolve({isSuccess: true});
            return deferred.promise;
        };

        var _returnEmptyArraySuccessPromise = function () {
            var deferred = $q.defer();
            deferred.resolve([
                {}
            ]);
            return deferred.promise;
        };

        var ErrorStoreMock = {
            addError: function () {
            },
            clearErrors: function () {
            },
            getErrors: function () {
            },
            getErrorsSortedDescending: function () {
            },
            getErrorsAsJson: function () {
            }
        };

        var ErrorServiceMock = {
            saveError: function () {
            }
        };

        var IonicLoadingExtensionMock = {
            showLoading: function () {
            },
            showLoadingForever: function () {
            },
            hideLoading: function () {
            },
            isHidden: function () {
            }
        };

        var PopupExtensionMock = {
            showAlert: function () {
            },
            showError: function () {
            }
        };
        var UserRepositoryMock = {
            createUserAndLogin: function () {
                return _returnSuccessPromise();
            }
        };

        var ControllerNavigationMock = {
            toCreateNewUser: function () {
            },
            toLogin: function () {
            },
            toPostMenu: function () {
            },
            toErrors: function () {
            }
        };

        var SQLiteDataProviderMock = {
            getDatabase: function () {
                return "wow_unittest.db";
            }
        };

        var CordovaSQLiteWrapperMock = {
            execute: function () {
                return _returnSuccessPromise();
            }
        };

        var DSCacheFactoryMock = {
            get: function () {
            },
            put: function () {

            }
        };

        var UserServiceMock = {
            createUser: function () {
                return _returnSuccessPromise();
            }
        };
        var PersonRepositoryMock = {
            createPerson: function () {
                return _returnSuccessPromise();
            }
        };

        var PersonStoreMock = {
            createPerson: function () {
                return _returnSuccessPromise();
            },
            updatePerson: function () {
                return _returnSuccessPromise();
            },
            getPersonHash: function () {
            },
            getInsertIntoQueryString: function () {
            },
            getUpdateQueryString: function () {
            },
            getBinding: function () {
            },

            getPerson: function () {
                return _returnEmptySuccessPromise();
            },
            getPersonByUsername: function () {
                return _returnEmptySuccessPromise();
            },
            getPersonByGuid: function () {
                return _returnEmptySuccessPromise();
            },
            getPersons: function () {
                return _returnEmptyArraySuccessPromise()
            }
        };

        var HttpWrapperMock = {
            post: function (url, model) {
                var result = {
                    successValue: null,
                    errorValue: null,
                    success: function (func) {
                        if (this.successValue !== null) {
                            func(this.successValue);
                        }
                        return result;
                    },
                    error: function (func) {
                        if (this.errorValue !== null) {
                            func(this.errorValue);
                        }
                        return result;
                    }
                };
                return result;
            },
            get: function (url) {
                var result = {
                    successValue: null,
                    errorValue: null,
                    success: function (func) {
                        if (this.successValue !== null) {
                            func(this.successValue);
                        }
                        return result;
                    },
                    error: function (func) {
                        if (this.errorValue !== null) {
                            func(this.errorValue);
                        }
                        return result;
                    }
                };
                return result;
            }
        };

        var ServerUrlStoreMock = {
            setServerUrl: function () {
            },
            getServerUrl: function () {
            },
            getServerUrlOrDefault: function () {
            },
            clearServerUrl: function () {
            },
            hasServerUrl: function () {
            }
        };

        var LoginCacheMock = {
            getUsername: function () {
            },
            saveUsername: function () {
            },
            getPassword: function () {
            },
            savePassword: function () {
            },
            hasLoginDetails: function () {
            },
            clearLoginCache: function () {
            }
        };

        return {
            ErrorServiceMock: ErrorServiceMock,
            IonicLoadingExtensionMock: IonicLoadingExtensionMock,
            PopupExtensionMock: PopupExtensionMock,
            ErrorStoreMock: ErrorStoreMock,
            ControllerNavigationMock: ControllerNavigationMock,
            SQLiteDataProviderMock: SQLiteDataProviderMock,
            DSCacheFactoryMock: DSCacheFactoryMock,
            UserServiceMock: UserServiceMock,
            LoginCacheMock: LoginCacheMock,
            ServerUrlStoreMock: ServerUrlStoreMock,
            PersonRepositoryMock: PersonRepositoryMock,
            CordovaSQLiteWrapperMock: CordovaSQLiteWrapperMock,
            UserRepositoryMock: UserRepositoryMock,
            PersonStoreMock: PersonStoreMock,
            HttpWrapperMock: HttpWrapperMock
        }
    };

    var module = angular.module("whooweswhat");
    module.factory(toolNames.MockFactory, mockFactory);

}());

// To Mock with $provider

//var MockFactory = {
//    ErrorStoreMock: function () {
//        this.addError = jasmine.createSpy('addError').and.callFake(function () {
//        });
//    }
//};
