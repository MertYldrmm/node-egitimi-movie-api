const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);

let token, directorId;

describe('/api/directors tests', () => {
    before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send({ username: 'mert', password: '123456'})
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    });

    describe('/GET directors', () => {
        it('it should GET all the directors', (done) => {
            chai.request(server)
                .get('/api/directors')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('/POST director', () => {
        it('it should POST a director', (done) => {
            const director = {
                name: 'Sabahattin',
                surname: 'Ali',
                bio: "Eğridere'de doğan Sabahattin Ali, ilk hikâye ve şiir denemelerine Balıkesir'de başladıktan sonra İstanbul'daki edebiyat öğretmeni Ali Canip Yöntem'in desteğiyle ilk kez Akbaba ve Çağlayan dergilerinde şiirlerini yayımladı."
            };

            chai.request(server)
                .post('/api/directors')
                .send(director)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('surname');
                    res.body.should.have.property('bio');
                    directorId = res.body._id;
                    done();
                });
        });
    });

    describe('/GET/:director_id director', () => {
        it('it should GET a director by the given id', (done) => {
            chai.request(server)
                .get('/api/directors/'+ directorId)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

});