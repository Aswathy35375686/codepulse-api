import { Component, effect, inject, input } from '@angular/core';
import { Categoryservice } from '../services/categoryservice';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-category.html',
  styleUrl: './edit-category.css',
})
export class EditCategory {
  constructor(){
    effect(()=>{
      if(this.categoryService.updateCategoryStatus()==='success'){
         this.categoryService.updateCategoryStatus.set('idle');
        this.router.navigate(['/admin/categories']);

      }
       if(this.categoryService.updateCategoryStatus()==='error'){
          this.categoryService.updateCategoryStatus.set('idle');
        console.log("something went wrong!");
        
      }
    });
  }
  id = input<string>();
  private categoryService = inject(Categoryservice);
  private router = inject(Router);
  categoryResourceRef =  this.categoryService.getCategoryById(this.id)
  categoryResponse = this.categoryResourceRef.value;
  editCategoryFormGroup = new FormGroup({
  Categoryname:new FormControl<string>('',{nonNullable:true,validators :[Validators.required,Validators.maxLength(100)]}),
  urlHandle : new FormControl<string>('',{nonNullable: true}),
});
get nameFormControl(){
  return this.editCategoryFormGroup.controls.Categoryname;
}
effectRef = effect(()=>{
  this.editCategoryFormGroup.controls.Categoryname.patchValue(this.categoryResponse()?.name ?? ''); 
    this.editCategoryFormGroup.controls.Categoryname.patchValue(this.categoryResponse()?.name ?? ''); 
})
  onSubmit(){
    const id = this.id();
    if(this.editCategoryFormGroup.valid || !id){
      return;
    }
  const formRawValue = this.editCategoryFormGroup.getRawValue();
  const updateCategoryRequestDto={
    name:formRawValue.Categoryname,
    urlHandle:formRawValue.urlHandle
  };
  this.categoryService.updateCategory(id,updateCategoryRequestDto);
}
deleteCategory(){
  console.log("delete clicked")
  const id = this.id();
  if(!id){
    console.log("id is missing");
    return;
  }
  this.categoryService.deleteCategory(id)
  .subscribe({
    next:()=>{
      console.log("delete succesfully");
      this.router.navigate(['/admin/categories']);
    },
    error:()=>{
      console.log('Error deleting category');
    },
  });
}
}
