import { Pipe, PipeTransform } from "@angular/core";
import { ImageService } from './../services/image.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';

/**
 * Generated class for the SecureImagesPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
 @Pipe({
  name: 'imagePipe',
})
export class GetImagePipe implements PipeTransform {
  constructor(private imageService: ImageService, private sanitizer: DomSanitizer) { }

    transform(imageName) {
         this.imageService.getProductImage(imageName)
        .subscribe(blob => {
          let objectURL = URL.createObjectURL(blob);
          return this.sanitizer.bypassSecurityTrustUrl(objectURL);
        });
    }
}
