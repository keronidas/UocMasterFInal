import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from "./components/shared/navbar/navbar.component";
import { FooterComponent } from "./components/shared/footer/footer.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // router: any;
  constructor(public router: Router) {
  }
}