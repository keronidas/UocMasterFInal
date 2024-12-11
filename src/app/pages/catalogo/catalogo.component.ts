import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ImageComparisonComponentComponent } from "../../components/shared/image-comparison-component/image-comparison-component.component";


@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [RouterLink, ImageComparisonComponentComponent],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.scss'
})
export class CatalogoComponent {

  constructor(private router: Router) { }
}