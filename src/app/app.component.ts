import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { VideosService } from './services/videos.service';
import { LocalStorageService } from './services/local-storage.service';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HomeComponent, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'youtube';

  data: any;
  term: any;
  likes: any = [];

  constructor(
    private videosService: VideosService, 
    private localStorageService:LocalStorageService,
    private router: Router

  ) { }

  search() {
    let url = "/search";

    console.log(url);

    this.router.navigate([url], { queryParams: {q:this.term}});

    /*this.videosService.getDataSearch(this.term).then(response => {
      this.data = response.data;
    }).catch(error => {
      console.error(error);
    });*/
  }

  
  
}
