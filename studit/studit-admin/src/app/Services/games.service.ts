import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

 
  url =  environment.apiUrl;

  constructor(private http:HttpClient, private _router: Router) { }

    
  setJudgeGameCoordinate(model):Observable<any>{
    return this.http.post(this.url+'judge/set-coardinate',model) .pipe(
      map(user => {           

   

        return user;


      })
    );
  }

  getCurrentWeekGame():Observable<any>{
    return this.http.get(this.url+'common/current-week-game').pipe(
      map(
        Response => {
          return Response;
        }
      )
    )

  }

  getgameImages():Observable<any>{
    return this.http.get(this.url+'game/image-list').pipe(
      map(
        Response => {
          return Response;
        }
      )
    )

  }


  
  getCoordinateByGameId(gameId):Observable<any>{
    return this.http.get(this.url+'judge/get-coordinate-gameId/'+gameId)

  }

}
