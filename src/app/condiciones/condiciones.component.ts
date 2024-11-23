import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-condiciones',
  standalone: true,
  imports: [],
  templateUrl: './condiciones.component.html',
  styleUrl: './condiciones.component.css'
})
export class CondicionesComponent {

  email: string = ''; 
  password: string = ''; 

  ngOnInit() {
    this.email = '';
    this.password = '';
    
  }
  
  onSubmit() { 
    console.log('Email:', this.email); 
    console.log('Password:', this.password); 
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

}
