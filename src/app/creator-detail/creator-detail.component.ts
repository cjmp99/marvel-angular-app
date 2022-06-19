import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-creator-detail',
  templateUrl: './creator-detail.component.html',
  styleUrls: ['./creator-detail.component.css']
})
export class CreatorDetailComponent implements OnInit {
  creator: any = {};
  comics: any[] = [];
  series: any[] = [];
  writer: any = {};
  editor: any = {};
  prices: any[] = [];
  private domain = 'https://gateway.marvel.com:443/v1/public';
  private apiKey = 'b229f83706b2c0dfd96cb03c92df7bcd';

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.http.get(`${this.domain}/creators/${this.route.snapshot.params['id']}?apikey=${this.apiKey}`)
      .subscribe((response: any) => {
        this.creator = response.data.results[0];
      });

    this.http.get(`${this.domain}/creators/${this.route.snapshot.params['id']}/comics?apikey=${this.apiKey}`)
      .subscribe((response: any) => {
        //double bucle for push price object to comic.price variable
        for (let i = 0; i < response.data.results.length; i++) {
          const comic = response.data.results[i];
          
          for (let index = 0; index < comic.prices.length; index++) {
            const element = comic.prices[index];
            comic.price = element
          }

          for (let index = 0; index < comic.creators.items.length; index++) {
            const element = comic.creators.items[index];
            if (element.name === this.creator.fullName) {              
              comic.creator = element
            }
          }
        }
        this.comics = response.data.results;
      })

    this.http.get(`${this.domain}/creators/${this.route.snapshot.params['id']}/series?apikey=${this.apiKey}`)
      .subscribe((response: any) => {
        this.series = response.data.results;
      })
  }
}
