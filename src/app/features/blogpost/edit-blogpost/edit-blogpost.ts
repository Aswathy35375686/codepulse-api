import { Component, effect, inject, input } from '@angular/core';
import { BlogpostService } from '../services/blogpost-service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MarkdownComponent } from 'ngx-markdown';
import { Categoryservice } from '../../category/services/categoryservice';
import { ImageSelector } from '../../../shared/components/image-selector/image-selector';
import { ImageSelectorService } from '../../../shared/services/image-selector-service';
import { UpdateBlogPostRequest } from '../models/blogpost.model';


@Component({
  selector: 'app-edit-blogpost',
  imports: [ReactiveFormsModule, MarkdownComponent, ImageSelector],
  templateUrl: './edit-blogpost.html',
  styleUrl: './edit-blogpost.css',
})
export class EditBlogpost {
  id = input<string>();
  blogPostService = inject(BlogpostService);
  categoryService = inject(Categoryservice);
  imageSelectorService = inject(ImageSelectorService);
    router = inject(Router);
  private blogPostRef = this.blogPostService.getBlogpostById(this.id);
  blogPostResponse = this.blogPostRef.value;

   private categoriesRef = this.categoryService.getAllCategories();
   categoriesResponse = this.categoriesRef.value;
    
  
    editBlogPostForm = new FormGroup({
      title : new FormControl<string>('',{nonNullable:true,
       validators:[Validators.required,Validators.minLength(10),Validators.maxLength(100)],
      }),
    
      shortDescription: new FormControl<string>('',{nonNullable:true,
       validators:[Validators.required,Validators.minLength(10),Validators.maxLength(100)],
      }),
      content: new FormControl<string>('',{nonNullable:true,
       validators:[Validators.required,Validators.minLength(10),Validators.maxLength(100)],
      }),
      featuredImageUrl: new FormControl<string>('',{nonNullable:true,
       validators:[Validators.required,Validators.maxLength(100)],
  
      }),
      urlHandle: new FormControl<string>('',{nonNullable:true,
       validators:[Validators.required],
      }),
      publishedDate: new FormControl<string>(new Date().toISOString().split('T')[0],{nonNullable:true,
       validators:[Validators.required],
      }),
      author: new FormControl<string>('',{nonNullable:true,
       validators:[Validators.required,Validators.maxLength(100)],
      }),
      isvisible: new FormControl<boolean>(true,{nonNullable:true,
       validators:[Validators.required],
      }),
      categories : new FormControl<string[]>([]),
    });
    effectRef = effect(()=>{
      if(this.blogPostResponse()){
         this.editBlogPostForm.patchValue({
        title : this.blogPostResponse()?.title,
        shortDescription: this.blogPostResponse()?.shortDescription,
        content: this.blogPostResponse()?.content,
        featuredImageUrl: this.blogPostResponse()?.featuredImageUrl,
        urlHandle: this.blogPostResponse()?.urlHandle,
        publishedDate: this.blogPostResponse()?.publishedDate,
        author: this.blogPostResponse()?.author,
        isvisible: this.blogPostResponse()?.isVisible,
        categories: this.blogPostResponse()?.categories.map(x =>x.id),
        
      });

      }
     

    });

    selectedImageEffectRef = effect(()=>{
      const selectedImageUrl = this.imageSelectorService.selectedImage();
      if(selectedImageUrl){
        this.editBlogPostForm.patchValue({
          featuredImageUrl: selectedImageUrl
        });
      }
    });

 

    onSubmit(){
      // const formRawValue = this.editBlogPostForm.getRawValue();
       
      // console.log(formRawValue);
      const id = this.id();
 
    if (id && this.editBlogPostForm.valid) {
      const formValue = this.editBlogPostForm.getRawValue();
 
      const updateBlogpostRequestDto: UpdateBlogPostRequest = {
        title: formValue.title,
        shortDescription: formValue.shortDescription,
        content: formValue.content,
        author: formValue.author,
        featuredImageUrl: formValue.featuredImageUrl,
        isvisible: formValue.isvisible,
        publishedDate: formValue.publishedDate,
        urlHandle: formValue.urlHandle,
        categories: formValue.categories ?? [],
      };
 
      this.blogPostService.editBlogPost(id, updateBlogpostRequestDto)
        .subscribe({
          next: (response) => {
            this.router.navigate(['/admin/blogposts']);
 
          },
          error: () => {
            console.error('Something went wrong..')
          }
        });
    }
    
     
    }
    onDelete(){
      console.log("delete button clicked");
      const id = this.id();
      if(id){
        this.blogPostService.deleteBlogPost(id).subscribe({
          next:(response)=>{
            console.log("Blogpost delted successfully",response)
            this.router.navigate(['/admin/blogposts']);
          },
         error:()=>{
          console.error("Something  went wrong!");
         },
          
        });
      }
    }

    openImageSelector(){
      this.imageSelectorService.displayshowImageSelector();

    }
  }
