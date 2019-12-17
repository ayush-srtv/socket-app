const Promise = require('bluebird');


const connection = {
    setup: function (){
        return Promise.resolve();
    }
};

module.exports = { connection, ...connection };