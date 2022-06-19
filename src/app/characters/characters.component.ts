import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  pages: number = 1;
  results: any[] = []
  alphabet: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  private domain = 'https://gateway.marvel.com:443/v1/public';
  private apiKey = 'b229f83706b2c0dfd96cb03c92df7bcd';

  constructor(private http: HttpClient) { }  
  
  filterCharacters(letter: string) {
    this.http.get(`${this.domain}/characters?apikey=${this.apiKey}&nameStartsWith=${letter}`)
      .subscribe((response: any) => {
        this.results = response.data.results;
      })
  }

  ngOnInit(): void {

    this.http.get(`${this.domain}/characters?apikey=${this.apiKey}`)
      .subscribe((response: any) => {
        this.results = response.data.results;
      })
  }

}
