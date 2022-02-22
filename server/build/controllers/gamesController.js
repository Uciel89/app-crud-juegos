"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Emepezamos a configurar la base de datos
const database_1 = __importDefault(require("../database"));
class GamesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Hacemos una consulta para todos los datos dentro de la tabla games. 
            const games = yield database_1.default.query('SELECT * FROM games');
            res.json(games);
        });
    }
    // Metodo para obtener un juego especifico
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Vamos a obtener solo una parte de un objeto (destructura)
            const { id } = req.params;
            // Hacemos la busqueda de los elemento dentro de la tabla por el id, que en si es la llave primaria. Por lo tanto esta consulta me va a devolver un arreglos con los datos que conincidan dentro de la tabla con el id que le estamos pasando, basicamente me devuelve el registro que corresponde a ese id.
            const games = yield database_1.default.query('SELECT * FROM games WHERE id = ?', [id]);
            // Vamos a realizar una comprobacion que especificar que nos devuelva un objeto en especifico, el que nosotros estamos ingresando por el lado del cliente
            if (games.length > 0) {
                return res.json(games[0]);
            }
            res.status(404).json({ text: "El juego no existe" });
        });
    }
    // Metodo para crear un juego
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Los datos que enviamos atraves de nuestra parte Frontend (en este caso creado con Angular), se van a almacenar en este body.
            // Agregamos a nuestra tabla games los datos que probienen del req.body, que son justamente los datos que ingresamos por el lado FrontEnd.
            yield database_1.default.query('INSERT INTO games SET ?', [req.body]);
            res.json({ message: "Juego guardado" });
        });
    }
    // Metodo para actualizar los datos de un juego
    update(req, res) {
        const { id } = req.params;
        //let body = req.body;
        database_1.default.query('UPDATE games SET ? WHERE id = ?', [req.body, id]);
        res.json({ message: "El juego fue actualizado" });
    }
    // Metodo para eliminar un juego por id
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM games WHERE id = ?', [id]);
            res.json({ message: "El juego fue eliminado" });
        });
    }
}
const gamesController = new GamesController();
exports.default = gamesController;
