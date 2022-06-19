import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharactersComponent } from './characters/characters.component';
import { ComicsComponent } from './comics/comics.component';
import { CreatorsComponent } from './creators/creators.component';
import { SeriesComponent } from './series/series.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { ComicDetailComponent } from './comic-detail/comic-detail.component';
import { CreatorDetailComponent } from './creator-detail/creator-detail.component';
import { SerieDetailComponent } from './serie-detail/serie-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    CharactersComponent,
    ComicsComponent,
    CreatorsComponent,
    SeriesComponent,
    CharacterDetailComponent,
    ComicDetailComponent,
    CreatorDetailComponent,
    SerieDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
