import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { SearchService } from 'src/app/components/search-pack/service/search.service';
import { DetailsServiceService } from './service/details-service.service';
import { HttpService } from '../../services/http/http.service';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';


export interface TableElement {
  name: string;
  base_stat: number;
  effort: string;
}

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})

export class DetailsPageComponent implements OnInit {

  // My saved Creatures
  savedItems: any[] = [];
  // Is the current creature saved?
  isFavourite: boolean = false;

  element_data: any[] = [];

  columns = [
    {
      columnDef: 'name',
      header: 'Name',
      cell: (element: TableElement) => `${element.name}`
    },
    {
      columnDef: 'base_stat',
      header: 'Base Stat',
      cell: (element: TableElement) => `${element.base_stat}`
    },
    {
      columnDef: 'effort',
      header: 'Effort',
      cell: (element: TableElement) => `${element.effort}`
    }
  ];
  dataSource: any[] = [];
  displayedColumns = this.columns.map(c => c.columnDef);

  // Character ID drawn from the URL
  characterId: string;


  constructor(
    public searchService: SearchService,
    public detailsService: DetailsServiceService,
    private _http: HttpService,
    private route: ActivatedRoute,
    private _location: Location,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    console.log('** Details: ', this.detailsService.focussedCharacter);
    if (!this.detailsService.focussedCharacter) {
      this.route.params.subscribe(res => {
        console.log('Params res: ', res.id);
        this.characterId = res.id;
        this.getCharacterDetails();
      })
    } else {
      this.arrangeStats();
    }
  }

  getCharacterDetails() {
    this._http.runHttpCall('GET', `/pokemon/${this.characterId}`, 'application/json').subscribe(charRes => {
      this.detailsService.focussedCharacter = charRes;
      this.arrangeStats();
    })
  }

  arrangeStats() {
    this.detailsService.focussedCharacter.stats.forEach((stat: any) => {
      let template = { name: stat.stat.name, base_stat: stat.base_stat, effort: stat.effort }
      this.element_data.push(template);
    });

    this.dataSource = this.element_data;

    let storedItems = this.storageService.getItem('savedChars');
    if (storedItems) {
      console.log('storedItems: ', JSON.parse(storedItems));
      this.savedItems = JSON.parse(storedItems);
      for (let i of this.savedItems) {
        if (i.id == this.detailsService.focussedCharacter.id) {
          this.isFavourite = true;
          break;
        }
      }
    }
    
  }

  getSprite(): string {
    if (this.detailsService.focussedCharacter) {
      if (this.detailsService.focussedCharacter.sprites.front_default) {
        return this.detailsService.focussedCharacter.sprites.front_default;
      } else {
        return this.detailsService.focussedCharacter.sprites.front_shiny;
      }
    } else {
      return ''
    }
  }

  getCharacterName() {
    return this.detailsService.focussedCharacter.name
  }

  save() {
    console.log('save()');
    this.detailsService.focussedCharacter.hidden = false;
    this.savedItems.push(this.detailsService.focussedCharacter);
    this.storageService.setItem('savedChars', JSON.stringify(this.savedItems));
    this.isFavourite = true;
  }
  
  remove() {
    console.log('remove()');
    
    this.savedItems.splice(this.savedItems.indexOf(this.detailsService.focussedCharacter), 1);
    console.log('savedItems: ', this.savedItems);
    this.storageService.setItem('savedChars', JSON.stringify(this.savedItems));
    this.searchService.favourites = this.savedItems;
    this.isFavourite = false;
  }

  back() {
    this._location.back();
  }

}
