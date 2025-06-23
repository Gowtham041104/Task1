const mongoose = require('mongoose');
 const productSchema= new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    features:{
        type:String,
    }
 },{timestamps:true})

 
module.exports = mongoose.model('Product', productSchema);
