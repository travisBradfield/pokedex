import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage/storage.service';
import { SearchService } from './service/search.service';

@Component({
  selector: 'app-search-pack',
  templateUrl: './search-pack.component.html',
  styleUrls: ['./search-pack.component.scss']
})
export class SearchPackComponent implements OnInit {

  // Variable used to get the query string
  queryText: string | undefined;

  // Error messages for user consumption
  showError: string | undefined;

  constructor(
    private searchService: SearchService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
  }

  search() {
    console.log('search: ', this.queryText)
  }

  firstTwenty() {
    console.log('firstTwenty()');
    this.searchService.getFirstTwenty().subscribe(res => {
      console.log('First 20: ', res);
      this.searchService.pokemonSearchResults = res;
      this.searchService.showFavourites = false;
      this.showError = undefined;
    }, err => {
      console.log('Error: ', err);
      this.showError = "No results found..."
    })
  }

  saved() {
    let savedItemsStr = this.storageService.getItem('savedChars');
    if (savedItemsStr && savedItemsStr.length > 2) {
      console.log('savedItems: ', JSON.parse(savedItemsStr));
      this.searchService.favourites = JSON.parse(savedItemsStr);
      this.searchService.showFavourites = true;
    } else {
      this.showError = "Whoops! No results!";
    }
  }
}
