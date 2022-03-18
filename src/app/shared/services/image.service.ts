import { WebRequestService } from './web-request.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  imageToShow: string | ArrayBuffer;

  constructor(private apiService: WebRequestService) { }

  getProductImage(imageName: string) {
    return this.apiService.getImage("product/getimage",imageName);
  }
  getProductImage1(imageName: string) {
    return this.apiService.getImage("product/getimage",imageName);
  }

  removeProductImage(productId: any, imgName: string) {
    return this.apiService.removeProductImage("product/removeProductImage", productId, imgName);
  }

  getProductImagesById(id: number): Observable<any> {
    return this.apiService.getProductImagesById("product/getAllImages",id);
  }

  /* createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       //this.imageToShow = reader.result;
        reader.result; console.log(reader.result);
    }, false);

    if (image) {
       reader.readAsDataURL(image);
    }
 } */
}
