import { Component, OnInit } from '@angular/core';
import { VideosService } from '../services/videos.service';
import { LocalStorageService } from '../services/local-storage.service';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { VideoComponent } from '../video/video.component';
import { CanalesComponent } from '../canales/canales.component';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { DatePipe } from '@angular/common';


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

  today:any;
  data: any;
  term: any;
  likes: any = [];
  userProfile: any;

  pipe = new DatePipe('en-US');

  constructor(
   
    private readonly videosService: VideosService,
    private readonly localStorageService:LocalStorageService) { }

  ngOnInit() {

    let loggedInUser = sessionStorage.getItem("loggedInUser");

    if(loggedInUser){
      this.userProfile = JSON.parse(loggedInUser);
    }

    console.log(this.userProfile);


    this.today = this.pipe.transform(new Date(), 'ddMMYYYY');

    this.data = this.localStorageService.getItem('home'+this.today);

    if(!this.data){

      this.videosService.getData().then((response: { data: any; }) => {
        this.data = response.data;
        this.localStorageService.setItem('home'+this.pipe.transform(this.today, 'ddMMYYYY'), this.data);
      }).catch((error: any) => {
        console.error(error);
      });

    }else{
      this.data = this.data[0];
    }

    let accessTokenArray = this.localStorageService.getItem("accessToken");
    let accessToken = accessTokenArray[accessTokenArray?.length -1];

   /* this.videosService.getMyChannelInfo(accessToken).then((response: { data: any; }) => {
      console.log(response);
    }).catch((error: any) => {
      console.error(error);
    });*/


    
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



}
