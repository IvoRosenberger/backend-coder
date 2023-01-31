import { promises as fs } from "fs";
import config from "../config.js";

class ContenedorArchivo {
    constructor(ruta) {
        this.ruta = `${config.fileSystem.path}/${ruta}`;
    }

    async listar(id) {
        const objs = await this.listarAll();
        const buscado = objs.find((o) => o.id == id);
        if (buscado) {
            return buscado;
        } else {
            return { Error: "¡Elemento no encontrado!" };
        }
    }

    async listarAll() {
        try {
            const objs = await fs.readFile(this.ruta, "utf-8");
            return JSON.parse(objs);
        } catch (error) {
            return [];
        }
    }

    async guardar(obj) {
        const objs = await this.listarAll();

        let newId;
        if (objs.length == 0) {
            newId = 1;
        } else {
            newId = objs[objs.length - 1].id + 1;
        }

        const newObj = { ...obj, id: newId };
        objs.push(newObj);

        try {
            await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
            return { Estado: '¡Elemento guardado!' };
        } catch (error) {
            return { Error: `Error al guardar: ${error}` };
        }
    }

    async actualizar(elem) {
        const objs = await this.listarAll();
        const index = objs.findIndex((o) => o.id == elem.id);
        if (index == -1) {
            return { Error: "¡Elemento no encontrado!" };
        } else {
            objs[index] = elem;
            try {
                await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
            } catch (error) {
                return { Error: `Error al actualizar ${error}` };
            }
        }
    }

    async borrar(id) {
        const objs = await this.listarAll();
        const index = objs.findIndex((o) => o.id == id);
        if (index == -1) {
            return { Error: "¡Elemento no encontrado!" };
        }

        objs.splice(index, 1);
        try {
            await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
            return { Estado: '¡Elemento eliminado!' };
        } catch (error) {
            return { Error: `Error al borrar ${error}` };
        }
    }

    async borrarAll() {
        try {
            await fs.writeFile(this.ruta, JSON.stringify([], null, 2));
            return { Estado: '¡Elementos eliminados!' };
        } catch (error) {
            return { Error: `Error al borrar todo:  ${error}` };
        }
    }
}

export default ContenedorArchivo;