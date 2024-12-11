import { Component } from '@angular/core';

@Component({
  selector: 'shared-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  rutasPagina = [
    { nombre: 'Home', url: '', icono: '' },
    { nombre: 'Catalogo', url: '/catalogo', icono: '' },
    { nombre: 'Configurador', url: '/configurador', icono: '' },
    { nombre: 'Politica y privacidad', url: '/politica-privacidad', icono: '' },
    { nombre: 'Zona usuarios', url: '/zona-usuarios', icono: '' },


  ];

}
