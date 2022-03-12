import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, ReplaySubject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { State } from 'src/app/app.state';
import {
  numOnlyRegExp,
  stringOnlyEXP,
} from 'src/app/shared/utils/regExpressions';
import * as TicketActions from '../state/ticketActions';
import { IAdress, ITicket } from '../state/ticket.model';
import { fuseAnimations } from 'src/app/shared/utils/animations';
import { getShowProductCode } from '../state/ticket.reducer';

@Component({
  selector: 'tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.scss'],
  animations: [fuseAnimations],
})
export class TicketsListComponent implements OnInit, OnDestroy {
  public constructor(
    private _fb: FormBuilder,
    private _store: Store<State>,
    private _toastr: ToastrService
  ) {}

  public _destroyAll$ = new ReplaySubject<unknown>(1);

  public tickets$: Observable<ITicket[]> =
    this._store.select(getShowProductCode);

  public ticketingForm: FormGroup = this._fb.group({});

  public ngOnInit(): void {
    this.initForm();

    this.ticketingForm?.valueChanges
      .pipe(
        takeUntil(this._destroyAll$),
        tap(() => this.changedField())
      )
      .subscribe();
  }
  public onSubmit(form: ITicket): void {
    const ticket: ITicket = { ...form, id: Date.now() };
    this._store.dispatch(TicketActions.addTicketAction({ ticket }));
    this._toastr.success('Ticket added successfully 🚀');
    this.onResetForm();
  }

  public onRemoveTicket(ticket: ITicket): void {
    ticket &&
      this._store.dispatch(TicketActions.deleteTicketAction({ ticket }));
  }

  public onResetForm(): void {
    this.ticketingForm.reset();
    this.disabledControl('city');
    this.disabledControl('district');
  }

  private changedField(): void {
    const gov: FormControl = this.control('gov');
    const city: FormControl = this.control('city');
    const district: FormControl = this.control('district');

    if (gov?.valid && city?.disabled) {
      this.enableControl('city');
    }
    if (city?.valid && district?.disabled) {
      this.enableControl('district');
    }
  }

  private control(name: string): FormControl {
    return this.ticketingForm?.get('address')?.get(name) as FormControl;
  }

  private enableControl(name: string): void {
    name &&
      (this.ticketingForm?.get('address')?.get(name) as FormControl).enable();
  }

  private disabledControl(name: string): void {
    name &&
      (this.ticketingForm?.get('address')?.get(name) as FormControl).disable();
  }

  private initForm(): void {
    this.ticketingForm = this._fb.group({
      callerName: [
        null,
        [Validators.required, Validators.pattern(stringOnlyEXP)],
      ],
      callerPhone: [
        null,
        [Validators.required, Validators.pattern(numOnlyRegExp)],
      ],
      address: this._fb.group({
        gov: [null, [Validators.required]],
        city: [{ value: null, disabled: true }, [Validators.required]],
        district: [{ value: null, disabled: true }, [Validators.required]],
      }),
      ticketDate: Date.now(),
    });
  }

  public ngOnDestroy(): void {
    this._destroyAll$.next(undefined);
    this._destroyAll$.complete();
  }
}
