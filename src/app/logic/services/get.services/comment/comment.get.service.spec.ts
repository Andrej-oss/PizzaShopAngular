import { TestBed } from '@angular/core/testing';

import { Comment.GetService } from './comment.get.service';

describe('Comment.GetService', () => {
  let service: Comment.GetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Comment.GetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
