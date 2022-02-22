/*====/ IMPORTAMOS LA LIBRERIA MYSQL /==== */
import mysql from 'promise-mysql';
import keys from './keys'

// Creamos la conexion con la base de datos
const pool = mysql.createPool(keys.database);

// Cremos la conexion para realizar consultas a la base de datos
pool.getConnection()
    .then(connection => {
        // En caso de que exista una connecion con la BD, tomamos esa coneccion que nos etra como parametro y mediante .releaseConnection activo la coneccion entre mi proyecto y la base de datos
        pool.releaseConnection(connection);
        console.log("DB is connected");
    });

// Exportamos la coneccion
export default pool;    
