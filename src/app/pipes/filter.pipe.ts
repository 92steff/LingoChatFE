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
      const fullName: string = (it.firstName + ' ' + it.lastName).toLocaleLowerCase();
      const invertedFullNme: string = (it.lastName + ' ' + it.firstName).toLowerCase();
      return fullName.includes(searchVal) || invertedFullNme.includes(searchVal);
    })
  }

}
