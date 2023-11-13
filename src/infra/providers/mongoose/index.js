const mongoose = require('mongoose');

class Mongoose {
    async init(uri) {
        await this.connect(uri);
    }

    async connect(uri) {
        await mongoose.connect(uri, {});
    }
}

module.exports = new Mongoose();
