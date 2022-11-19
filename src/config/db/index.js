const mongoose = require('mongoose');

async function connect() {
    try {
        const MONGODB_URI = 'mongodb://localhost:27017/f8_education_dev';
        await mongoose.connect(MONGODB_URI, {
            // useCreateIndex: true,
            // useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('--- Database Connected OK !!! ---');
    } catch (error) {
        console.log('--- Error Database Connect Failed !!! ---', error);
    }
}

module.exports = { connect };
