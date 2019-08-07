import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Http } from '@angular/http';
// import { Observable } from 'rxjs/Rx'



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: string = 'http://www.omdbapi.com/?t='; 
  apiKey : string = '&apikey=1626cef2';

  constructor(private httpClient: HttpClient) { }

  getMovie(movieTitle) {
    if (movieTitle.length > 0) {
      let modifiedTitle = movieTitle.split(' ').join('+');
      return this.httpClient.get<String>(this.baseUrl + modifiedTitle + this.apiKey);
    }
    
  }
}
