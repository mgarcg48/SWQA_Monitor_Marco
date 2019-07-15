import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoTareasComponent } from './proyecto-tareas.component';

describe('ProyectoTareasComponent', () => {
  let component: ProyectoTareasComponent;
  let fixture: ComponentFixture<ProyectoTareasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectoTareasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectoTareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
