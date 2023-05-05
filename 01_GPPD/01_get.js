const express = require('express');
const app = express();

const usuarios = [
    {id:1,nombre:'User1'},
    {id:2,nombre:'User2'},
    {id:3,nombre:'User3'},
    {id:4,nombre:'User4'}
]



//app.get();//peticion
//app.post();//envio datos
//app.put();//actualizacion
//app.delete();//eliminacion
//request y respond   api de express documentacion


app.get('/',(req,res)=>{
    res.send('Hola mundo desde Express')
})

app.get('/api/usuarios',(req,res)=>{
    res.send(['user1,user2,user3'])
})

//Para recibir un parametro en la url    :
app.get('/api/usuarios/:id',(req,res)=>{
    res.send(req.params.id);
})

app.get('/api/usuarios/:anio/:mes',(req,res)=>{
    res.send(req.params);
})

//query string  /1920?hola=CHAU
app.get('/api/queryS/:anio',(req,res)=>{
    res.send(req.query);
})

app.get('/api/usuarioId/:id',(req,res)=>{
let usuario = usuarios.find(user => user.id === parseInt(req.params.id));
if(!usuario) res.status(404).send('El usuario no fue encontrado');
res.send(usuario)
})


//Desde la terminal export PORT=5000
//variable de entorno si existe o 3000
const port = process.env.PORT || 3000


//Levantar server y puerto
app.listen(port,()=>{
    console.log('Escuchando en el puerto ',port)
})