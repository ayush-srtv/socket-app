const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const {setup} = require('./db/db')
const {MESSAGE_TYPE, logAfterExecution, log} = require('./utils/logger.utils')
const {server: {port}} = require('./config/system.config.json')

/**
 * @author Ayush Srivastava <ayushs.1992@gmail.com>
 */

//bind listen with server context.
const listen = server.listen.bind(server)

setup()
    .then(() => log(MESSAGE_TYPE.MESSAGE, "Starting Server."))
    .then(() => logAfterExecution("Server Started Sucessfully!!", MESSAGE_TYPE.MESSAGE, listen, port))

app.get('/ping', function (req, res){
    res.send('pong')
})