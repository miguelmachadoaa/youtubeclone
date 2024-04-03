import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  private apiUrl = 'https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=VE&maxResults=24&key=AIzaSyCVlTAocC8MYZ22O27KTGJp5z3LgD5r9V4';

  private apikey= 'AIzaSyCVlTAocC8MYZ22O27KTGJp5z3LgD5r9V4';

  constructor() { }

  getData(){

    let data = axios.get(this.apiUrl);
    console.log(data);
    return data ?? null;
  }

  getDataSearch(term:string){

    let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=24&q=${encodeURIComponent(term)}&type=video&key=${this.apikey}`;

    console.log(url);

    let data = axios.get(url);
    console.log('search');
    console.log(data);
    return data ?? null;
  }

  searchById(id:string){

    let url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${id}&type=video&key=${this.apikey}`;

    let data = axios.get(url);
    return data ?? null;
  }

  searchByCategory(id:string){

    console.log('id');
    console.log(id);

    let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&chart=mostPopular&regionCode=VE&videoCategoryId=${id}&type=video&key=${this.apikey}`;

    let data = axios.get(url);
    return data ?? null;
  }


}
