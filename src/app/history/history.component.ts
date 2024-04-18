import { Component, OnInit } from '@angular/core';
import { VideosService } from '../services/videos.service';
import { LocalStorageService } from '../services/local-storage.service';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { VideoComponent } from '../video/video.component';
import { CanalesComponent } from '../canales/canales.component';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    VideoComponent,
    CanalesComponent,
    RouterOutlet, RouterLink, RouterLinkActive
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit {

  title = 'youtube';

  data: any;
  term: any;
  likes: any = [];

  constructor(
    private videosService: VideosService,
    private localStorageService:LocalStorageService) { }

  ngOnInit() {
    this.data = this.localStorageService.getItem('views');

    let hash:any = {};
    this.data = this.data.filter((o: { id: string | number; }) => hash[o.id] ? false : hash[o.id] = true);
    console.log(this.data);
  }

  search() {
    // Tu código aquí
    this.videosService.getDataSearch(this.term).then(response => {
      this.data = response.data;
    }).catch(error => {
      console.error(error);
    });
  }

  addToLike(item:any) {

    this.localStorageService.setItem('likes', item);
   // this.likes.push(item);
    this.likes = this.localStorageService.getItem('likes');
    console.log(this.likes);
  }

  delToLike(item:any, i:any) {

    this.localStorageService.removeItem('likes', i);
   // this.likes.push(item);
    this.likes = this.localStorageService.getItem('likes');
  }

  getVideoId(video:any){
    if(video.id.videoId){
      return video.id.videoId;
    }else{
      return video.id;
    }
  }



}
