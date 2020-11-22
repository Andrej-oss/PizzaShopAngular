import { TestBed } from '@angular/core/testing';

import { Ingredient.GetService } from './ingredient.get.service';

describe('Ingredient.GetService', () => {
  let service: Ingredient.GetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ingredient.GetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
