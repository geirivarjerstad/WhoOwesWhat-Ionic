(function () {
    
    function SQLiteDataProviderException(message) {
        this.name = this.constructor.name;
        this.message = message;
        console.error(this.name + ": " + message)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        } else {
            var stack = new Error().stack;
            if (typeof stack === "string") {
                stack = stack.split("\n");
                stack.shift();
                this.stack = stack.join("\n");
            }
        }
    }

    SQLiteDataProviderException.prototype = Object.create(Error.prototype, {
        constructor: {
            value: SQLiteDataProviderException,
            writable: true,
            configurable: true
        }
    });
    
    var sqliteDataProvider = function () {

        var _getDatabase = function () {
            var db = null;
            if (window.cordova) {
                console.log("My app is running Cordova");
                var db = window.sqlitePlugin.openDatabase({name: "wow.db", createFromLocation: 1});
                
            }
            else{
                console.log("My app is NOT running Cordova");
                var db = window.openDatabase("wow.db", "1.0", "My app", -1);
            }
            return db;

        };

        return {
            getDatabase: _getDatabase
        }
    };

    var module = angular.module("whooweswhat");
    module.factory(dataproviderNames.SQLiteDataProvider, sqliteDataProvider);

}());
