const Promise = require('bluebird');

const notifications = {
    setup : function(){
        return Promise.resolve();        
    }
};

module.exports = {
    notifications,
    ...notifications
};