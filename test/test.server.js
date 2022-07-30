    // Endpoint testing with mocha and chai and chai-http

    // Import libraries
    import chai from "chai";
    import chaiHttp from "chai-http";
    const should = chai.should();
    var token;

    // Import server
    import server from "../index.js";


    // use chaiHttp for making the actual HTTP requests   
    chai.use(chaiHttp);
    describe('user API', function() {
        beforeEach(function(done) {
            token = process.env.JWT ;
            done();
        });

        afterEach(function(done) {
            console.log("succesfully tested");
            done();
        });

        it('should use get api', function(done) {
            chai.request(server)
                .get('/user/activate_video')
                .set('Authorization',token)
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.have.property('user');
                    res.body['user'].should.have.property('email');
                    res.body['user'].should.have.property('name');
                    res.body['user'].should.have.property('id');
                    done();
                });
        });
    });