import { Component, OnInit, Input  } from '@angular/core';
import { VideosService } from '../services/videos.service';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './video.component.html',
  styleUrl: './video.component.css'
})
export class VideoComponent {

  constructor(private videosService: VideosService) { }

  @Input() video: any;

}
