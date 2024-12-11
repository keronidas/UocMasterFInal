import { Component } from '@angular/core';
import { LoginComponent } from "../../components/zona-usuario/login/login.component";

@Component({
  selector: 'app-zona-usuario',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './zona-usuario.component.html',
  styleUrl: './zona-usuario.component.scss'
})
export class ZonaUsuarioComponent {

}
