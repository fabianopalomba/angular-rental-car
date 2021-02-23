import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'pagination'})
export class PaginationPipe implements PipeTransform {
  transform(value: any[], page, perpage): any {
    return [ ...value.slice( perpage*(page) , perpage*(page+1)  )]
  }
}
