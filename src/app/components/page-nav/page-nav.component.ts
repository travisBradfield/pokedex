import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search-pack/service/search.service';

@Component({
  selector: 'app-page-nav',
  templateUrl: './page-nav.component.html',
  styleUrls: ['./page-nav.component.scss']
})
export class PageNavComponent implements OnInit {

  // What page are we currently on?
  currentPage: number = 1;

  constructor(
    public searchService: SearchService
  ) { }

  ngOnInit(): void {
  }

  getPages() {
    return Math.ceil(this.searchService.pokemonSearchResults.count / 20);
  }

  changePage(direction: string) {
    console.log('changePage(): ', direction);
    switch (direction) {
      case 'prev':
        if (this.searchService.pokemonSearchResults.previous) {
          this.currentPage--;
          this.updateSearch(this.searchService.pokemonSearchResults.previous);
        }
        break;
      case 'next':
        if (this.searchService.pokemonSearchResults.next) {
          this.currentPage++;
          this.updateSearch(this.searchService.pokemonSearchResults.next);
        }
        break;
    }
  }

  updateSearch(url: string) {
    this.searchService.getPaginated(url);
  }
}
