import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { PostsService } from './../../services/posts/posts.service';
import { Post } from '../../interfaces/post';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

 public validateForm: FormGroup<{
    title: FormControl<string>;
    body: FormControl<string>;
  }> = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(15)]],
    body: ['', [Validators.required, Validators.maxLength(100)]]
  });

  public currentPosts: Post[] = [];
  public showAlert: boolean = false;

  constructor(
    private fb: NonNullableFormBuilder, 
    private postsService: PostsService,
    private message: NzMessageService) {}

  ngOnInit(): void {
    this.postsService.getPostsAsObservable().subscribe((data) => {
      this.currentPosts = data;
    })
  }

  public submitForm(): void {
    if (this.validateForm.valid) {
      const post: Post = {
        userId:  11,
        id: this.currentPosts[0].id + 1,
        title: this.validateForm.value.title,
        body: this.validateForm.value.body
      };
      console.log(this.currentPosts)
      this.postsService.addPostAtBeginning(post);
      console.log('submit', this.validateForm.value);
      this.showAlert = true;
      this.validateForm.reset();
      this.message.success('New post added successfully', { nzDuration: 3000 });

    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    };
  };

  public afterClose(): void {
    this.showAlert = false;
  }
}
