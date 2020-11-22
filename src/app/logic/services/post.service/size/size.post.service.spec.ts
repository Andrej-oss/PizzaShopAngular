import { TestBed } from '@angular/core/testing';

import { Size.PostService } from './size.post.service';

describe('Size.PostService', () => {
  let service: Size.PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Size.PostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
