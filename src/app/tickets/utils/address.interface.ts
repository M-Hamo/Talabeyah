export interface IAddress {
  id: number;
  governorate_name: string;
  cities: ICity[];
}

export interface ICity {
  governorate_id: number;
  city_name: string;
  district: string[];
}
