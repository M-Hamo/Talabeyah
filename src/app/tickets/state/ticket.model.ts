export interface StoreAddress {
  gov: string;
  city: string;
  district: string;
}

export interface ITicket {
  id: number;
  callerPhone: number;
  address: StoreAddress;
  ticketDate: number;
  callerName: string;
}
