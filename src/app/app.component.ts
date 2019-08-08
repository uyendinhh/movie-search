import { Component } from '@angular/core';
import { ApiService } from './api.service'
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  results = [];
  selectedMovies = [];
  selectedMovie = '';
  has5Movies = false;
  isDuplicated = false;
  myControl = new FormControl();

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.myControl.valueChanges
      .subscribe(userInput => {
        if (userInput != '') {
          this.searchMovies(userInput);
        } else {
          this.results = [];
        }
      });
  }


  onSelected(selectedMovie: string) {
    if (this.selectedMovies.length <= 4) {
      if (this.selectedMovies.indexOf(selectedMovie) >= 0) {
        this.isDuplicated = true;
      } else {
        this.isDuplicated = false;
        this.selectedMovies.push(selectedMovie);
      }
    } else {
      this.has5Movies = true;
      this.isDuplicated = false;
    }
    this.selectedMovie = selectedMovie;
  }


  searchMovies(movieTitle : string) {
    this.apiService.getMovie(movieTitle)
      .subscribe(response => {
        if (response.Response != 'False' && response.Title.length > 0) {
          if (this.results.indexOf(response.Title) < 0) {
            this.results.push(response.Title);
          }
        } else {
          this.results = [];
        }
      })
  }


  deleteMovie(movie : string) {
    this.isDuplicated = false;
    var index = this.selectedMovies.indexOf(movie);
    if (index > -1) {
      this.selectedMovies.splice(index, 1);
    }
    if (this.selectedMovies.length <= 4) {
      this.has5Movies = false;
    }
  }


  resetInput() {
    this.has5Movies = false;
    this.isDuplicated = false;
  }

}
