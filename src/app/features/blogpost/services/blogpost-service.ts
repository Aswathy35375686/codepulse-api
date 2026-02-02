import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { inject, Injectable, InputSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AddBlogPostRequest, BlogPost } from '../models/blogpost.model';

@Injectable({
  providedIn: 'root',
})
export class BlogpostService {
  addBlogPostStatus() {
    throw new Error('Method not implemented.');
  }
  http = inject(HttpClient);
  apiBaseUrl = environment.apiBaseUrl;

  createBlogpost(data: AddBlogPostRequest): Observable<BlogPost> {
    return this.http.post<BlogPost>(`${this.apiBaseUrl}/api/blogpost`, data);
  }
  getAllBlogposts():HttpResourceRef<BlogPost[] | undefined>{
    return httpResource<BlogPost[]>(() => `${this.apiBaseUrl}/api/blogpost`);

  }
  getBlogpostById(id:InputSignal<string |undefined >):HttpResourceRef<BlogPost|undefined>{
    return httpResource<BlogPost>(()=>`${this.apiBaseUrl}/api/blogpost/${id()}`);

  }
}

