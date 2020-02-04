import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'watchlist-page',
  templateUrl: './watchlist-page.component.html',
  styleUrls: ['./watchlist-page.component.css']
})
export class WatchlistPageComponent implements OnInit {

  constructor() { }
  // @Input() newWatchlist

  newWatchlistMovie(evt){
    console.log(evt);
  }
  ngOnInit() {
  }

}
