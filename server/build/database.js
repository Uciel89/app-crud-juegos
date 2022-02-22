"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*====/ IMPORTAMOS LA LIBRERIA MYSQL /==== */
const promise_mysql_1 = __importDefault(require("promise-mysql"));
const keys_1 = __importDefault(require("./keys"));
// Creamos la conexion con la base de datos
const pool = promise_mysql_1.default.createPool(keys_1.default.database);
// Cremos la conexion para realizar consultas a la base de datos
pool.getConnection()
    .then(connection => {
    // En caso de que exista una connecion con la BD, tomamos esa coneccion que nos etra como parametro y mediante .releaseConnection activo la coneccion entre mi proyecto y la base de datos
    pool.releaseConnection(connection);
    console.log("DB is connected");
});
// Exportamos la coneccion
exports.default = pool;
