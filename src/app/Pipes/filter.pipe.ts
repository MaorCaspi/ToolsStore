import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, key: string, filterString: string) {
    if(value == null || value.length === 0 || filterString === "") {
      return value;
    }

    const results = [];
    for (const item of value){
      if(item[key] === filterString) {
        results.push(item);
      }
    }
    return results;
  }

}
