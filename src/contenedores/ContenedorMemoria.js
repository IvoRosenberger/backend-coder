class ContenedorMemoria {
    constructor() {
        this.elementos = [];
    }

    listar(id) {
        const elem = this.elementos.find((elem) => elem.id == id);
        if (!elem) {
            return { Error: "¡Elemento no encontrado!" };
        } else {
            return elem;
        }
    }

    listarAll() {
        return [...this.elementos];
    }

    guardar(elem) {
        let newId;
        if (this.elementos.length == 0) {
            newId = 1;
        } else {
            newId = this.elementos[this.elementos.length - 1].id + 1;
        }

        const newElem = { ...elem, id: newId };
        this.elementos.push(newElem);
        return { Estado: "¡Elemento guardado!" };
    }

    actualizar(elem) {
        const index = this.elementos.findIndex((p) => p.id == elem.id);
        if (index == -1) {
            return { Error: "¡Elemento no encontrado!" };
        } else {
            this.elementos[index];
            return { Estado: "¡Elemento actualizado!" };
        }
    }

    borrar(id) {
        const index = this.elementos.findIndex((elem) => elem.id == id);
        if (index == -1) {
            return { Error: "¡Elemento no encontrado!" };
        } else {
            this.elementos.splice(index, 1)[0];
            return { Estado: "¡Elemento eliminado!" };
        }
    }

    borrarAll() {
        this.elementos = [];
    }
}

export default ContenedorMemoria;