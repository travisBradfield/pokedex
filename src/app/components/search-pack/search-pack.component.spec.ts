import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPackComponent } from './search-pack.component';

describe('SearchPackComponent', () => {
  let component: SearchPackComponent;
  let fixture: ComponentFixture<SearchPackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
