import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  

import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { VideosService } from '../services/videos.service';
import { MysqlService } from '../services/mysql.service';
import { FormsModule } from '@angular/forms'
@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private readonly localStorageService:LocalStorageService,
    private readonly mysqlService:MysqlService,
    private readonly videosService:VideosService,
  ) { }

  errorLogin: boolean = false; 
  email: string = ''; 
  password: string = ''; 
  state: any = ''; 
  accessToken: any = ''; 
  user: any = ''; 
  channels: any = ''; 

  ngOnInit() {
    this.email = '';
    this.password = '';
    this.channels = '';

    this.route.fragment.subscribe(fragment => { 
      if (fragment) { 
        const params = new URLSearchParams(fragment); 
        this.state = params.get('state'); 
        this.accessToken = params.get('access_token'); 
        this.localStorageService.setItem('accessToken', this.accessToken);
       } 
      });

    this.user = this.localStorageService.getItem('userLogin');

    let accessTokenArray = this.localStorageService.getItem("accessToken");

    if(accessTokenArray){
      let accessToken = accessTokenArray[accessTokenArray?.length -1];
      this.videosService.getMyChannelInfo(accessToken).then((response: { data: any; }) => {
        console.log(response);
        this.channels = response.data.items;
        console.log(this.channels);

      }).catch((error: any) => {
        console.error(error);
      });

    }
    
  }

  youtubeAuth(){
    console.log('youtubeAuth');

    // Google's OAuth 2.0 endpoint for requesting an access token
      let oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

      // Create <form> element to submit parameters to OAuth 2.0 endpoint.
      let form = document.createElement('form');
      form.setAttribute('method', 'GET'); // Send as a GET request.
      form.setAttribute('action', oauth2Endpoint);

      // Parameters to pass to OAuth 2.0 endpoint.
      let params:any = {'client_id': '18203822512-st78qkth7ubu9hf58a3mhp24ljai8k9i.apps.googleusercontent.com',
                    'redirect_uri': 'https://youtube-angular-clone.netlify.app',
                    'response_type': 'token',
                    'scope': 'https://www.googleapis.com/auth/youtube.force-ssl',
                    'include_granted_scopes': 'true',
                    'state': 'pass-through value'};

      // Add form parameters as hidden input values.
      for (let p in params) {
        let input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', p);
        input.setAttribute('value', params[p]);
        form.appendChild(input);
      }

      // Add form to page and submit it to open the OAuth 2.0 endpoint.
      document.body.appendChild(form);
      form.submit();


  }

  decodeToken(token: string): any { 
    const base64Url = token.split('.')[1]; 
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); 
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }

}
