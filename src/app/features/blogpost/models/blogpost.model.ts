import { Category } from "../../category/models/category.model";

export interface AddBlogPostRequest{
    title : string;
    shortDescription : string;
    content : string;
    featuredImageUrl : string;
    urlHandle : string;
    publishedDate : string;
    author : string;
    isVisible : boolean;
    categories : string[];
}
export interface UpdateBlogPostRequest{
    title : string;
    shortDescription : string;
    content : string;
    featuredImageUrl : string;
    urlHandle : string;
    publishedDate : string;
    author : string;
    isvisible : boolean;
    categories : string[];
}
export interface BlogPost{
    title: string;
    id : string;
    shortDescription : string;
    content : string;
    featuredImageUrl : string;
    urlHandle : string;
    publishedDate : string;
    author : string;
    isVisible : boolean;
    categories : Category[];
}  