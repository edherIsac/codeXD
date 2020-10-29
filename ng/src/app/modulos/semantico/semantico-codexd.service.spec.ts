/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SemanticoCodexdService } from './semantico-codexd.service';

describe('Service: SemanticoCodexd', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SemanticoCodexdService]
    });
  });

  it('should ...', inject([SemanticoCodexdService], (service: SemanticoCodexdService) => {
    expect(service).toBeTruthy();
  }));
});
