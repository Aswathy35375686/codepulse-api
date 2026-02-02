import { Component, effect, inject, input } from '@angular/core';
import { BlogpostService } from '../services/blogpost-service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MarkdownComponent } from 'ngx-markdown';
import { Categoryservice } from '../../category/services/categoryservice';

@Component({
  selector: 'app-edit-blogpost',
  imports: [ReactiveFormsModule,MarkdownComponent],
  templateUrl: './edit-blogpost.html',
  styleUrl: './edit-blogpost.css',
})
export class EditBlogpost {
  id = input<string>();
  blogPostService = inject(BlogpostService);
  categoryService = inject(Categoryservice);
  private blogPostRef = this.blogPostService.getBlogpostById(this.id);
  blogPostResponse = this.blogPostRef.value;

   private categoriesRef = this.categoryService.getAllCategories();
   categoriesResponse = this.categoriesRef.value;
    
  
    editBlogPostForm = new FormGroup({
      Title : new FormControl<string>('',{nonNullable:true,
       validators:[Validators.required,Validators.minLength(10),Validators.maxLength(100)],
      }),
    
      ShortDescription: new FormControl<string>('',{nonNullable:true,
       validators:[Validators.required,Validators.minLength(10),Validators.maxLength(100)],
      }),
      Content: new FormControl<string>('',{nonNullable:true,
       validators:[Validators.required,Validators.minLength(10),Validators.maxLength(100)],
      }),
      FeaturedImageUrl: new FormControl<string>('',{nonNullable:true,
       validators:[Validators.required,Validators.maxLength(100)],
  
      }),
      UrlHandle: new FormControl<string>('',{nonNullable:true,
       validators:[Validators.required],
      }),
      PublishedDate: new FormControl<string>(new Date().toISOString().split('T')[0],{nonNullable:true,
       validators:[Validators.required,Validators.maxLength(100)],
      }),
      Author: new FormControl<string>('',{nonNullable:true,
       validators:[Validators.required,Validators.maxLength(100)],
      }),
      IsVisible: new FormControl<boolean>(true,{nonNullable:true,
       validators:[Validators.required],
      }),
      categories : new FormControl<string[]>([]),
    });
    effectRef = effect(()=>{
      if(this.blogPostResponse()){
         this.editBlogPostForm.patchValue({
        Title : this.blogPostResponse()?.title,
        ShortDescription: this.blogPostResponse()?.shortDescription,
        Content: this.blogPostResponse()?.content,
        FeaturedImageUrl: this.blogPostResponse()?.featuredImageUrl,
        UrlHandle: this.blogPostResponse()?.urlHandle,
        PublishedDate: this.blogPostResponse()?.publishedDate,
        Author: this.blogPostResponse()?.author,
        IsVisible: this.blogPostResponse()?.isVisible,
        categories: this.blogPostResponse()?.categories.map(x =>x.id),
        
      });

      }
     

    });

    onSubmit(){
      const formRawValue = this.editBlogPostForm.getRawValue();
       
      console.log(formRawValue);
  
    //  const requestDto : AddBlogPostRequest={
    //   title:formRawValue.Title,
    //   shortDescription:formRawValue.ShortDescription,
    //   content:formRawValue.Content,
    //   featuredImageUrl:formRawValue.FeaturedImageUrl,
    //   urlHandle:formRawValue.UrlHandle,
    //   publishedDate:formRawValue.PublishedDate,
    //   author:formRawValue.Author,
    //   isVisible:formRawValue.IsVisible,
    //   categories: formRawValue.categories ?? [], 
  
    //  };
  
      // this.blogpostService.createBlogpost(requestDto).subscribe({
      //   next:(response)=>{
      //     console.log("Blog post created successfully",response);
      //     this.router.navigate(['/admin/blogposts']);
      //   },
      //   error:(error)=>{
      //     console.log("Error creating blog post",error);
      //   }
      // });
     
    }
  }
