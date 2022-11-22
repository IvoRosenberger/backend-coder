class ProdcutManager {
    constructor(products) {
        this.events = []
    }


    getEvents = () => { return this.events }
    getNextID = () => {
        const count = this.events.length

        if (count == 0) return 1

        const lastEvent = this.events[count - 1]
        const lastID = this.lastEvent.id
        const nextID = lastID + 1

        return nextID
    }


    addProduct = (tittle, description, price, thumbnail, code, stock) => {
        const event = {
            tittle,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        this.events.push(event)

    }

    getProductById = () =>{
        const id = ProductManager.find(producto => producto.events.id === "1");

    }

    };









const producto = new ProdcutManager()
producto.addProduct("Licuadora", "gira re loca" , "$2321", "uwu", "1" , "2", "323")
console.log(producto.events);
console.log(producto.find(getProductById))


