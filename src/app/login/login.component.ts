import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

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

}
