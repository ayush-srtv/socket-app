
const construct = {
    mongoDbURI: function(config){
        return `${config.protocol}://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`
    }
}

module.exports = {
    construct
}