import { TestBed } from '@angular/core/testing';

import { PizzaGetService } from './pizza.get.service';

describe('PizzaService', () => {
  let service: PizzaGetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PizzaGetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
