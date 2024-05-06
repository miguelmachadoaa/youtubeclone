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

  playerConfig = {
    autoplay: 1
  };

  video : any;
  channel : any;
  relatedVideos : any;
  likes: any = [];

  videoWidth: number | undefined;


  ngOnInit() {

    this.videoId = this.router.url.split('/')[2];
    this.videoWidth = window.innerWidth*0.98;
    this.getVideoData(this.videoId);

  }

  getVideoData(videoId:any){

    this.videosService.searchById(videoId).then(response => {
      this.video = response.data.items[0];

      this.localStorageService.setItem('views', this.video);

      let term = this.video.snippet.title.replace(' ', '|');

      this.videosService.getVideoRelated(term).then(response => {
        this.relatedVideos = response.data.items;
      }).catch(error => {
        console.error(error);
      });

      this.videosService.getChannelInfo(this.video.snippet.channelId).then(response => {
        this.channel = response.data.items[0];
  
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
  }

  delToLike(item:any, i:any) {

    this.localStorageService.removeItem('likes', i);
    this.likes = this.localStorageService.getItem('likes');
  }

  onReady(e:any): void {
    console.log('ejecutado');
    console.log(e, 'its ready')
  }

  stateChange(e:any): void {
    console.log(e.data);
    console.log(e, 'stateChange');

    if(e.data==0){
      this.getVideoData(this.relatedVideos[1].id.videoId)
    }
  }


}
