import { Component, OnInit } from '@angular/core';
import { VideosService } from '../services/videos.service';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { VideoComponent } from '../video/video.component';
import { CanalesComponent } from '../canales/canales.component';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    VideoComponent,
    CanalesComponent,
    RouterOutlet, RouterLink, RouterLinkActive
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  title = 'youtube';

  data: any;
  term: any;

  constructor(private videosService: VideosService) { }

  ngOnInit() {
    this.videosService.getData().then(response => {
      this.data = response.data;
    }).catch(error => {
      console.error(error);
    });
  }

  search() {
    // Tu código aquí
    this.videosService.getDataSearch(this.term).then(response => {
      this.data = response.data;
    }).catch(error => {
      console.error(error);
    });
  }



}
