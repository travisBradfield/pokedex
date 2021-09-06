import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListItemComponent } from './list-item/list-item.component';
import { SearchPackComponent } from './search-pack/search-pack.component';
import { PageNavComponent } from './page-nav/page-nav.component';

@NgModule({
  declarations: [
    SearchPackComponent,
    ListItemComponent,
    PageNavComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    SearchPackComponent,
    ListItemComponent,
    PageNavComponent
  ]
})
export class ComponentsModule {}
