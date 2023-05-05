function log(req,res,next){
    console.log('Llamada a la funcion logger');
    next();
}

module.exports = log;