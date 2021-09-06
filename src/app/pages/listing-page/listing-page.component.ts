import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/components/search-pack/service/search.service';

@Component({
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrls: ['./listing-page.component.scss']
})
export class ListingPageComponent implements OnInit {

  constructor(
    public searchService: SearchService
  ) { }

  ngOnInit(): void {
  }

}
