import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { BlogImage } from '../models/image.model';

@Injectable({
  providedIn: 'root',
})
export class ImageSelectorService {
  http = inject(HttpClient);
  showImageSeletor = signal<boolean>(false);
   selectedImage = signal<string | null>(null);
  displayshowImageSelector() {
        this.showImageSeletor.set(true);
  }
  hideImageSelector(){
    this.showImageSeletor.set(false);
  }

  uploadImage(file:File, title:string, filename:string){

    const formData = new FormData();
    formData.append('file',file);
    formData.append('title',title);
    formData.append('filename',filename);
    return this.http.post<BlogImage>(`${environment.apiBaseUrl}/api/image`, formData);
   

  }
  getAllImages(id:WritableSignal<string | undefined>):HttpResourceRef<BlogImage[] | undefined>{
    return httpResource<BlogImage[]>(()=>{
      id();
      return `${environment.apiBaseUrl}/api/image`;
    })
  }
//   getAllImages(): HttpResourceRef<BlogImage[] | undefined> {
//   return httpResource<BlogImage[]>(() =>
//     `${environment.apiBaseUrl}/api/image`
//   );
// }

  selectImage(imageUrl : string){
    this.selectedImage.set(imageUrl);
    this.hideImageSelector();
  }
}
