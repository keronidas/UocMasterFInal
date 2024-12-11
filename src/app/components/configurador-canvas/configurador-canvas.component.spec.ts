import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguradorCanvasComponent } from './configurador-canvas.component';

describe('ConfiguradorCanvasComponent', () => {
  let component: ConfiguradorCanvasComponent;
  let fixture: ComponentFixture<ConfiguradorCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfiguradorCanvasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiguradorCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
