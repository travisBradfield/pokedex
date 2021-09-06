import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  // All the details for this character
  characterDetails: any;

  constructor(
    private PokemonDetailsService: PokemonDetailsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getDetails();
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
    this.router.navigate(['/page-details']);
  }
}
