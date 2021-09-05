import { Component, OnInit } from '@angular/core';
import { SearchService } from './service/search.service';

@Component({
  selector: 'app-search-pack',
  templateUrl: './search-pack.component.html',
  styleUrls: ['./search-pack.component.scss']
})
export class SearchPackComponent implements OnInit {

  // Variable used to get the query string
  queryText: string | undefined;

  constructor(
    private searchService: SearchService
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
    }, err => {
      console.log('Error: ', err);
    })
  }
}
