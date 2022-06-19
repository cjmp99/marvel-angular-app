import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-serie-detail',
  templateUrl: './serie-detail.component.html',
  styleUrls: ['./serie-detail.component.css']
})
export class SerieDetailComponent implements OnInit {
  serie: any = {};
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
    this.http.get(`${this.domain}/series/${this.route.snapshot.params['id']}?apikey=${this.apiKey}`)
      .subscribe((response: any) => {
        const serie = response.data.results[0];
        
        this.serie = response.data.results[0];
        this.characters = response.data.results[0].characters.items
        this.creators = response.data.results[0].creators.items

        this.http.get(`${this.domain}/series?apikey=${this.apiKey}&titleStartsWith=${serie.title.slice(0, 1)}`)
          .subscribe((response: any) => {
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
