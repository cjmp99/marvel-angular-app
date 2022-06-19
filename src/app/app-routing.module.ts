import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { CharactersComponent } from './characters/characters.component';
import { ComicDetailComponent } from './comic-detail/comic-detail.component';
import { ComicsComponent } from './comics/comics.component';
import { CreatorDetailComponent } from './creator-detail/creator-detail.component';
import { CreatorsComponent } from './creators/creators.component';
import { SerieDetailComponent } from './serie-detail/serie-detail.component';
import { SeriesComponent } from './series/series.component';

const routes: Routes = [
  {
    path: '',
    component: CharactersComponent
  },
  {
    path: 'comics',
    component: ComicsComponent
  },
  {
    path: 'creators',
    component: CreatorsComponent
  },
  {
    path: 'series',
    component: SeriesComponent
  },
  {
    path: 'character/:id',
    component: CharacterDetailComponent
  },
  {
    path: 'comic/:id',
    component: ComicDetailComponent
  },
  {
    path: 'creator/:id',
    component: CreatorDetailComponent
  },
  {
    path: 'serie/:id',
    component: SerieDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
