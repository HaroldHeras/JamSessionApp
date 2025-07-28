import { Routes } from '@angular/router';
import { LogIn } from './pages/log-in/log-in';
import { Home } from './pages/home/home';
import { JamController } from './pages/jam-controller/jam-controller';
import { Musico } from './pages/musico/musico';
import { Espectador } from './pages/espectador/espectador';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
    {path: "LogIn", component: LogIn},
    {path: "", component: Home},
    {path: "jamController", component: JamController},
    {path: "musico", component: Musico},
    {path: "espectador", component: Espectador},
    {path: "**", component: NotFound},


];
