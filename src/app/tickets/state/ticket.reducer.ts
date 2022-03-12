import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

import * as TicketsActions from './ticketActions';

import { ITicket } from './ticket.model';

export interface TicketsState {
  tickets: ITicket[];
}

const initialState: TicketsState = {
  tickets: [],
};

// create selector
const getTicketsFeatureState = createFeatureSelector<TicketsState>('tickets');

// now cat create any selector for any ProductState property
export const getShowProductCode = createSelector(
  getTicketsFeatureState,
  // state function is a projector function
  (state) => state.tickets
);

export const ticketReducer = createReducer<TicketsState>(
  initialState,

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
