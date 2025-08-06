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
import { registerGuard } from './guards/register-guard';
import { jamControllerGuard } from './guards/jam-controller-guard';


export const routes: Routes = [
    {path:"register", canActivate:[registerGuard], component: Register},
    {path: "login", canActivate:[loginGuard], component: LogIn},
    {path: "",  component: Home},
    {path: "jamController", canActivate:[jamControllerGuard], component: JamController},
    {path: "musico", component: Musico},
    {path: "espectador",  component: Espectador},
    {path: "**",  component: NotFound},


];


