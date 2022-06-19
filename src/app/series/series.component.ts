import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {
  pages: number = 1;
  results: any[] = []
  prices: any[] = []
  price: any = {}
  writer: any = {}
  orderByPrice = false;
  orderByTitle = false;
  dropdownSettings: any = {}
  private domain = 'https://gateway.marvel.com:443/v1/public';
  private apiKey = 'b229f83706b2c0dfd96cb03c92df7bcd';
  characters: any[] = [];
  selectedCharacters: any[] = [];

  constructor(private http: HttpClient) {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
  }

  filterByDate(date: any) {    
      this.http.get(`${this.domain}/series?modifiedSince=${date}&apikey=${this.apiKey}`)
        .subscribe((response: any) => {
          this.results = response.data.results
        })
  }

  filterByRating(rating: string) {
    if (rating !== '') {
      this.http.get(`${this.domain}/series?apikey=${this.apiKey}&limit=100`)
        .subscribe((response: any) => {
          this.results = response.data.results.filter((serie: any) => serie.rating === rating);
        })
    }
  }

  filterSerie(letter: string) {
    this.http.get(`${this.domain}/series?apikey=${this.apiKey}&titleStartsWith=${letter}`)
      .subscribe((response: any) => {
        this.results = response.data.results;
      })
  }

  filterSerieType(type: string) {
    this.http.get(`${this.domain}/series?seriesType=${type}&apikey=${this.apiKey}`)
      .subscribe((response: any) => {
        this.results = response.data.results;
      })
  }

  ngOnInit(): void {
    this.http.get(`${this.domain}/series?apikey=${this.apiKey}`)
      .subscribe((response: any) => {
        //double bucle for push writer object to comic.writer variable
        for (let i = 0; i < response.data.results.length; i++) {
          const comic = response.data.results[i];

          for (let index = 0; index < comic.creators.items.length; index++) {
            const element = comic.creators.items[index];
            if (element.role === 'writer') {
              comic.writer = element.name
            }
          }
        }        
        this.results = response.data.results;
      })
  }
}
