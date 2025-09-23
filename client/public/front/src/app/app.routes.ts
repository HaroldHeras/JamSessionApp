import { Routes } from '@angular/router';
import { LogIn } from './pages/log-in/log-in';
import { Home } from './pages/home/home';
import { JamController } from './pages/jam-controller/jam-controller';
import { Musico } from './pages/musico/musico';
import { Espectador } from './pages/espectador/espectador';
import { NotFound } from './pages/not-found/not-found';
import { authGuard } from './guards/auth-guard';
import { Register } from './pages/register/register';
import { loginGuard } from './guards/login-guard';
import { NuevaJam } from './pages/nueva-jam/nueva-jam';
import { ListaJams } from './pages/lista-jams/lista-jams';
import { JamDetailPrivate } from './pages/jam-detail-private/jam-detail-private';
import { JamDetailPublic } from './pages/jam-detail-public/jam-detail-public';



export const routes: Routes = [
    {path:"register",  component: Register},
    {path: "login", canActivate:[loginGuard], component: LogIn},
    {path: "",  component: Home, },
    {path: "publicJam/:id", component: JamDetailPublic},
    {path: "jamController", canActivateChild:[authGuard], component: JamController, children:[
        {path:"nuevaJam", component: NuevaJam},
        {path: "listaJams", component: ListaJams},
        {path: "jam/:id", component: JamDetailPrivate},
        {path:"", redirectTo: "listaJams", pathMatch: "full"}
    ]},
    {path: "musico", component: Musico},
    {path: "espectador",  component: Espectador},
    {path: "**",  component: NotFound},


];


