import { Routes } from '@angular/router';
import { CanalesComponent } from './canales/canales.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '/home', component: HomeComponent },
    { path: 'channels', component: CanalesComponent },
    { path: '',   redirectTo: '/home', pathMatch: 'full' },
];
