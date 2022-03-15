import { createAction, props } from "@ngrx/store";
import { ITicket } from "./ticket.model";

export const toggleSideBar = createAction("[Side] Toggle side");

export const addTicketAction = createAction(
  "[Ticket] Add ticket",
  props<{ ticket: ITicket }>()
);

export const deleteTicketAction = createAction(
  "[Ticket] Delete ticket",
  props<{ ticket: ITicket }>()
);

export const onGovChange = createAction(
  "[Address] Government changes",
  props<{ govName: string }>()
);

export const onCityChange = createAction(
  "[Address] Cities changes",
  props<{ cityName: string }>()
);
