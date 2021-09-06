import { TestBed } from '@angular/core/testing';

import { PokemonDetailsService } from './pokemon-details.service';

describe('ServiceService', () => {
  let service: PokemonDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
