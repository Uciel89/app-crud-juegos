import {Request, Response} from 'express';

// Emepezamos a configurar la base de datos
import db from '../database';

class GamesController {

   public async list (req : Request, res : Response) {
      // Hacemos una consulta para todos los datos dentro de la tabla games. 
      const games = await db.query('SELECT * FROM games');
      res.json(games);
   }
   
   // Metodo para obtener un juego especifico
   public async getOne (req : Request, res : Response): Promise <any> {
      // Vamos a obtener solo una parte de un objeto (destructura)
      const { id } = req.params;

      // Hacemos la busqueda de los elemento dentro de la tabla por el id, que en si es la llave primaria. Por lo tanto esta consulta me va a devolver un arreglos con los datos que conincidan dentro de la tabla con el id que le estamos pasando, basicamente me devuelve el registro que corresponde a ese id.
      const games = await db.query('SELECT * FROM games WHERE id = ?', [id]);
      
      // Vamos a realizar una comprobacion que especificar que nos devuelva un objeto en especifico, el que nosotros estamos ingresando por el lado del cliente
      if (games.length > 0) {
         return res.json(games[0])
      }
      res.status(404).json({text: "El juego no existe"});
   }

   // Metodo para crear un juego
   public async create (req : Request, res : Response) : Promise<void> {
      // Los datos que enviamos atraves de nuestra parte Frontend (en este caso creado con Angular), se van a almacenar en este body.

      // Agregamos a nuestra tabla games los datos que probienen del req.body, que son justamente los datos que ingresamos por el lado FrontEnd.
      await db.query('INSERT INTO games SET ?', [req.body]);
      res.json({message : "Juego guardado"});
   }

   // Metodo para actualizar los datos de un juego
   public update (req: Request, res: Response) {
      const { id } = req.params;
      //let body = req.body;
      db.query('UPDATE games SET ? WHERE id = ?', [req.body, id]);
      res.json({message : "El juego fue actualizado"});
   }

   // Metodo para eliminar un juego por id
   public async delete (req: Request, res: Response): Promise <void> {
      const { id } = req.params;
      await db.query('DELETE FROM games WHERE id = ?', [id]);
      res.json({message: "El juego fue eliminado"});
   }
}

const gamesController = new GamesController();

export default gamesController;