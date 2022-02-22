import { Injectable } from '@angular/core';

/* ===/ Conectamos nuestra REST API a nuestro FrontEnd/=== */
import { HttpClient } from '@angular/common/http';

//Importamoe le tipo de dato game para cargar datos desde la parte del cliente a la base de datos
import { Game } from '../models/game';


@Injectable({
  providedIn: 'root'
})
export class GamesService {
  
  API_URI = "http://localhost:3000/api";

  constructor( private http : HttpClient ) {}

  /*===/ METODOS PARA HACER LAS PETICIONES A NUESTRA REST API /===*/

  // Metodo para obtener los juegos almacenados en nuestra DB
  getGames(){
    return this.http.get(`${this.API_URI}/juegos`);
  }  

  // Metodo para obtener un juego especifico
  getGame(id: string){
    return this.http.get(`${this.API_URI}/juegos/${id}`)
  }

  // Metodo para eliminar un juego 
  deleteGame(id: string){
    return this.http.delete(`${this.API_URI}/juegos/${id}`)
  }

  // Metodo para cargar un juego en la base de datos
  saveGame(game : Game){
    return this.http.post(`${this.API_URI}/juegos`, game)
  }

  // Metodo para actualizar algun juego
  updateGame(id: string | number, updatedGame: Game) {
    return this.http.put(`${this.API_URI}/juegos/${id}`, updatedGame)
  }

  /* Ser mas especificos con los tipo de datos, nos va a ayudar a ser mucho mas explisitos que lo que queremos recivir en cada metodo y no arriesgarnos a introducir cualquier tipo de dato. */

}
