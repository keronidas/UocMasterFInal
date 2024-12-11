import { Component } from '@angular/core';
import { AppComponent } from "../../components/configurador-canvas/configurador-canvas.component";
import { NavbarComponent } from "../../components/shared/navbar/navbar.component";

@Component({
  selector: 'app-configurador',
  standalone: true,
  imports: [AppComponent],
  templateUrl: './configurador.component.html',
  styleUrl: './configurador.component.scss'
})
export class ConfiguradorComponent {

}
