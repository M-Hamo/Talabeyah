import { Pipe, PipeTransform } from "@angular/core";
import { StoreAddress } from "../state/ticket.model";

@Pipe({
  name: "addressPipe",
})
export class AddressPipePipe implements PipeTransform {
  transform(address: StoreAddress): string {
    return (
      (address?.gov ?? "") +
      (address?.city ? ", " : "") +
      (address?.city ?? "") +
      (address?.district ? ", " : ".") +
      (address?.district ?? "")
    );
  }
}
