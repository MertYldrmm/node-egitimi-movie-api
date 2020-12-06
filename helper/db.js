const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb+srv://movie-user:1907@movie-api.8iu0n.mongodb.net/movie-user?retryWrites=true&w=majority',{ useNewUrlParser: 
    true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
    
    mongoose.connection.on('open', () => {
        //console.log('MongoDB: Connected');
    });
    mongoose.connection.on('error', (err) => {
        console.log('MongoDB: Error', err);
    });

    mongoose.Promise = global.Promise;
}