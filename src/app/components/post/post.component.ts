import { Component } from '@angular/core';
import { PostsService } from './../../services/posts/posts.service';
import { Post } from './../../interfaces/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  public posts: Post[] = [];
  constructor(private postsService:PostsService){}

  ngOnInit(): void {
    this.postsService.getPostsAsObservable().subscribe(posts => {
         this.posts = posts; 
        }
    );
  }
}
