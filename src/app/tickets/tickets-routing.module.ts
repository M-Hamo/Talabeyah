import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { TicketUiComponent } from "./ticket-ui/ticket-ui.component";
import { TicketsListComponent } from "./tickets-list/tickets-list.component";

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketsRoutingModule {
  static Components = [TicketUiComponent, TicketsListComponent];
}
