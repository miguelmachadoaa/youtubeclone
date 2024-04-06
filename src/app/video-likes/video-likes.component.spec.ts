import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoLikesComponent } from './video-likes.component';

describe('VideoLikesComponent', () => {
  let component: VideoLikesComponent;
  let fixture: ComponentFixture<VideoLikesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoLikesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoLikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
