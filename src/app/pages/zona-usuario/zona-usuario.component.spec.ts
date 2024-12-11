import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonaUsuarioComponent } from './zona-usuario.component';

describe('ZonaUsuarioComponent', () => {
  let component: ZonaUsuarioComponent;
  let fixture: ComponentFixture<ZonaUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZonaUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZonaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
