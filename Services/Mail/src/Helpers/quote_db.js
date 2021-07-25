require('rootpath')();
const config =  require('config');
const mongoose = require('mongoose');

const conneOptMongoose = config.conneOptMongoose || {"useCreateIndex": true,"useNewUrlParser": true,"useUnifiedTopology": true,"useFindAndModify": false,"autoIndex": false}
// const connectionString = db_uri +  db_name;
const connectionString = "mongodb://localhost:27017/test"

global.user_conn = mongoose.createConnection(connectionString, conneOptMongoose);

module.exports = {
        Quotetable: require('../Modules/Quotes/Quote.schema')
    };