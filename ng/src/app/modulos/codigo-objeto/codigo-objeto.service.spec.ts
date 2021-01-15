/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CodigoObjetoService } from './codigo-objeto.service';

describe('Service: CodigoObjeto', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CodigoObjetoService]
    });
  });

  it('should ...', inject([CodigoObjetoService], (service: CodigoObjetoService) => {
    expect(service).toBeTruthy();
  }));
});
