/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BoardsService } from './boards.service';

describe('Service: Boards', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoardsService]
    });
  });

  it('should ...', inject([BoardsService], (service: BoardsService) => {
    expect(service).toBeTruthy();
  }));
});
