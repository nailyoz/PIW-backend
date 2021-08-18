const mongoose = require("mongoose");

module.exports = function(){
    let schema = mongoose.Schema({
        id_usuario:{
            type: mongoose.Schema.ObjectId,
            ref: 'Usuario',
        },
        texto:{
            type: "String",
            required: true,
        },
        likes:{
            type: "number",
            required: true, 
        }
    })
    return mongoose.model("Post", schema);
}();