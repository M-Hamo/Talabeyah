import { NgModule } from "@angular/core";

import { TicketsRoutingModule } from "./tickets-routing.module";
import { StoreModule } from "@ngrx/store";
import { ticketReducer } from "./state/ticket.reducer";
import { AddressPipePipe } from "./utils/address-pipe.pipe";
import { FormatTimePipe } from "./utils/format-time.pipe";
import { SharedModule } from "../shared/shared.module";

const PIPES = [AddressPipePipe, FormatTimePipe];
@NgModule({
  declarations: [TicketsRoutingModule.Components, ...PIPES],
  imports: [
    SharedModule,
    TicketsRoutingModule,
    StoreModule.forFeature("tickets", ticketReducer),
  ],
  exports: [TicketsRoutingModule.Components],
})
export class TicketsModule {}
