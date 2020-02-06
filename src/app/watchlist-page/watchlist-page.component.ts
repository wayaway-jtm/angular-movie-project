import { Component, OnInit, Input} from '@angular/core';
import { WatchlistService } from '../watchlist.service';

@Component({
  selector: 'watchlist-page',
  templateUrl: './watchlist-page.component.html',
  styleUrls: ['./watchlist-page.component.css']
})
export class WatchlistPageComponent implements OnInit {

  constructor(private watchlistService : WatchlistService) { }

  ngOnInit() {
    
  }

}
