import { Component } from '@angular/core';
import { SearchService } from './components/search-pack/service/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pokedex';

  constructor(
    public searchService: SearchService
  ) {

  }

}
