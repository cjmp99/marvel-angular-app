import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html',
  styleUrls: ['./comic-detail.component.css']
})
export class ComicDetailComponent implements OnInit {
  comic: any = {};
  characters: any[] = [];
  creators: any[] = [];
  suggestions: any[] = [];
  writer: any = null;
  oldId: number = 0;
  observable: boolean = false;
  private domain = 'https://gateway.marvel.com:443/v1/public';
  private apiKey = 'b229f83706b2c0dfd96cb03c92df7bcd';

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  changeObservable() {
    this.observable = true
  }

  ngDoCheck() {
    if (this.observable && this.oldId !== this.route.snapshot.params['id']) {
      this.observable = false
      this.fetchInfo()
      return
    }
  }

  fetchInfo() {
    this.http.get(`${this.domain}/comics/${this.route.snapshot.params['id']}?apikey=${this.apiKey}`)
      .subscribe((response: any) => {
        const comic = response.data.results[0];

        for (let index = 0; index < comic.prices.length; index++) {
          const element = comic.prices[index];
          comic.price = element
        }

        this.comic = response.data.results[0];
        this.characters = response.data.results[0].characters.items
        this.creators = response.data.results[0].creators.items

        this.http.get(`${this.domain}/comics?apikey=${this.apiKey}&titleStartsWith=${comic.title.slice(0, 1)}`)
          .subscribe((response: any) => {
            for (let i = 0; i < response.data.results.length; i++) {
              const comic = response.data.results[i];

              for (let index = 0; index < comic.creators.items.length; index++) {
                const element = comic.creators.items[index];
                if (element.role === 'writer') {
                  comic.writer = element.name
                }
              }

              for (let index = 0; index < comic.prices.length; index++) {
                const element = comic.prices[index];
                comic.price = element
              }
            }
            this.suggestions = response.data.results;
          })
        return
      }).remove;
  }

  ngOnInit() {
    this.oldId = this.route.snapshot.params['id']
    this.fetchInfo()
  }
}
