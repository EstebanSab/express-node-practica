const express = require('express');
const app = express();

//funcion middlware
//Le decimos a express que recibimos los parametros en tipo json
app.use(express.json())


const usuarios = [
    {id:1,nombre:'User1'},
    {id:2,nombre:'User2'},
    {id:3,nombre:'User3'},
    {id:4,nombre:'User4'}
]


//node diferencia las url por tipo post,get
app.get('/api/usuarios',(req,res)=>{
    res.send(usuarios)
})


app.post('/api/usuarios',(req,res)=>{
if(!req.body.nombre  || req.body.nombre.length <=2){
//400 bad request
res.status(400).send('Debe ingresar un nombre,o mas de tres')
return;
}

const usuario ={
    id:usuarios.length+1,
    nombre:req.body.nombre
};    
usuarios.push(usuario);
res.send(usuario)
})


//joi : sirve para hacer validaciones de una manera sencilla
const Joi = require('@hapi/joi');

app.post('/api/prueba',(req,res)=>{
    const schema = Joi.object({
        nombre : Joi.string().min(3).max(20).required()
    })   

    const {error,value} = schema.validate({nombre: req.body.nombre})
   if(!error){
        const usuario ={
            id:usuarios.length+1,
            nombre:value.nombre
    };    
    usuarios.push(usuario);
    res.send(usuario);

   }else{
    const mensaje = error.details[0].message
    res.status(400).send(mensaje)
   }
})
    
    
    
    
    

//Desde la terminal export PORT=5000
//variable de entorno si existe o 3000
const port =  3000


//Levantar server y puerto
app.listen(port,()=>{
    console.log('Escuchando en el puerto ',port)
})