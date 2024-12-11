import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-image-comparison-component',
  standalone: true,
  imports: [],
  templateUrl: './image-comparison-component.component.html',
  styleUrl: './image-comparison-component.component.scss'
})
export class ImageComparisonComponentComponent {

  @ViewChild('slider') slider: ElementRef | undefined;
  @ViewChild('imageWrapper') imageWrapper: ElementRef | undefined;

  image1 = 'path_to_image1.jpg'; // Cambia por la URL de tu primera imagen
  image2 = 'path_to_image2.jpg'; // Cambia por la URL de tu segunda imagen

  isDragging = false;

  constructor() { }

  onMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;

    const wrapper = this.imageWrapper?.nativeElement;
    const slider = this.slider?.nativeElement;

    if (!wrapper || !slider) return;

    const offsetX = event.clientX - wrapper.offsetLeft;
    const width = wrapper.offsetWidth;

    // Limitar el movimiento dentro del contenedor
    const x = Math.max(0, Math.min(offsetX, width));

    // Mover la línea divisoria
    slider.style.left = `${x}px`;

    // Ajustar la opacidad de las imágenes
    const percentage = x / width;
    const image1 = wrapper.querySelector('.image-1') as HTMLImageElement;
    const image2 = wrapper.querySelector('.image-2') as HTMLImageElement;

    if (image1 && image2) {
      image1.style.opacity = `${1 - percentage}`;
      image2.style.opacity = `${percentage}`;
    }
  }

  onMouseUp(): void {
    this.isDragging = false;
    document.removeEventListener('mousemove', this.onMouseMove.bind(this));
    document.removeEventListener('mouseup', this.onMouseUp.bind(this));
  }
}