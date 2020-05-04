const connectDB = async () => {
    const mongoose = require('mongoose');

    const db = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-tl4of.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

    console.log(db);
    
    console.log(`
    ${process.env.DB_USER}
    ${process.env.DB_PASS}
    ${process.env.DB_NAME}
    `);
    try{
        await mongoose.connect(db,{
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log('Mongo server is working');
        
    }catch(error) {
        console.log(error.message);
        process.exit(1);
        
    }

}
module.exports = connectDB;