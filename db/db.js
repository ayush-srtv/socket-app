const mongoose = require('mongoose')
const {db: dbConfig} = require('../config/system.config.json')
const {MESSAGE_TYPE, log, logAfterExecution} = require('../utils/logger.utils')
const {construct} = require('../utils/construct.utils')

/**
 * Replace native promises with bluebird promises.
 */
mongoose.Promise = require('bluebird');

const dbURI = construct.mongoDbURI(dbConfig)

//bind mongoose with mongoose context as mongoose lib uses this context to access connection method.
const connect = mongoose.connect.bind(mongoose)

const db = {
    /**
     * @method: setup.
     * @param: unknown.
     * @return: db connection object.
     */
    setup: function (){
        log(MESSAGE_TYPE.MESSAGE, "Connecting to mongodb.")
        return logAfterExecution("Connected Sucessfully!!", MESSAGE_TYPE.MESSAGE, connect, dbURI, { useNewUrlParser: true })
            .catch((error) => log(MESSAGE_TYPE.ERROR, error))
    },
    query: function (){

    },
    update: function (){

    },
    delete: function (){

    }
}


module.exports = {
    db,
    setup: db.setup,
    query: db.query,
    update: db.update,
    delete: db.delete
}