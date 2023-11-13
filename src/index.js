const mongoose = require('./infra/providers/mongoose');
const httpServer = require('./infra/providers/express');

const config = require('./config/config');
const logger = require('./config/logger');

const startServer = async () => {
    mongoose.init(config.mongoose.url, config.mongoose.options).then(() => {
        logger.info('Connected to MongoDB');

        httpServer.listen(config.port, () => {
            console.log('+---------------------------------------+');
            console.log('|                                       |');
            console.log('|              Aurora API               |');
            console.log(`|   🚀 Server ready at localhost:${config.port}   |`);
            console.log('|                                       |');
            console.log('\x1b[37m+---------------------------------------+');
        });
    });
};

startServer().catch((err) => {
    console.log(err);
});
