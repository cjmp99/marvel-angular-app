import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css']
})

export class ComicsComponent implements OnInit {
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

  filterCharacters(letter: string) {
    this.http.get(`${this.domain}/comics?apikey=${this.apiKey}&titleStartsWith=${letter}`)
      .subscribe((response: any) => {
        this.results = response.data.results;
      })
  }

  onChangeOrderByPrice() {
    //order by range price
    if (this.orderByPrice) {
      this.orderByPrice = false
      this.results = this.results.reverse();

    } else {
      this.orderByPrice = true
      this.results = this.results.sort((a, b) => a.price.price - b.price.price);
    }
  }

  onChangeOrderByTitle() {
    //order by alphabetic title
    function SortArray(x: any, y: any) {
      if (x.title < y.title) { return -1; }
      if (x.title > y.title) { return 1; }
      return 0;
    }

    if (this.orderByTitle) {
      this.orderByTitle = false
      this.results = this.results.reverse();
    } else {
      this.orderByTitle = true
      this.results = this.results.sort(SortArray);
    }
  }

  onItemSelect(item: any) {
    const ids = this.selectedCharacters.map(item => item.id).join(' ');
    console.log(ids);
    
    this.http.get(`${this.domain}/characters?characters=${ids}&apikey=${this.apiKey}`)
      .subscribe((response: any) => {
        console.log(response.data.results);
        
        //this.results = response.data.results;
      })
  }

  onSelectAll(items: any) {
    console.log(items);
  }

  ngOnInit(): void {
    this.http.get(`${this.domain}/comics?apikey=${this.apiKey}`)
      .subscribe((response: any) => {
        //double bucle for push price object to comic.price variable
        for (let i = 0; i < response.data.results.length; i++) {
          const comic = response.data.results[i];

          for (let index = 0; index < comic.prices.length; index++) {
            const element = comic.prices[index];
            comic.price = element
          }
        }

        this.results = response.data.results;
        this.writer = response.data.results.map((result: any) => result.creators.items.filter((editor: any) => editor.role === 'writer'))[0][0]
      })

      this.http.get(`${this.domain}/characters?apikey=${this.apiKey}&limit=100`)
      .subscribe((response: any) => {
        this.characters = response.data.results;
      })
  }

}
