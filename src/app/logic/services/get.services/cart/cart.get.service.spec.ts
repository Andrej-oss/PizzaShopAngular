import { TestBed } from '@angular/core/testing';

import { CartGetService } from './cart.get.service';

describe('Cart.GetService', () => {
  let service: CartGetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartGetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
