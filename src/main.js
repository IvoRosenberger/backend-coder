import app from "./server.js";
import dotenv from 'dotenv';

//tuve que agregar el path porque no me encontraba la ruta del archivo
dotenv.config(
    {
        path: `../.env`
    }
);

//en funcion al archivo .env utiliza el puerto 8080
const PORT = process.env.PORT || 8081;

const server = app.listen(PORT, () => {
    console.log(
        `Servidor http escuchando en el puerto ${PORT}`
    );
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));

console.log(`Los productos y carritos se almacenarán en: ${process.env.PERS}`);