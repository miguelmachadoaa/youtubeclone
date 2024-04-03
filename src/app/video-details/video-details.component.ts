import { Component, Input, OnInit } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
import { VideosService } from '../services/videos.service';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';
import { VideoComponent } from '../video/video.component';
import { CommonModule } from '@angular/common'
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-video-details',
  standalone: true,
  imports: [YouTubePlayer, VideoComponent, CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './video-details.component.html',
  styleUrl: './video-details.component.css'
})
export class VideoDetailsComponent implements OnInit {

  constructor(
    private videosService: VideosService,
    private localStorageService : LocalStorageService,
    private router: Router) { }

  @Input() videoId: any;

  video : any;
  relatedVideos : any;
  likes: any = [];


  ngOnInit() {

    this.videoId = this.router.url.split('/')[2];

    this.getVideoData(this.videoId);

  }

  getVideoData(videoId:any){

    this.videosService.searchById(videoId).then(response => {
      this.video = response.data.items[0];

      this.localStorageService.setItem('views', this.video);

      this.videosService.searchByCategory(this.video.snippet.categoryId).then(response => {
        this.relatedVideos = response.data.items;
        console.log(this.relatedVideos);
      }).catch(error => {
        console.error(error);
      });

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




}
