import { Routes } from '@angular/router';
import { CanalesComponent } from './canales/canales.component';
import { HomeComponent } from './home/home.component';
import { VideoDetailsComponent } from './video-details/video-details.component';
import { VideoLikesComponent } from './video-likes/video-likes.component';
import { VideoSearchComponent } from './video-search/video-search.component';
import { HistoryComponent } from './history/history.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'search', component: VideoSearchComponent, pathMatch: 'full' },
    { path: 'channels', component: CanalesComponent },
    { path: 'channel/:id', component: CanalesComponent },
    { path: 'likes', component: VideoLikesComponent },
    { path: 'history', component: HistoryComponent },
    { path: 'login', component: LoginComponent },
    { path: 'details/:id', component: VideoDetailsComponent },
    { path: '',   redirectTo: 'home', pathMatch: 'full' },
];
