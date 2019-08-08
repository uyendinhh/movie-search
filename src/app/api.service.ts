import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class ApiService {
  baseUrl: string = 'http://www.omdbapi.com/?t='; 
  apiKey : string = '&apikey=1626cef2';

  constructor(private httpClient: HttpClient) { }

  getMovie(movieTitle : string) {
    if (movieTitle.length > 0) {
      let modifiedTitle = movieTitle.split(' ').join('+');
      return this.httpClient.get<any>(this.baseUrl + modifiedTitle + this.apiKey);
    }
    
  }
}
