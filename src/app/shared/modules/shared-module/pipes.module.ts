import { NgModule, ModuleWithProviders  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePipe } from '../../pipes/image.pipe';
import { SafePipe } from '../../pipes/safe.pipe';



@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [ImagePipe,SafePipe],
  providers: [],
  exports: [ImagePipe,SafePipe]
})
export class PipesModule { }
