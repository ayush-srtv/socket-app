const {setup: setupConnection} = require('./connection');
const {setup: setupNotification} = require('./notification');

const socket = {
    setup : function (io){
        const notification = io.of('notification');
        const connection = io.of('connection');
        setupConnection(connection)
            .then(() => setup(notification));
    }
};

module.exports = {
    socket,
    ...socket
}