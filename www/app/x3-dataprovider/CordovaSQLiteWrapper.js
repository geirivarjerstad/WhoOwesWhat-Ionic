(function () {

    var CordovaSQLiteWrapper = function ($cordovaSQLite) {
        return {
            execute: $cordovaSQLite.execute
        };
    };
    var module = angular.module("whooweswhat.dataproviders");
    module.factory(dataproviderNames.CordovaSQLiteWrapper, CordovaSQLiteWrapper);
}());