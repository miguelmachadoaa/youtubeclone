import { Routes } from '@angular/router';
import { CanalesComponent } from './canales/canales.component';
import { HomeComponent } from './home/home.component';
import { VideoDetailsComponent } from './video-details/video-details.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'channels', component: CanalesComponent },
    { path: 'details/:id', component: VideoDetailsComponent },
    { path: '',   redirectTo: 'home', pathMatch: 'full' },
];
