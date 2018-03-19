var request = require("request");

var baseUrl = "http://localhost:8081/api/v1/custom-groups";

describe("Groups Service Server", function () {
    it("Get Groups", function (done) {
        request.get(baseUrl, function (err, res, body) {
            var json = JSON.parse(body);
            expect(json.length).toBe(9);
            expect(res.statusCode).toBe(200);
            done();
        });
    });

    it("Get Málaga group", function (done) {
        var groupName = "Málaga";
        var year = "2017";
        request.get(baseUrl + "/" + groupName + "/" + year, function (err, res, body) {
            var json = JSON.parse(body);
            var groupNameReceived = json[0].groupName;
            var yearReceived = json[0].year;
            expect(json.length).toBe(1);
            expect(groupNameReceived).toEqual(groupName);
            expect(yearReceived).toEqual(year);
            expect(res.statusCode).toBe(200);
            done();
        });
    });

    it("Get not found group", function (done) {
        var groupName = "Prueba";
        var year = "2000";
        request.get(baseUrl + "/" + groupName + "/" + year, function (err, res, body) {
            expect(res.statusCode).toBe(404);
            expect(res.statusMessage).toBe("Not Found");
            done();
        });
    });

    it("Post without group", function (done) {
        var options = {
            url: baseUrl,
            method: 'POST',
            json: ''
        }
        request(options, function (err, res, body) {
            expect(res.statusCode).toBe(400);
            done();
        });
    });

    it("Post without groupName", function (done) {
        var options = {
            url: baseUrl,
            method: 'POST',
            json: { "year": "2017", "researchers": [{ "name": "José Antonio Troyano", "orcid": "0000-0002-9317-3626", "authorId": "55880417300" }] }
        }
        request(options, function (err, res, body) {
            expect(res.statusCode).toBe(422);
            done();
        });
    });

    it("Post without year", function (done) {
        var options = {
            url: baseUrl,
            method: 'POST',
            json: { "groupName": "Prueba", "researchers": [{ "name": "José Antonio Troyano", "orcid": "0000-0002-9317-3626", "authorId": "55880417300" }] }
        }
        request(options, function (err, res, body) {
            expect(res.statusCode).toBe(422);
            done();
        });
    });

    it("Post without authorObject", function (done) {
        var options = {
            url: baseUrl,
            method: 'POST',
            json: { "groupName": "Prueba", "year": "2017" }
        }
        request(options, function (err, res, body) {
            expect(res.statusCode).toBe(422);
            done();
        });
    });

    it("Post without name", function (done) {
        var options = {
            url: baseUrl,
            method: 'POST',
            json: { "groupName": "Prueba", "year": "2017", "researchers": [{ "orcid": "0000-0002-9317-3626", "authorId": "55880417300" }] }
        }
        request(options, function (err, res, body) {
            expect(res.statusCode).toBe(422);
            done();
        });
    });

    it("Post without orcid and authorId", function (done) {
        var options = {
            url: baseUrl,
            method: 'POST',
            json: { "groupName": "Prueba", "year": "2017", "researchers": [{ "name": "José Antonio Troyano" }] }
        }
        request(options, function (err, res, body) {
            expect(res.statusCode).toBe(422);
            done();
        });
    });

    it("Post without orcid and authorId", function (done) {
        var options = {
            url: baseUrl,
            method: 'POST',
            json: { "groupName": "Prueba", "year": "2017", "researchers": [{ "name": "José Antonio Troyano" }] }
        }
        request(options, function (err, res, body) {
            expect(res.statusCode).toBe(422);
            done();
        });
    });

    it("Correct post", function (done) {
        var options = {
            url: baseUrl,
            method: 'POST',
            json: { "groupName": "Prueba", "year": "2017", "researchers": [{ "name": "José Antonio Troyano", "orcid": "0000-0002-9317-3626", "authorId": "55880417300" }] }
        }
        request(options, function (err, res, body) {
            expect(res.statusCode).toBe(201);
            done();
        });
    });

    it("Check group has been created", function (done) {
        var groupName = "Prueba";
        var year = "2017";
        request.get(baseUrl + "/" + groupName + "/" + year, function (err, res, body) {
            var json = JSON.parse(body);
            var groupNameReceived = json[0].groupName;
            var yearReceived = json[0].year;
            expect(json.length).toBe(1);
            expect(groupNameReceived).toEqual(groupName);
            expect(yearReceived).toEqual(year);
            expect(res.statusCode).toBe(200);
            done();
        });
    });    

    it("Conflict post", function (done) {
        var options = {
            url: baseUrl,
            method: 'POST',
            json: { "groupName": "Prueba", "year": "2017", "researchers": [{ "name": "José Antonio Troyano", "orcid": "0000-0002-9317-3626", "authorId": "55880417300" }] }
        }
        request(options, function (err, res, body) {
            expect(res.statusCode).toBe(409);
            done();
        });
    });

    it("Correct post without orcid", function (done) {
        var options = {
            url: baseUrl,
            method: 'POST',
            json: { "groupName": "Prueba_sin_orcid", "year": "2017", "researchers": [{ "name": "José Antonio Troyano", "authorId": "55880417300" }] }
        }
        request(options, function (err, res, body) {
            expect(res.statusCode).toBe(201);
            done();
        });
    });

    it("Correct post without authorId", function (done) {
        var options = {
            url: baseUrl,
            method: 'POST',
            json: { "groupName": "Prueba_sin_authorId", "year": "2017", "researchers": [{ "name": "José Antonio Troyano", "orcid": "0000-0002-9317-3626" }] }
        }
        request(options, function (err, res, body) {
            expect(res.statusCode).toBe(201);
            done();
        });
    });

    it("Correct post with metadata", function (done) {
        var options = {
            url: baseUrl,
            method: 'POST',
            json: { "groupName": "Prueba_con_metadata", "year": "2017", "institute": "pepe", "researchers": [{ "name": "José Antonio Troyano", "orcid": "0000-0002-9317-3626", "authorId": "55880417300" }] }
        }
        request(options, function (err, res, body) {
            expect(res.statusCode).toBe(201);
            done();
        });
    });  

    it("Check group with metadata has been created", function (done) {
        var groupName = "Prueba_con_metadata";
        var year = "2017";
        request.get(baseUrl + "/" + groupName + "/" + year, function (err, res, body) {
            var json = JSON.parse(body);
            var groupNameReceived = json[0].groupName;
            var yearReceived = json[0].year;
            expect(json.length).toBe(1);
            expect(groupNameReceived).toEqual(groupName);
            expect(yearReceived).toEqual(year);
            expect(res.statusCode).toBe(200);
            done();
        });
    });       

    it("Delete group", function (done) {
        var groupName1 = "Prueba";
        var groupName2 = "Prueba_sin_orcid";
        var groupName3 = "Prueba_sin_authorId";
        var groupName4 = "Prueba_con_metadata";
        var year = "2017";
        request.delete(baseUrl + "/" + groupName1 + "/" + year, function (err, res, body) {
            expect(res.statusCode).toBe(204);
            done();
        });
        request.delete(baseUrl + "/" + groupName2 + "/" + year, function (err, res, body) {
            expect(res.statusCode).toBe(204);
            done();
        });
        request.delete(baseUrl + "/" + groupName3 + "/" + year, function (err, res, body) {
            expect(res.statusCode).toBe(204);
            done();
        });
        request.delete(baseUrl + "/" + groupName4 + "/" + year, function (err, res, body) {
            expect(res.statusCode).toBe(204);
            done();
        });        
    });

    it("Delete non existing group", function (done) {
        var groupName = "Test";
        var year = "2000";
        request.delete(baseUrl + "/" + groupName + "/" + year, function (err, res, body) {
            expect(res.statusCode).toBe(404);
            done();
        });
    });
    

});