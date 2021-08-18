const mongoose = require('mongoose');

module.exports = function(){
    let schema = mongoose.Schema({
        id_usuario:{
            type: mongoose.Schema.ObjectId,
            ref: 'Usuario',
        },
        id_post:{
            type: mongoose.Schema.ObjectId,
            ref: 'Post',
        },
        texto:{
            type: 'String',
            required: true,
        }
    }) 
    return mongoose.model("Comentario", schema);
}();