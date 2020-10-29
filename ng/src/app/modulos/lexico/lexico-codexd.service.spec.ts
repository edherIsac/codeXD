/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LexicoCodexdService } from './lexico-codexd.service';

describe('Service: LexicoCodexd', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LexicoCodexdService]
    });
  });

  it('should ...', inject([LexicoCodexdService], (service: LexicoCodexdService) => {
    expect(service).toBeTruthy();
  }));
});
