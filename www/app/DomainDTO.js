function Person(personId, personGuid, displayname, username, email, mobil, existsOnServer, isDeleted) {
    this.personId = personId;
    this.personGuid = personGuid;
    this.displayname = displayname;
    this.username = username;
    this.email = email;
    this.mobil = mobil;
    this.existsOnServer = existsOnServer;
    this.isDeleted = isDeleted;
}

Person.prototype = new Object();
Person.prototype.constructor = Person;

