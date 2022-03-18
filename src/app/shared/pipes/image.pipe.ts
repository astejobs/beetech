import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageService } from '../services/image.service';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {
imageToShow: any;
  constructor(private imageService: ImageService, private sanitizer: DomSanitizer) { }

  transform(imageName: string, ...args: unknown[]): any { console.log(imageName);
    this.imageService.getProductImage(imageName)
    .subscribe(blob => {
      let objectURL = URL.createObjectURL(blob);
      this.imageToShow = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      console.log(this.imageToShow);
      return this.imageToShow;
    });
  }

}
