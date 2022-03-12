import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ToastrModule } from 'ngx-toastr';
import { TicketsModule } from './tickets/tickets.module';

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
    StoreModule.forRoot({}, {}),
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
