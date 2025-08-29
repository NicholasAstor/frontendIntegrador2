import { TestBed } from '@angular/core/testing';

import { FuncionarioService } from './funcionario.service';
import {NotebookService} from './notebook.service';

describe('NotebookService', () => {
  let service: NotebookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotebookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
