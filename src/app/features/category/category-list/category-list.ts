import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Categoryservice } from '../services/categoryservice';


@Component({
  selector: 'app-category-list',
  imports: [RouterLink],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css',
})
export class CategoryList {
  private categoryservice  = inject(Categoryservice);
  private  getAllCategoriesRef = this.categoryservice.getAllCategories();
  isLoading = this.getAllCategoriesRef.isLoading;
  isError = this.getAllCategoriesRef.error;
  value = this.getAllCategoriesRef.value;
}
