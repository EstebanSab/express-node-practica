const express = require('express');
const Joi = require('@hapi/joi');

const app = express();
const schema = Joi.object({
    nombre : Joi.string().min(3).max(20).required()
})



//funcion middlware
//Le decimos a express que recibimos los parametros en tipo json
app.use(express.json())


const usuarios = [
    {id:1,nombre:'User1'},
    {id:2,nombre:'User2'},
    {id:3,nombre:'User3'},
    {id:4,nombre:'User4'}
]

app.get('/api/usuarios',(req,res)=>{
    res.send(usuarios)
})

//joi : sirve para hacer validaciones de una manera sencilla
app.post('/api/usuarios',(req,res)=>{
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

app.put('/api/usuarios/:id',(req,res)=>{  
    //Input cumpla las condiciones
    const {error,value} = schema.validate({nombre: req.body.nombre})

    if(error){
        const mensaje = error.details[0].message
        res.status(400).send(mensaje)
        return;
    }
    
    //El usuario debe existir
    let usuario = usuarios.find(user => user.id === parseInt(req.params.id));
    if(!usuario){
        res.status(404).send('El usuario no fue encontrado');
        return;
    } 
    
    usuario.nombre = value.nombre;
    res.send(usuario)
    


})
    
    
    
    
    


const port =  3000
//Levantar server y puerto
app.listen(port,()=>{
    console.log('Escuchando en el puerto ',port)
})