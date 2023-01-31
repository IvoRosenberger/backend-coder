import { Router } from "express";
import { carritosDao, productosDao } from "../daos/index.js";

const carritosRouter = Router();

//configuracion del carrito
carritosRouter.post("/", async (req, res) => {
    const carroAgregado = await carritosDao.guardar(req.body);
    res.json(carroAgregado);
});

carritosRouter.get("/", async (req, res) => {
    const carritos = await carritosDao.listarAll();
    res.json(carritos);
});

carritosRouter.delete("/:id", async (req, res) => {
    const carroEliminado = await carritosDao.borrar(req.params.id);
    res.json(carroEliminado);
});


//productos en el carrito:

carritosRouter.get('/:id/productos', async (req, res) => {
    const carrito = await carritosDao.listar(req.params.id)
    res.json(carrito.productos)
})

carritosRouter.post('/:id/productos', async (req, res) => {
    const carrito = await carritosDao.listar(req.params.id)
    const producto = await productosDao.listar(req.body.id)
    carrito.productos.push(producto)
    await carritosDao.actualizar(carrito)
    res.end()
})

carritosRouter.delete('/:id/productos/:idProd', async (req, res) => {
    const carrito = await carritosDao.listar(req.params.id)
    const index = carrito.productos.findIndex(p => p.id == req.params.idProd)
    if (index != -1) {
        carrito.productos.splice(index, 1)
        await carritosDao.actualizar(carrito)
    }
    res.end()
})


export { carritosRouter };