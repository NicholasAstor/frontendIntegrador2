import { TestBed } from '@angular/core/testing';

import { AlocacaoService } from './alocacao.service';

describe('AlocacaoService', () => {
  let service: AlocacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlocacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
