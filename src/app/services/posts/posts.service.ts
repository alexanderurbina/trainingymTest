import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Post } from './../../interfaces/post';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PostsService {
  public env: string = environment.apiUrl;
  private postsSubject: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);
  constructor(private http: HttpClient) {
    this.getPosts();
   }

   private getPosts(): void {
    this.http.get<Post[]>(`${this.env}/posts`).subscribe(
      posts => {
        const updatedPosts = posts.slice(-20);
        this.postsSubject.next(updatedPosts.reverse());
      },
      error => console.error(error)
    );
  }

  public getPostsAsObservable(): Observable<Post[]> {
    return this.postsSubject.asObservable();
  }

  public addPostAtBeginning(newPost: Post): void {
    const currentPosts = this.postsSubject.value.slice();
    currentPosts.pop();
    currentPosts.unshift(newPost);
    this.postsSubject.next(currentPosts);
  }

  public getLastestPost(): Post {
    return this.postsSubject.value[0];
  }
}
