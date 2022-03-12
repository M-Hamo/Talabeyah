import { Pipe, PipeTransform } from '@angular/core';
import { IAdress } from '../state/ticket.model';

@Pipe({
  name: 'addressPipe',
})
export class AddressPipePipe implements PipeTransform {
  transform(address: IAdress): string {
    return (
      (address?.gov ?? '') +
      (address?.city ? ', ' : '') +
      (address?.city ?? '') +
      (address?.district ? ', ' : '.') +
      ((address?.district ?? '') + '.')
    );
  }
}
