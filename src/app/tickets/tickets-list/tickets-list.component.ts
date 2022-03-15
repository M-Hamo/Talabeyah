import { Component, HostListener, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { ToastrService } from "ngx-toastr";
import { Observable, ReplaySubject } from "rxjs";
import { takeUntil, tap } from "rxjs/operators";
import { State } from "src/app/app.state";
import { numOnlyRegExp } from "src/app/shared/utils/regExpressions";
import * as TicketActions from "../state/ticketActions";
import { ITicket } from "../state/ticket.model";
import { fuseAnimations } from "src/app/shared/utils/animations";
import {
  citiesUnderGov,
  districtUnderCity,
  getShowProductCode,
  governments,
  toggleSide,
} from "../state/ticket.reducer";
import { MatSidenav } from "@angular/material/sidenav";
import { IAddress, ICity } from "../utils/address.interface";

@Component({
  selector: "tickets-list",
  templateUrl: "./tickets-list.component.html",
  animations: [fuseAnimations],
})
export class TicketsListComponent implements OnInit, OnDestroy {
  public constructor(
    private readonly _fb: FormBuilder,
    private readonly _store: Store<State>,
    private readonly _toaster: ToastrService
  ) {}

  public readonly _destroyAll$ = new ReplaySubject<unknown>(1);

  @ViewChild("drawer") public drawer: MatSidenav;

  public readonly tickets$: Observable<ITicket[]> =
    this._store.select(getShowProductCode);

  public readonly toggleSide$: Observable<boolean> = this._store.select(toggleSide);

  public readonly governments$: Observable<IAddress[]> = this._store.select(governments);

  public readonly citiesUnderGov$: Observable<ICity[]> =
    this._store.select(citiesUnderGov);

  public readonly districtUnderCity$: Observable<string[]> =
    this._store.select(districtUnderCity);

  public ticketingForm: FormGroup = this._fb.group({
    callerName: [null, [Validators.required]],
    callerPhone: [null, [Validators.required, Validators.pattern(numOnlyRegExp)]],
    address: this._fb.group({
      gov: [null, [Validators.required]],
      city: [null, [Validators.required]],
      district: [null, [Validators.required]],
    }),
  });

  public drawerMode: "over" | "side" = "side";

  public ngOnInit(): void {
    this.drawerMode = window.screen?.width < 769 ? "over" : "side";
    this.ticketingForm?.valueChanges
      .pipe(
        takeUntil(this._destroyAll$),
        tap(() => this.fieldChanges())
      )
      .subscribe();
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    const pageWidth: number = event?.target?.innerWidth;
    if (pageWidth < 769) {
      this.drawerMode = "over";
    } else {
      this.drawerMode = "side";
    }
  }

  public onSubmit(form: ITicket): void {
    const ticket: ITicket = { ...form, id: Date.now(), ticketDate: Date.now() };
    this._store.dispatch(TicketActions.addTicketAction({ ticket }));
    this._toaster.success("Ticket added successfully 🕘");
    this.onResetForm();
  }

  public onToggleSide(): void {
    this._store.dispatch(TicketActions.toggleSideBar());
  }

  public onRemoveTicket(ticket: ITicket): void {
    ticket && this._store.dispatch(TicketActions.deleteTicketAction({ ticket }));
    this._toaster.info("Ticket removed successfully.");
  }

  public onResetForm(): void {
    this.ticketingForm.reset({});
    if (this.drawerMode === "over") this.onToggleSide();
  }

  private fieldChanges(): void {
    const gov: FormControl = this.control("gov");
    const city: FormControl = this.control("city");

    if (gov?.valid)
      this._store.dispatch(TicketActions.onGovChange({ govName: gov?.value }));

    if (city?.valid)
      this._store.dispatch(TicketActions.onCityChange({ cityName: city?.value }));
  }

  private control(name: string): FormControl {
    return this.ticketingForm?.get("address")?.get(name) as FormControl;
  }

  public ngOnDestroy(): void {
    this._destroyAll$.next(undefined);
    this._destroyAll$.complete();
  }
}
