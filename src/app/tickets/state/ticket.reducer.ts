import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";

import * as TicketsActions from "./ticketActions";

import { ITicket } from "./ticket.model";
import { IAddress, ICity } from "../utils/address.interface";
import { Data } from "../data-access/address";

export interface TicketsState {
  tickets: ITicket[];
  governments: IAddress[];
  citiesUnderGov: ICity[];
  districtUnderCity: string[];
  toggleSide: boolean;
}

const initialState: TicketsState = {
  tickets: [],
  governments: Data,
  citiesUnderGov: [],
  districtUnderCity: [],
  toggleSide: true,
};

// Feature selector
const getTicketsFeatureState = createFeatureSelector<TicketsState>("tickets");

export const toggleSide = createSelector(
  getTicketsFeatureState,
  (state) => state.toggleSide
);

export const governments = createSelector(
  getTicketsFeatureState,
  (state) => state.governments
);

export const citiesUnderGov = createSelector(
  getTicketsFeatureState,
  (state) => state.citiesUnderGov
);

export const districtUnderCity = createSelector(
  getTicketsFeatureState,
  (state) => state.districtUnderCity
);

export const getShowProductCode = createSelector(
  getTicketsFeatureState,
  (state) => state.tickets
);

export const ticketReducer = createReducer<TicketsState>(
  initialState,

  on(TicketsActions.toggleSideBar, (state): TicketsState => {
    return {
      ...state,
      toggleSide: !state.toggleSide,
    };
  }),
  on(TicketsActions.onGovChange, (state, action): TicketsState => {
    const allGovernments: IAddress[] = state?.governments;
    const citiesUnderGov: ICity[] = allGovernments?.find(
      (g: IAddress) => g?.governorate_name === action?.govName
    )?.cities;
    return {
      ...state,
      citiesUnderGov: citiesUnderGov,
    };
  }),
  on(TicketsActions.onCityChange, (state, action): TicketsState => {
    const citiesUnderGov: ICity[] = state?.citiesUnderGov;
    const districtUnderCity: string[] = citiesUnderGov?.find(
      (c: ICity) => c?.city_name === action?.cityName
    )?.district;
    return {
      ...state,
      districtUnderCity: districtUnderCity,
    };
  }),
  on(TicketsActions.addTicketAction, (state, action): TicketsState => {
    return {
      ...state,
      tickets: [...state.tickets, action.ticket],
    };
  }),
  on(TicketsActions.deleteTicketAction, (state, action): TicketsState => {
    const allTickets: ITicket[] = [...state?.tickets];
    const ticketIndex: number = allTickets?.findIndex(
      (t: ITicket) => t?.id === action?.ticket?.id
    );

    allTickets.splice(ticketIndex, 1);
    return {
      ...state,
      tickets: [...allTickets],
    };
  })
);
