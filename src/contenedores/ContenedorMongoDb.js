import mongoose from "mongoose";
import config from "../config.js";
import { asPOJO, renameField, removeField } from "../utils/objectUtils.js";


mongoose.set('strictQuery', true);
await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options);

class ContenedorMongoDb {
    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema);
    }

    async listar(id) {
        try {
            const docs = await this.coleccion.find({ _id: id }, { __v: 0 });
            if (docs.length == 0) {
                return { Error: "¡Elemento no encontrado!" };
            } else {
                const result = renameField(asPOJO(docs[0]), "_id", "id");
                return result;
            }
        } catch (error) {
            return { Error: `Error al listar por id: ${error}` };
        }
    }

    async listarAll() {
        try {
            let docs = await this.coleccion.find({}, { __v: 0 }).lean();
            docs = docs.map(asPOJO);
            docs = docs.map((d) => renameField(d, "_id", "id"));
            return docs;
        } catch (error) {
            return { Error: `Error al listar todo: ${error}` };
        }
    }

    async guardar(nuevoElem) {
        try {
            let doc = await this.coleccion.create(nuevoElem);
            doc = asPOJO(doc);
            renameField(doc, "_id", "id");
            removeField(doc, "__v");
            return doc;
        } catch (error) {
            return { Error: `Error al guardar: ${error}` };
        }
    }

    async actualizar(nuevoElem) {
        try {
            renameField(nuevoElem, "id", "_id");
            const { n, nModified } = await this.coleccion.replaceOne(
                { _id: nuevoElem._id },
                nuevoElem
            );
            if (n == 0 || nModified == 0) {
                return { Error: "¡Elemento no encontrado!" };
            } else {
                renameField(nuevoElem, "_id", "id");
                removeField(nuevoElem, "__v");
                return asPOJO(nuevoElem);
            }
        } catch (error) {
            return { Error: `Error al actualizar: ${error}` };
        }
    }

    async borrar(id) {
        try {
            const { n, nDeleted } = await this.coleccion.deleteOne({ _id: id });
            if (n == 0 || nDeleted == 0) {
                return { Error: "¡Elemento no encontrado!" };
            }
        } catch (error) {
            return { Error: `Error al borrar por id: ${error}` };
        }
    }

    async borrarAll() {
        try {
            await this.coleccion.deleteMany({});
        } catch (error) {
            return { Error: `Error al borrar todo: ${error}` };
        }
    }
}

export default ContenedorMongoDb;