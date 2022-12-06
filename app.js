const express = require('express')
const ProductManager = require('./src/script')

const app = express()
const manager = new ProductManager('objeto.json')

app.get('/add', async (req,res) =>{
    const body = req.query

    const obj= await manager.addProd(body)

    res.json(obj)
}
)

app.listen(8080)