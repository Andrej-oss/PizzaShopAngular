import { TestBed } from '@angular/core/testing';

import { CommentDeleteService } from './comment-delete.service';

describe('CommentDeleteService', () => {
  let service: CommentDeleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentDeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
