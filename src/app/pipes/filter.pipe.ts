import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchVal: string,): any {
    if (!items) return [];
    if (!searchVal) return items;

    searchVal = searchVal.toLocaleLowerCase();

    return items.filter(it => {
      return JSON.stringify(it).toLocaleLowerCase().includes(searchVal);
    })
  }

}
