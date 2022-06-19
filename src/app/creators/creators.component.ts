import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-creators',
  templateUrl: './creators.component.html',
  styleUrls: ['./creators.component.css']
})
export class CreatorsComponent implements OnInit {
  pages: number = 1;
  results: any[] = []
  private domain = 'https://gateway.marvel.com:443/v1/public';
  private apiKey = 'b229f83706b2c0dfd96cb03c92df7bcd';

  constructor(private http: HttpClient) { }

  filterCharacters(letter: string) {
    this.http.get(`${this.domain}/creators?apikey=${this.apiKey}&nameStartsWith=${letter}`)
      .subscribe((response: any) => {
        this.results = response.data.results;
      })
  }

  ngOnInit(): void {
    this.http.get(`${this.domain}/creators?apikey=${this.apiKey}&limit=50`)
      .subscribe((response: any) => {        
        this.results = response.data.results;
      })
  }

}
