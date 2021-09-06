import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetailsServiceService } from 'src/app/pages/details-page/service/details-service.service';
import { CharacterSource } from 'src/assets/models';
import { PokemonDetailsService } from './service/pokemon-details.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  /** Menu item ID */
  @Input() source: CharacterSource;

  /** The whole details object is incoming */
  @Input() details: any;

  // All the details for this character
  characterDetails: any;

  constructor(
    private PokemonDetailsService: PokemonDetailsService,
    private detailsService: DetailsServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.details) {
      console.log('details: ', this.details);
      this.characterDetails = this.details;
    } else {
      this.getDetails();
    }
  }

  getDetails() {
    this.PokemonDetailsService.getDetails(this.source.url).subscribe(details => {
      this.characterDetails = details;
    }, err => {
      console.log('Details err: ', err);
    });
  }

  getSprite(): string {
    if (this.characterDetails) {
      if (this.characterDetails.sprites.front_default) {
        return this.characterDetails.sprites.front_default;
      } else {
        return this.characterDetails.sprites.front_shiny;
      }
    } else {
      return ''
    }
  }

  openDetailsPage() {
    let id;
    if (this.source) {
      let ids = this.source.url.split('/');
      id = ids[6];
    } else if (this.details) {
      id = this.details.id;
    }
    
    this.detailsService.focussedCharacter = this.characterDetails;
    this.router.navigate([`/page-details/${id}`]);
  }
}
