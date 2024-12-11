import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageComparisonComponentComponent } from './image-comparison-component.component';

describe('ImageComparisonComponentComponent', () => {
  let component: ImageComparisonComponentComponent;
  let fixture: ComponentFixture<ImageComparisonComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageComparisonComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageComparisonComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
