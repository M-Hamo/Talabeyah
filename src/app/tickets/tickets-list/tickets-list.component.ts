import { Component, HostListener, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { ToastrService } from "ngx-toastr";
import { Observable, ReplaySubject } from "rxjs";
import { takeUntil, tap } from "rxjs/operators";
import { State } from "src/app/app.state";
import { numOnlyRegExp, stringOnlyEXP } from "src/app/shared/utils/regExpressions";
import * as TicketActions from "../state/ticketActions";
import { ITicket } from "../state/ticket.model";
import { fuseAnimations } from "src/app/shared/utils/animations";
import { getShowProductCode, toggleSide } from "../state/ticket.reducer";
import { MatSidenav } from "@angular/material/sidenav";

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

  public ticketingForm: FormGroup = this._fb.group({});

  public drawerMode: "over" | "side" = "side";

  public ngOnInit(): void {
    this.drawerMode = window.screen?.width < 769 ? "over" : "side";
    this.initForm();
    this.ticketingForm?.valueChanges
      .pipe(
        takeUntil(this._destroyAll$),
        tap(() => this.changedField())
      )
      .subscribe();
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    const pageWidth: number = event?.target?.innerWidth;
    if (pageWidth < 769) {
      this.drawerMode = "over";
      // this.drawer.close();
    } else {
      this.drawerMode = "side";
      // this.drawer.open();
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
    this.ticketingForm.reset();
    this.disabledControl("city");
    this.disabledControl("district");
    if (this.drawerMode === "over") this.onToggleSide();
  }

  private changedField(): void {
    const gov: FormControl = this.control("gov");
    const city: FormControl = this.control("city");
    const district: FormControl = this.control("district");

    if (gov?.valid && city?.disabled) {
      this.enableControl("city");
    }
    if (city?.valid && district?.disabled) {
      this.enableControl("district");
    }
  }

  private control(name: string): FormControl {
    return this.ticketingForm?.get("address")?.get(name) as FormControl;
  }

  private enableControl(name: string): void {
    name && (this.ticketingForm?.get("address")?.get(name) as FormControl).enable();
  }

  private disabledControl(name: string): void {
    name && (this.ticketingForm?.get("address")?.get(name) as FormControl).disable();
  }

  private initForm(): void {
    this.ticketingForm = this._fb.group({
      callerName: [null, [Validators.required, Validators.pattern(stringOnlyEXP)]],
      callerPhone: [null, [Validators.required, Validators.pattern(numOnlyRegExp)]],
      address: this._fb.group({
        gov: [null, [Validators.required]],
        city: [{ value: null, disabled: true }, [Validators.required]],
        district: [{ value: null, disabled: true }, [Validators.required]],
      }),
    });
  }

  public ngOnDestroy(): void {
    this._destroyAll$.next(undefined);
    this._destroyAll$.complete();
  }
}
