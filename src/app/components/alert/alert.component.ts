import { Component } from '@angular/core';
import { PostsService } from './../../services/posts/posts.service';
import { Post } from '../../interfaces/post';
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {

  public isVisible: boolean = false;
  public lastestPost: Post | undefined;
  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.lastestPost = this.postsService.getLastestPost();
  }
  
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

}
