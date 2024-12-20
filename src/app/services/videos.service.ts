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

  async subscribeToChannel(accessToken: any, channelId: string) { 

    const headers = { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' }; 

    const body = { snippet: { resourceId: { kind: 'youtube#channel', channelId: channelId } } }; 
    
    try { 
      const response = await axios.post('https://www.googleapis.com/youtube/v3/subscriptions?part=snippet', body, { headers }); 
      
      console.log('Subscribed successfully:', response.data);
       return response.data; 
      
    } catch (error) { 
      console.error('Subscription failed:', error); throw error; 
    } 
    
  }

  getMyChannelInfo(accessToken:any){

    const headers = { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' }; 

    console.log(headers);

    let url = `${environment.apiBaseUrl}channels?part=snippet,statistics&mine=true&key=${this.apiKey}`;
    let data = axios.get(url, {headers});
    return data ?? null;
  }


}
