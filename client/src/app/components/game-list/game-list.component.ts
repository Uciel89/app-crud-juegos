import { Component, HostBinding, OnInit } from '@angular/core';

// Servicio para conectarnos a la REST API
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  // Propiedad encargada de almacenar los juegos que provienen de la base de datos
  games: any = []; 

  @HostBinding('class') classes = 'row';

  constructor(private gamesService: GamesService) { }

  // Metodo en donde colocamos los metodos o acciones que se van a ejecutar cuando nuestra aplicacion se inicia 
  ngOnInit(): void {
    this.getGame();
  }

  getGame(){
    this.gamesService.getGames().subscribe(
      // Si me retornas los juegos, voy a mostrarlos por cosola
      res => {

        // Voy a rellenar el arreglo de games con los datos que recivo de hacer la peticion a la base de datos atraves de las peticiones de la Api Rest
        this.games = res;
      },
      err => console.error(err)
    )
  }

  // Metodo para eliminar un juego
  deleteGame(id: string){
    this.gamesService.deleteGame(id)
        .subscribe(
          res => {
            console.log(res);
            this.getGame();
          },
          err => console.error(err)
        )
  }

  // Metodo para redireccionar al componenete game-form para editar un juego 
}
