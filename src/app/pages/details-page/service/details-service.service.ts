import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetailsServiceService {

  // Selected character to view the details of
  focussedCharacter: any;

  constructor() { }
}
