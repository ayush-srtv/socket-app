const Promise = require('bluebird');
const compose = require('lodash/fp/compose');

const MESSAGE_TYPE = {
    ERROR: "error",
    WARNING: "warn",
    MESSAGE: "log"
}

const validateMessageType = type => !!console[type]

const getLoggerByType = type => console[type]

const showMessage = (type, message) => getLoggerByType(type)(message)

const validateType = function (type) {
    if(!validateMessageType(type)){
        throw Error('unknown type provided to logMessage()');
    }  
}

const validateTypePure = function (type, message) {
    validateType(type);
    return { type, message };
}

const showMessagePure = function ({type, message}) {
    showMessage(type, message);
}

const logger = {
    /**
     * @method logMessage
     * @param message log message
     * @param type log type
     * @param func function to be executed after log
     * @param params function params.
     */
    logMessageBeforeExecution: function(message, type, func, ...params){
        validateType(type)
        showMessage(type, message)
        
        return func(...params)
    },
    /**
     * @method logMessageAfterExecution
     * @param message log message
     * @param type log type
     * @param func function to be executed before log
     * @param function params
     */
    logMessageAfterExecution: function(message, type, func, ...params){
        validateType(type)
        let possiblePromise = func(...params)
        const isPromise = possiblePromise instanceof Promise
        
        if(isPromise){
            return possiblePromise
                    .then((response)=>{
                        showMessage(type, message);
                        return response;
                    })
        }

        showMessage(type, message)
        return possiblePromise
    },
    /**
     * @TODO fix invoked function, make them more pure.
     */
    logMessage: compose(showMessagePure, validateTypePure),

};

module.exports = { 
    MESSAGE_TYPE, 
    logger,
    log: logger.logMessage, 
    logBeforeExecution: logger.logMessageBeforeExecution,
    logAfterExecution: logger.logMessageAfterExecution
}
