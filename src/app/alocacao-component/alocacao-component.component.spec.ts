import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlocacaoComponent } from './alocacao-component.component';

describe('AlocacaoComponent', () => {
  let component: AlocacaoComponent;
  let fixture: ComponentFixture<AlocacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlocacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlocacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
