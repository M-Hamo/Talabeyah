export interface IAdress {
  gov: string;
  city: string;
  district: string;
}

export interface ITicket {
  id: number;
  callerPhone: number;
  address: IAdress;
  ticketDate: number;
  callerName: string;
}
