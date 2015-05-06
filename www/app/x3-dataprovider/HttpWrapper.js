(function () {

    var HttpWrapper = function ($http) {
        return {
            post: $http.post,
            get: $http.get
        };
    };
    var module = angular.module("whooweswhat.dataproviders");
    module.factory(dataproviderNames.HttpWrapper, HttpWrapper);
}());