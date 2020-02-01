import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { SearchCriteriaComponent } from './search-criteria/search-criteria.component';
import { WatchlistPageComponent } from './watchlist-page/watchlist-page.component';


const routes: Routes = [
    {
      path: 'home',
      component: HomeComponent
    },
    {
      path: 'movie-list',
      component: MovieListComponent
    },
    {
      path: 'search-criteria',
      component: SearchCriteriaComponent
    },
    {
      path: 'watchlist-page',
      component: WatchlistPageComponent
    },
    {
      path: '',
      component: HomeComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
