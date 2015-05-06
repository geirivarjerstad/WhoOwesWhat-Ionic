// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js


function AppException(exception, cause) {
    this.name = 'AppException';
    this.date = new Date();
    this.message = exception.message;
    this.message = exception.stack;
    this.cause = cause;
    console.error(this.name + ": " + exception.message + " ****")
}

AppException.prototype = new Error();
AppException.prototype.constructor = AppException;

var repositoryNames = {
    UserRepository: "UserRepository",
    PersonRepository: "PersonRepository",
    LoginRepository: "LoginRepository"
};

var serviceNames = {
    UserService: "UserService",
    LoginService: "LoginService",
    ErrorService: "ErrorService"
};

var dataproviderNames = {
    ServerUrlStore: "ServerUrlStore",
    SQLiteDataProvider: "SQLiteDataProvider",
    CordovaSQLiteWrapper: "CordovaSQLiteWrapper",
    HttpWrapper: "HttpWrapper",
    LoginCache: "LoginCache",
    ErrorStore: "ErrorStore",
    PersonStore: "PersonStore"
};

var toolNames = {
    PopupExtension: "PopupExtension",
    DSCacheFactory: "DSCacheFactory",
    IonicLoadingExtension: "IonicLoadingExtension",
    MockFactory: "MockFactory",
    UUID: "UUID"
};

var controllerNames = {
    ControllerNavigation: "ControllerNavigation",
    SettingsController: "SettingsController"
};

var moduleNames = {
    WhoOwesWhatDataproviders: "whooweswhat.dataproviders",
    WhoOwesWhatControllers: "whooweswhat.controllers",
    WhoOwesWhatRepositories: "whooweswhat.repositories"
};


angular.module('whooweswhat.directives', []);
angular.module('whooweswhat.repositories', []);
angular.module('whooweswhat.controllers', []);
angular.module('whooweswhat.dataproviders', []);
angular.module('whooweswhat', ['ionic', 'ngCordova', 'angular-data.DSCacheFactory', 'whooweswhat.controllers', 'whooweswhat.dataproviders', 'whooweswhat.repositories', 'whooweswhat.directives'])
    .run(function ($ionicPlatform, $cordovaSQLite) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            //if (window.cordova && window.cordova.plugins.Keyboard) {
            //    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            //}
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

            if (window.cordova) {
                console.log("My app is running Cordova");

                window.sqlitePlugin.deleteDatabase({name: "wow.db", location: 1}, function () {
                    console.log("Deleted database");
                }, function (error) {
                    console.log("Error deleting database: " + error);
                });

                var globalDatabase = window.sqlitePlugin.openDatabase({name: "wow.db", createFromLocation: 1});
            }
            else {
                console.log("App: My app is NOT running Cordova");
                var globalDatabase = window.openDatabase("wow.db", "1.0", "My app", -1);
                //$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS person (id integer primary key, firstname text, lastname text)");
                $cordovaSQLite.execute(globalDatabase, "DROP TABLE IF EXISTS Person");
                $cordovaSQLite.execute(globalDatabase, "CREATE TABLE [Person] (\
                    [personId] INTEGER  PRIMARY KEY AUTOINCREMENT NOT NULL,\
                    [personGuid] NVARCHAR(50)  UNIQUE NOT NULL,\
                    [displayname] NVARCHAR(255)  NOT NULL,\
                    [username] NVARCHAR(255)  UNIQUE NOT NULL,\
                    [email] NVARCHAR(255)  UNIQUE NOT NULL,\
                    [mobil] INTEGER  NULL,\
                    [existsOnServer] BOOLEAN  NULL,\
                    [isDeleted] BOOLEAN  NULL\
            )");
            }
        });
    })
    // register globals
    .
    value('globalData', _globalData)

    .config(function ($provide) {

        $provide.decorator("$exceptionHandler", function ($delegate, $injector) {
            return function (exception, cause) {
                var $rootScope = $injector.get("$rootScope");
                var ErrorStore = $injector.get("ErrorStore");

                console.error("$exceptionHandler **************");
                ErrorStore.addError(new AppException(exception, cause));
                $delegate(exception, cause);
            };
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            // setup an abstract state for the tabs directive
//            .state('tab', {
//                url: "/tab",
//                abstract: true,
//                templateUrl: "templates/tabs.html"
//            })
            .state('login', {
                url: '/login',
                templateUrl: 'app/x1-controller/Login/login.html'
            })
            .state('sqltest', {
                url: '/sqltest',
                templateUrl: 'app/x1-controller/Sqltest/sqltest.html'
            })

            .state('createuser', {
                url: '/createuser',
                templateUrl: 'app/x1-controller/User/createuser.html'
            })

            .state('errors', {
                url: '/errors',
                templateUrl: 'app/x1-controller/Error/error-simple.html'
            })

            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html"
            })
            .state('app.errors', {
                url: '/errors-index',
                views: {
                    'menuContent': {
                        templateUrl: 'app/x1-controller/Error/error-index.html'
                    }
                }
            })

            .state('app.settings', {
                url: '/settings',
                views: {
                    'menuContent': {
                        templateUrl: 'app/x1-controller/Settings/tab-settings.html'
                    }
                }
            })
        ;

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/login');
    })
    .run(function ($rootScope, $location, LoginCache) {

        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {
                console.log("$stateChangeStart: url:" + toState.url);
                if (toState.url === "/createuser") {
                    $location.path("/createuser");
                }
                else if (toState.url === "/errors") {
                    $location.path("/errors");
                }
                else if (toState.url === "/sqltest") {
                    $location.path("/sqltest");
                }
                else if (!LoginCache.hasLoginDetails()) {
                    if (toState.url === "/login") {
                    } else {
                        $location.path("/login");
//                        event.preventDefault();
                    }
                    //  $location.path("/login");
                }


                // transitionTo() promise will be rejected with
                // a 'transition prevented' error
            })
    })
;
