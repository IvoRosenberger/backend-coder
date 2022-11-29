class ProductManager {
    constructor() {
        this.product = []
    }

    getProducts = () => { return this.product }


    getProductById = (id) => {
        const search = this.product.find(item => item.id === id)
        if (search == undefined) {
            return "Product Not Found"
        } else {
            return search
        }
    }

    getNextID = () => {
        const count = this.product.length
        if (count == 0) return 1
        const lastProd = this.product[count - 1]
        const lastID = lastProd.id
        const nextID = lastID + 1
        return nextID
    }

    idCode = () => {
        const codigo = Math.floor(Math.random(1) * 10000)
        const copiCode = this.product.some(item => item.code === codigo)
        if (copiCode === true) {
            return "ERROR"
        }
        return codigo
    }


    addProd = (title, description, price, thumbnail, stock) => {
        const id = this.getNextID()
        const code = this.idCode()


        const product = {
            id,
            title,
            description,
            price,
            thumbnail,
            stock: stock ?? 50,
            code
        }
        this.product.push(product)
    }
}

const newProd = new ProductManager()
newProd.addProd("Leche", "Lacteos", 120, "foto", null)
newProd.addProd("Mani", "Comida", 40, "foto", null)
newProd.addProd("Auriculares", "Computacion", 500, "foto", null)
newProd.addProd("TV 32'", "Electrodomesticos", 1200, "foto", null)
newProd.addProd("Mesa de luz", "Muebles", 600, "foto", null)
newProd.addProd("Mochila", "Varios", 80, "foto", null)
console.log("-----------Todos los Productos-----------");
console.log(newProd.getProducts());
console.log("-----------Productos por ID-----------");
console.log(newProd.getProductById(2));
console.log(newProd.getProductById(5));
console.log(newProd.getProductById(8));
console.log("-----------Fin de Codigo-----------");
