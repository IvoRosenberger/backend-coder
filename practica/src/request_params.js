 const { response } = require('express')
const express = require('express')

const app = express()
app.get('/saludo/:nombre', (request,response) =>{
    console.log(req.params);
    const nombre = request.params
    request.send('saludos a ${nombre}')
} )





app.listen(3001, () => {
    console.log("corriendo");
}) 