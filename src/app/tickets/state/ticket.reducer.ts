import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";

import * as TicketsActions from "./ticketActions";

import { ITicket } from "./ticket.model";

export interface TicketsState {
  tickets: ITicket[];
  toggleSide: boolean;
}

const initialState: TicketsState = {
  tickets: [],
  toggleSide: true,
};

// Feature selector
const getTicketsFeatureState = createFeatureSelector<TicketsState>("tickets");

export const toggleSide = createSelector(
  getTicketsFeatureState,
  (state) => state.toggleSide
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
