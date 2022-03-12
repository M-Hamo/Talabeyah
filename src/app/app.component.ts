import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './app.state';

import * as TicketActions from './tickets/state/ticketActions';

@Component({
  selector: 'app-root',
  template: `
    <header
      class="h-16 flex justify-start items-center px-4 border-2 border-gray-200 text-gray-700"
    >
      <button class="gap-2" (click)="onToggleSideBar()">
        <mat-icon>menu</mat-icon>
      </button>

      <div class="mx-5 text-2xl">Tracking System</div>
    </header>
    <tickets-list></tickets-list>
  `,
})
export class AppComponent {
  constructor(private _store: Store<State>) {}

  public onToggleSideBar(): void {
    this._store.dispatch(TicketActions.toggleSideBar());
  }
}
