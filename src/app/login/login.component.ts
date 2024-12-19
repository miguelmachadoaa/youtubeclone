import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  

import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { MysqlService } from '../services/mysql.service';
import { FormsModule } from '@angular/forms'


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private readonly localStorageService:LocalStorageService,
    private readonly mysqlService:MysqlService,
  ) { }

  errorLogin: boolean = false; 
  email: string = ''; 
  password: string = ''; 
  state: any = ''; 
  accessToken: any = ''; 

  ngOnInit() {
    this.email = '';
    this.password = '';

    this.route.fragment.subscribe(fragment => { 
      if (fragment) { 
        const params = new URLSearchParams(fragment); 
        this.state = params.get('state'); 
        this.accessToken = params.get('access_token'); 
        console.log('State:', this.state); 
        console.log('Access Token:', this.accessToken);
        this.localStorageService.setItem('accessToken', this.accessToken);
       } 
      });
    
  }
  
  onSubmit() { 
    console.log('Email:', this.email); 
    console.log('Password:', this.password); 
    // Aquí puedes añadir la lógica para autenticar al usuario 
  }

  async login() { 
    this.errorLogin = false;

    let  userLogin = await  this.mysqlService.login({'email':this.email, 'password':this.password});

    console.log(userLogin);

    if(userLogin.data.token){

      this.localStorageService.setItemOnly('userLogin', userLogin.data);

      this.router.navigate(['/home'], { relativeTo: this.route });

    }else{

      this.errorLogin = true;
      
    }


    // Aquí puedes añadir la lógica para autenticar al usuario 
  }

  singInWithGoogle(){
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
