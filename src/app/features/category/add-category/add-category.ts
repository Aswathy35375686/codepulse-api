import { Component, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddCategoryRequest } from '../models/category.model';
import { Categoryservice } from '../services/categoryservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  imports: [ReactiveFormsModule],
  templateUrl: './add-category.html',
  styleUrl: './add-category.css',
})
export class AddCategory {

  private router = inject(Router);
  constructor(){
    effect(()=>{
    if(this.categoryService.addCategoryStatus() ==='success'){
        this.router.navigate(['/admin/categories'])
   }
   if(this.categoryService.addCategoryStatus() ==='error'){
    console.log("Add category request failed");
  
 }
});
  }
  private categoryService = inject(Categoryservice);
  // 1 import reactivefrom module
  // 2 formgroups -> formcontrols
addCategoryFormGroup = new FormGroup({
  Categoryname:new FormControl<string>('',{nonNullable:true,validators :[Validators.required,Validators.maxLength(100)]}),
  urlHandle : new FormControl<string>('',{nonNullable: true}),
});
get nameFormControl(){
  return this.addCategoryFormGroup.controls.Categoryname;

}
 onSubmit(){
   const addCategoryFormValue =this.addCategoryFormGroup.getRawValue();
   const AddCategoryRequestDto: AddCategoryRequest = {
    name : addCategoryFormValue.Categoryname,
    urlHandle: addCategoryFormValue.urlHandle,

   };
   this.categoryService.addCategory(AddCategoryRequestDto);

   
 }
}
