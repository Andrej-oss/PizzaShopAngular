import { TestBed } from '@angular/core/testing';

import { Voice.PostService } from './voice.post.service';

describe('Voice.PostService', () => {
  let service: Voice.PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Voice.PostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
