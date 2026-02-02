import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogpostService } from '../services/blogpost-service';

@Component({
  selector: 'app-blogpost-list',
  imports: [RouterLink],
  templateUrl: './blogpost-list.html',
  styleUrl: './blogpost-list.css',
})
export class BlogpostList {
  blogPostService = inject(BlogpostService);
  getAllBlogPostRef = this.blogPostService.getAllBlogposts();
  isLoading = this.getAllBlogPostRef.isLoading;
  error = this.getAllBlogPostRef.error;
  response = this.getAllBlogPostRef.value;
  
  

}
