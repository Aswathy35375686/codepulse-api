import { Component, inject, input } from '@angular/core';
import { BlogpostService } from '../../blogpost/services/blogpost-service';
import { DatePipe } from '@angular/common';
import { MarkdownComponent } from "ngx-markdown";

@Component({
  selector: 'app-blog-details',
  imports: [DatePipe, MarkdownComponent],
  templateUrl: './blog-details.html',
  styleUrl: './blog-details.css',
})
export class BlogDetails {
   BlogPostService() {
     throw new Error('Method not implemented.');
   }
   url = input<string | undefined>();
   // fetch the blogdetails using url 
   blogPostService = inject(BlogpostService);
   blogDetailsRef = this.blogPostService.getBlogPostByUrlHandle(this.url);
   isLoading = this.blogDetailsRef.isLoading;
   blogDetailsResponse = this.blogDetailsRef.value;

}
