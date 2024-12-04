import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { VideosService } from './services/videos.service';
import { LocalStorageService } from './services/local-storage.service';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HomeComponent, RouterLink, RouterLinkActive, FormsModule, NgbModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'youtube';

  data: any;
  term: any;
  likes: any = [];
  channels: any = [];

  constructor(
    private readonly localStorageService:LocalStorageService,
    private readonly router: Router

  ) { }

  ngOnInit() {
   
   this.channels = this.localStorageService.getItem('channels');

   let hash:any = {};

   this.channels = this.channels.filter((o: { id: string | number; }) => hash[o.id] ? false : hash[o.id] = true);
    
  }

  search() {
    let url = "/search";

    this.router.navigate([url], { queryParams: {q:this.term}});
  }

  
  
}
