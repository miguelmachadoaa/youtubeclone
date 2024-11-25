import { Component, Input, OnInit } from '@angular/core';
import { VideosService } from '../services/videos.service';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { VideoComponent } from '../video/video.component';
@Component({
  selector: 'app-canales',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, VideoComponent],
  templateUrl: './canales.component.html',
  styleUrl: './canales.component.css'
})
export class CanalesComponent {

  constructor(
    private readonly videosService: VideosService,
    private readonly localStorageService : LocalStorageService,
    private readonly router: Router) { }

    @Input() channelId: any;

    channel : any;
    relatedVideos : any;
    likes: any = [];
    videos: any = [];

    ngOnInit() {

      this.channelId = this.router.url.split('/')[2];

      this.getChanneloData(this.channelId);

    }

    getChanneloData(channelId:any){

      this.videosService.getChannelInfo(channelId).then(response => {
        this.channel = response.data.items[0];

        console.log(this.channel);
  
        this.localStorageService.setItem('channels', this.channel);
        
  
      }).catch(error => {
        console.error(error);
      });

      this.videosService.searchByChannel(channelId).then(response => {
        this.videos = response.data.items;
  
      }).catch(error => {
        console.error(error);
      });
  
    }

    formatNumber(num:any) {
      if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
      }
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
      }
      if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
      }
      return num;
    }

    follow(channelId: string){

      let accessTokenArray = this.localStorageService.getItem("accessToken");

      if(accessTokenArray){
        let accessToken = accessTokenArray[accessTokenArray?.length -1];

      this.videosService.subscribeToChannel(accessToken, channelId).then(
        response=>{
          console.log(response);
        }
      ).catch(error=>{
        console.error(error);
      })
      }else{
        console.log('error 2');
        console.log(accessTokenArray);
      }

      
    }

}
