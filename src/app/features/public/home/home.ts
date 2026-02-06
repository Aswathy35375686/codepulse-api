import { Component, effect, inject } from '@angular/core';
import { BlogpostService } from '../../blogpost/services/blogpost-service';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  blogPostService = inject(BlogpostService);
  blogPostsRef = this.blogPostService.getAllBlogposts();
  isLoading = this.blogPostsRef.isLoading;
  blogPostsResponse = this.blogPostsRef.value;
  apiBaseUrl = environment.apiBaseUrl;
  constructor() {
  
       effect(() => {
      console.log('BlogPosts API Response:', this.blogPostsResponse());
      console.log('Loading:', this.isLoading());
    });
    
}
getFullImageUrl(blogPost: any) {
    if (!blogPost.featuredImageUrl) {
      return 'assets/default-image.jpg'; // fallback
    }
    console.log(`${this.apiBaseUrl}/uploads/${blogPost.featuredImageUrl}`);
    return `${this.apiBaseUrl}/uploads/${blogPost.featuredImageUrl}`;
  }
 
}


