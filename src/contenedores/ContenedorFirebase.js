import admin from "firebase-admin";
import config from "../config.js";

admin.initializeApp({
    credential: admin.credential.cert(config.firebase),
});

const db = admin.firestore();

class ContenedorFirebase {
    constructor(nombreColeccion) {
        this.coleccion = db.collection(nombreColeccion);
    }

    async listar(id) {
        try {
            const doc = await this.coleccion.doc(id).get();
            if (!doc.exists) {
                return { Error: "¡Elemento no encontrado!" };
            } else {
                const data = doc.data();
                return { ...data, id };
            }
        } catch (error) {
            return { Error: `Error al listar por id: ${error}` };
        }
    }

    async listarAll() {
        try {
            const result = [];
            const snapshot = await this.coleccion.get();
            snapshot.forEach((doc) => {
                result.push({ id: doc.id, ...doc.data() });
            });
            return result;
        } catch (error) {
            return { Error: `Error al listar todo: ${error}` };
        }
    }

    async guardar(nuevoElem) {
        try {
            const guardado = await this.coleccion.add(nuevoElem);
            return { ...nuevoElem, id: guardado.id };
        } catch (error) {
            return { Error: `Error al guardar: ${error}` };
        }
    }

    async actualizar(nuevoElem) {
        try {
            await this.coleccion
                .doc(nuevoElem.id)
                .update(nuevoElem);
                return { Estado: '¡Elemento actualizado!' };
        } catch (error) {
            return { Error: `Error al actualizar: ${error}` };
        }
    }

    async borrar(id) {
        try {
            await this.coleccion.doc(id).delete();
            return { Estado: '¡Elemento eliminado!' };
        } catch (error) {
            return { Error: `Error al borrar por id: ${error}` };
        }
    }

    async borrarAll() {
        try {
            const docs = await this.listarAll();
            const ids = docs.map((d) => d.id);
            const promesas = ids.map((id) => this.borrar(id));
            const resultados = await Promise.allSettled(promesas);
            const errores = resultados.filter((r) => r.status == "rejected");
            if (errores.length > 0) {
                return { Error: `Error al borrar todo: ${error}` };
            }
        } catch (error) {
            return { Error: `Error al borrar todo: ${error}` };
        }
    }

    async desconectar() {}
}

export default ContenedorFirebase;