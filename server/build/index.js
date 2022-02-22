"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*====/ SERVER SETTINGS /====*/
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
/*=== Importamos las rutas === */
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const gamesRoutes_1 = __importDefault(require("./routes/gamesRoutes"));
/* === Definimos nuestro servidor === */
class Server {
    // Inicializamos express
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    // Metodo para configurar la propiedad app. Establecemos que no retorne nada porque solo es para realizar las configuraciones de app
    config() {
        // Defino el puerto
        this.app.set('port', process.env.PORT || 3000);
        // Morgan -> nos muestra las peticiones que realiza la parte cliente 
        this.app.use((0, morgan_1.default)('dev'));
        // Cors -> permite a Angular pedir los datos a nuestro servidor
        this.app.use((0, cors_1.default)());
        //express.json -> permite a nuestro servidor entender archivos json
        this.app.use(express_1.default.json());
        //configuracion para enviar datos por formulario
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    //Metodo para definis las rutas de mi servidor
    routes() {
        this.app.use('/', indexRoutes_1.default);
        //agregamos el prefijo /app/games
        this.app.use('/api/juegos', gamesRoutes_1.default);
    }
    //Metodo para inicializar nuestro servidor (ejecutar el tipico app.listen)
    start() {
        // Agregamos el .listen para que el servidor se quede escuchando el inicio del mismo.
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server on port ${this.app.get('port')}`);
        });
    }
}
const server = new Server();
server.start();
