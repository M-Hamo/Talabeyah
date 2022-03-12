import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { ReplaySubject, timer } from "rxjs";
import { filter, takeUntil, tap } from "rxjs/operators";
import { ITicket } from "../state/ticket.model";

@Component({
  selector: "ticket",
  templateUrl: "./ticket-ui.component.html",
})
export class TicketUiComponent implements OnInit, OnDestroy {
  private _destroyAll$ = new ReplaySubject(1);

  @Input() ticket: ITicket;

  @Output() removeTicket = new EventEmitter<ITicket>();

  public counter = 180;

  public ngOnInit(): void {
    timer(0, 1000)
      .pipe(
        takeUntil(this._destroyAll$),
        filter(() => this.counter !== -1),
        tap((x: number) => {
          if (x === 180) this.removeTicket.emit(this.ticket);
          else --this.counter;
        })
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this._destroyAll$.next(undefined);
    this._destroyAll$.complete();
  }
}
