import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'readMore'
})
export class ReadMorePipe implements PipeTransform {

  transform(value:any): unknown {
    if (value)
            return value.substring(0, 450) +"... ";

    }
    getAllText(){
      return
    }

  }


