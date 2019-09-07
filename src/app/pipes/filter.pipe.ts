import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchVal: string,): any {
    if (!items) return [];
    if (!searchVal) return items;

    searchVal = searchVal.toLocaleLowerCase();

    return items.filter((it:User) => {
      return it.firstName.toLowerCase().startsWith(searchVal) || 
             it.lastName.toLowerCase().startsWith(searchVal);  
    })
  }

}
