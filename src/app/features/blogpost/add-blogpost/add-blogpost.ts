import { Component, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddBlogPostRequest } from '../models/blogpost.model';
import { Router } from '@angular/router';
import { BlogpostService } from '../services/blogpost-service';
import { MarkdownComponent } from 'ngx-markdown';
import { Categoryservice } from '../../category/services/categoryservice';
import { ImageSelectorService } from '../../../shared/services/image-selector-service';

@Component({
  selector: 'app-add-blogpost',
  standalone : true,
  imports: [ReactiveFormsModule,MarkdownComponent],
  templateUrl: './add-blogpost.html',
  styleUrl: './add-blogpost.css',
})
export class AddBlogpost {

  blogpostService = inject(BlogpostService);
 categoryService = inject(Categoryservice);
   router = inject(Router);
   imageSelectorService = inject(ImageSelectorService);
   selectedImageEffectRef = effect(()=>{
      const selectedImageUrl = this.imageSelectorService.selectedImage();
      if(selectedImageUrl){
        this.addBlogPostForm.patchValue({
          FeaturedImageUrl: selectedImageUrl
        });
      }
    });
 
 private categoriesResourceRef = this.categoryService.getAllCategories();
 categoriesResponse = this.categoriesResourceRef.value;
  

  addBlogPostForm = new FormGroup({
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

  onSubmit(){
    const formRawValue = this.addBlogPostForm.getRawValue();
     
    console.log(formRawValue);

   const requestDto : AddBlogPostRequest={
    title:formRawValue.Title,
    shortDescription:formRawValue.ShortDescription,
    content:formRawValue.Content,
    featuredImageUrl:formRawValue.FeaturedImageUrl,
    urlHandle:formRawValue.UrlHandle,
    publishedDate:formRawValue.PublishedDate,
    author:formRawValue.Author,
    isVisible:formRawValue.IsVisible,
    categories: formRawValue.categories ?? [], 

   };

    this.blogpostService.createBlogpost(requestDto).subscribe({
      next:(response)=>{
        console.log("Blog post created successfully",response);
        this.router.navigate(['/admin/blogposts']);
      },
      error:(error)=>{
        console.log("Error creating blog post",error);
      }
    });
   
  }
}
