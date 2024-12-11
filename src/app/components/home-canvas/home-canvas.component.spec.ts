import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCanvasComponent } from './home-canvas.component';

describe('HomeCanvasComponent', () => {
  let component: HomeCanvasComponent;
  let fixture: ComponentFixture<HomeCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeCanvasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
