import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage/storage.service';
import { SearchService } from './service/search.service';

@Component({
  selector: 'app-search-pack',
  templateUrl: './search-pack.component.html',
  styleUrls: ['./search-pack.component.scss']
})
export class SearchPackComponent implements OnInit {

  // Query text
  queryText: string;

  // Error messages for user consumption
  showError: string | undefined;

  // Are we searching the API or filtering results on page?
  searchByName: boolean = true;

  // Stored list of terms for searching
  savedTerms: any[] = [];

  constructor(
    private searchService: SearchService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    
  }

  updateSearchQuery(ev: any) {
    console.log('updateSearchQuery(): ', ev);

    if (this.searchByName) {
      this.searchService.findCharacterByName(ev).subscribe(searchRes => {
        console.log('Search Results: ', searchRes);
        this.searchService.favourites = [searchRes];
        this.searchService.showFavourites = true;
        this.showError = undefined;
  
      }, err => {
        console.log('Search Err: ', err);
        this.showError = `No results for "${ev}" yet... Keep typing.`
      })
    } else {
      console.log('this.savedTerms: ', this.savedTerms);
      if (this.searchService.showFavourites) {
        this.searchService.favourites.forEach((item) => {
          if (
            item.name              
              .indexOf(ev.toLowerCase().trim()) > -1
          ) {
            item.hidden = false;
          } else {
            item.hidden = true;
          } 
          
        })
      } else {
        this.searchService.pokemonSearchResults.results.forEach((item) => {
          if (
            item.name              
              .indexOf(ev.toLowerCase().trim()) > -1
          ) {
            item.hidden = false;
          } else {
            item.hidden = true;
          } 
          
        })
      }
    }
  }

  firstTwenty() {
    console.log('firstTwenty()');
    this.searchByName = false;
    this.searchService.getFirstTwenty().subscribe(res => {
      console.log('First 20: ', res);
      this.searchService.pokemonSearchResults = res;
      this.savedTerms = this.searchService.pokemonSearchResults.results; 
      this.searchService.showFavourites = false;
      this.showError = undefined;
    }, err => {
      console.log('Error: ', err);
      this.showError = "No results found..."
    })
  }

  saved() {
    this.searchByName = false;
    let savedItemsStr = this.storageService.getItem('savedChars');
    if (savedItemsStr && savedItemsStr.length > 2) {
      console.log('savedItems: ', JSON.parse(savedItemsStr));
      this.searchService.favourites = JSON.parse(savedItemsStr);
      this.savedTerms = this.searchService.favourites; 
      this.searchService.showFavourites = true;
    } else {
      this.showError = "Whoops! No results!";
    }
  }
}
