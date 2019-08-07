import { Component } from '@angular/core';
import { ApiService } from './api.service'
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  movieTitle : string = '';
  result;
  results = [];
  selectedMovie = '';
  queryField: FormControl = new FormControl();

  constructor(private apiService: ApiService) {
    if (this.queryField.valueChanges) {
      let valueChanges = this.queryField.valueChanges;
      
        valueChanges.subscribe(queryField => this.apiService.getMovie(queryField)
          .subscribe(response => {
            console.log(this.results);
            this.results = [];
            if (response && response.Title.length > 0) {
              this.results.push(response);
            } else {
              this.results = null;
              queryField.reset();
            }
          }
          ));
    }
  }


  onSelected(selectedMovie: string) {
    this.selectedMovie = selectedMovie;
  }


  clickSearch(movieTitle) {
    this.apiService.getMovie(movieTitle).subscribe(res => this.result = res);
    console.log(this.result);
  }
}
