import { Component } from '@angular/core';
import { ApiService } from './api.service'
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  movieTitle: string = '';
  result: string;
  results = [];
  selectedMovies = [];
  selectedMovie = '';
  queryField: FormControl = new FormControl();
  has5Movies = false;
  isDuplicad = false;
  movieInput = '';
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    
    this.myControl.valueChanges
      .subscribe(movieTitle => {
        if (movieTitle != '') {
          this.searchMovies(movieTitle);
        } else {
          this.results = [];
        }
      });
  }


  onSelected(selectedMovie: string) {
    if (this.selectedMovies.length <= 4) {
      if (this.selectedMovies.indexOf(selectedMovie) >= 0) {
        this.isDuplicad = true;
      } else {
        this.isDuplicad = false;
        this.selectedMovies.push(selectedMovie);
      }
    } else {
      this.has5Movies = true;
      this.isDuplicad = false;
    }
    this.selectedMovie = selectedMovie;

  }


  searchMovies(movieTitle) {
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

  deleteMovie(movie) {
    this.isDuplicad = false;
    var index = this.selectedMovies.indexOf(movie);
    if (index > -1) {
      this.selectedMovies.splice(index, 1);
      this.has5Movies = false;
    }
    if (this.selectedMovies.length <= 4) {
      this.has5Movies = false;
    }
  }
  
  resetInput() {
    this.has5Movies = false;
    this.isDuplicad = false;
  }

}
