const pine = require('pine');

const logger = pine();

class APILogger {
    
    info(msg) {
        logger.info(msg);
    };

    infoIssue(msg, data) {
        logger.info(`${msg}   ${data != undefined ? JSON.stringify(data) : ''}`);
    };

    error(msg) {
        logger.error(msg);
    };
};

module.exports = new APILogger();