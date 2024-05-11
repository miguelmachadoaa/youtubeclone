import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  constructor(
    private localStorageService:LocalStorageService
  ) { }

  private apiKey = environment.apiKey;  //my first project 

  private apiUrl = environment.apiBaseUrl+'videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=VE&maxResults=24&key='+this.apiKey;

  getData(){

      let data = axios.get(this.apiUrl);
      this.localStorageService.setItem('home', data);

    return data ?? null;
  }

  getDataSearch(term:string){

    let url = `${environment.apiBaseUrl}search?part=snippet&maxResults=24&q=${encodeURIComponent(term)}&type=video&key=${this.apiKey}`;


    let data = axios.get(url);

    return data ?? null;
  }
  
  getVideoRelated(term:string){
    let url = `${environment.apiBaseUrl}search?part=snippet&maxResults=24&q=${encodeURIComponent(term)}&type=video&key=${this.apiKey}`;
    let data = axios.get(url);
    return data ?? null;
  }

  searchById(id:string){

    let url = `${environment.apiBaseUrl}videos?part=snippet,contentDetails,statistics&id=${id}&type=video&key=${this.apiKey}`;
    let data = axios.get(url);
    return data ?? null;
  }

  searchByCategory(id:string){

    let url = `${environment.apiBaseUrl}search?part=snippet&maxResults=24&chart=mostPopular&regionCode=VE&videoCategoryId=${id}&type=video&key=${this.apiKey}`;
    let data = axios.get(url);
    return data ?? null;
  }

  searchByChannel(id:string){

    let url = `${environment.apiBaseUrl}search?part=snippet&maxResults=24&channelId=${id}&type=video&key=${this.apiKey}`;
    let data = axios.get(url);
    return data ?? null;
  }

  getChannelInfo(id:string){

    let url = `${environment.apiBaseUrl}channels?part=snippet,statistics&id=${id}&key=${this.apiKey}`;
    let data = axios.get(url);
    return data ?? null;
  }


}
