import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'marvel-test';
  pathname: any = null;

  constructor(private router: Router) { }

  ngAfterContentChecked(): void {
    this.pathname = this.router.url;    
  }


}
