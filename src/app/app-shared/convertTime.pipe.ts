import {Pipe, PipeTransform} from "@angular/core";


@Pipe({
  name: 'convertTime'
})
export class ConvertTimePipe implements PipeTransform{
  transform(value: any, ...args): any {

    if (value < 60) {
      return `0 H ${value} MIN`
    } else if (value > 60) {
      const h = (value / 60).toString().slice(0,1)
      const m = (value / 60).toString().slice(2,4)
      if (Number(m) > 60) {
        return `${Number(h) + 1} H 00 MIN`
      } else if (!m) {
        return `${h} H 00 MIN`
      }
      return `${h} H ${m} MIN`
    }
  }
}
