describe("DomainDTO: When creating a DTO", function () {

    beforeEach(function () {
        module("whooweswhat");
    });

    it('should check succesfully', inject(function () {

        var person = new Person(1234, "1337");
        expect(person instanceof Person).toBeTruthy();

    }));


});