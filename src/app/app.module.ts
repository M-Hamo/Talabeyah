import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { StoreModule } from "@ngrx/store";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { SharedModule } from "./shared/shared.module";

import { TicketsModule } from "./tickets/tickets.module";

import { ToastrModule } from "ngx-toastr";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";

const THIRD_PART_MODULES = [TicketsModule];

const COMMON_MODULES = [
  BrowserModule,
  CommonModule,
  RouterModule,
  AppRoutingModule,
  BrowserAnimationsModule,
];
@NgModule({
  declarations: [AppComponent],
  imports: [
    ...COMMON_MODULES,
    ...THIRD_PART_MODULES,
    SharedModule,
    StoreModule.forRoot({}, {}),
    ToastrModule.forRoot(),
    StoreDevtoolsModule.instrument({
      name: "Tracking System manage state project using ngrx",
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
