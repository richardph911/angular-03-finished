import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Post } from './post.model';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  constructor(private http: HttpClient) {
  }
  getPosts() {
    // return [...this.posts];
    this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
      .subscribe((postData) => {
        //get the body of the res from app.js which {message, posts}
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);

      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {id: null, title: title, content: content};
    this.http.post<{message: string}>('http://localhost:3000/api/posts', post).subscribe((resData) =>{
      console.log(resData.message);
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });
  }
}
