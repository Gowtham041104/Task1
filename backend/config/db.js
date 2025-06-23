const mongoose = require("mongoose");
const dotenv = require('dotenv');
const connectDb =async()=>{
    try{
        const conn = await mongoose.connect((process.env.MONGO_URI),{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log("DB is connected")
    }
    catch(error){
        console.error("Error oops",error)
        process.exit(1)
    }
}

module.exports=connectDb