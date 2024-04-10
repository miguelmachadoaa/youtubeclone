import { Component, OnInit } from '@angular/core';
import { VideosService } from '../services/videos.service';
import { LocalStorageService } from '../services/local-storage.service';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { VideoComponent } from '../video/video.component';
import { CanalesComponent } from '../canales/canales.component';
import { RouterOutlet, RouterLink, RouterLinkActive, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-video-search',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    VideoComponent,
    CanalesComponent,
    RouterOutlet, RouterLink, RouterLinkActive
  ],
  templateUrl: './video-search.component.html',
  styleUrl: './video-search.component.css'
})
export class VideoSearchComponent implements OnInit {

  title = 'youtube';

  data: any;
  term: any;
  likes: any = [];

  parametro : any ;

  constructor(
    private videosService: VideosService,
    private localStorageService:LocalStorageService, 
    private route: ActivatedRoute ) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.parametro = params;
      console.log(this.parametro.q);  

      if(this.parametro.q){

        this.videosService.getDataSearch(this.parametro.q).then(response => {
          this.data = response.data;
        }).catch(error => {
          console.error(error);
        });
  
      }else{
  
        this.videosService.getData().then(response => {
          this.data = response.data;
        }).catch(error => {
          console.error(error);
        });
  
      }

      
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
