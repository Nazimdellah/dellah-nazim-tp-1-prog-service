import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { album } from './models/album';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})



export class AppComponent {

  result = false;
  artist:String= "";
  chansons : string[] = [];
  Albums : album[]=[]
  Show : string = "";

  constructor(public httpClient : HttpClient){}

  async searchArtist():Promise<void>{
  this.result = true;

  let gettheAlbum = await lastValueFrom(this.httpClient.get<any>("https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist="+ this.artist+"&api_key=9a8a3facebbccaf363bb9fd68fa37abf&format=json"));
  console.log(gettheAlbum);

  for(let x of gettheAlbum.topalbums.album){
    this.Albums.push(new album(x.name, x.image[1]["#text"]))
  }
  console.log(this.Albums);
  }

  async chonson(albumSelected : string) : Promise<void>{
    this.chansons = [];

    this.Show = albumSelected;
    let GetAllSongs = await lastValueFrom(this.httpClient.get<any>("https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=9a8a3facebbccaf363bb9fd68fa37abf&artist="+ this.artist+"&album="+ albumSelected+"&format=json"));
    console.log(GetAllSongs);

    for(let x of GetAllSongs.album.tracks.track){
      this.chansons.push(x.name)
    }
    console.log(this.chansons);
  }


  nouvelleRecherche():void{
    this.result = false;
    this.Albums = [];
  }
}
