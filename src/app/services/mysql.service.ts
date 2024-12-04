import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class MysqlService {

  constructor(
    private localStorageService:LocalStorageService
  ) { }

  private apiUrl = environment.mysqlBaseUrl;

  getDataUsers(){

      let data = axios.get(this.apiUrl+'?id=users');

      return data ?? null;
      
  }

  addUser(data:any){

    let response:any = axios.post(this.apiUrl+'?id=users', {'id':'users', 'payload':data});

    return response ?? null;
    
}
}