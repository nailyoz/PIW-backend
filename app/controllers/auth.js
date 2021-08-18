const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const jwt = require ("jsonwebtoken")

module.exports.logar = function(req,res){
    function falhar(){
    res.status(401).send("Login inválido");
    }
    Usuario.findOne({email: req.body.email})
        .then(function(usuario){
            if(bcrypt.compareSync(req.body.senha, usuario.senha)){
                let token = jwt.sign({id: usuario._id}, "senha_secreta");
                res.status(200).json({token:token});
            }else{
                falhar();
            }
        })
        .catch(function(error){
            falhar();
        })
}

module.exports.checar = function(req,res,next){
    console.log(req.header);
    jwt.verify(req.headers.token,"senha_secreta", function(error,decoded){
        if(error){
            res.status(401).send("Token invalido");
        }
        next();
    })
};
