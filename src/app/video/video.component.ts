import { Component, OnInit, Input  } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { VideoDetailsComponent } from '../video-details/video-details.component';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLink, RouterLinkActive, VideoDetailsComponent],
  templateUrl: './video.component.html',
  styleUrl: './video.component.css'
})
export class VideoComponent {

  constructor(
    private localStorageService : LocalStorageService) { }

  @Input() video: any;
  likes: any = [];

  addToLike(item:any) {

    this.localStorageService.setItem('likes', item);
    this.likes = this.localStorageService.getItem('likes');
    console.log(this.likes);
  }

  delToLike(item:any, i:any) {

    this.localStorageService.removeItem('likes', i);
    this.likes = this.localStorageService.getItem('likes');
  }

  getVideoId(video:any){
    if(video.id.videoId){
      return video.id.videoId;
    }else{
      return video.id;
    }
  }

  getVideoViews(video:any){
    if(video.id.videoId){
      return video.id.videoId;
    }else{
      return video.id;
    }
  }

  getChannelImage(video:any){
    let channel:any;

    console.log(channel);

    return channel.items[0].snippet.thumbnails.medium??null;
  }


}
