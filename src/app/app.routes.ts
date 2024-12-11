import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ConfiguradorComponent } from './pages/configurador/configurador.component';
import { PoliticasComponent } from './pages/politicas/politicas.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { ZonaUsuarioComponent } from './pages/zona-usuario/zona-usuario.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'configurador', component: ConfiguradorComponent },
    { path: 'catalogo', component: CatalogoComponent },
    { path: 'politica-privacidad', component: PoliticasComponent },
    {path:'zona-usuarios',component:ZonaUsuarioComponent},
    { path: '**', redirectTo: '' }
];
