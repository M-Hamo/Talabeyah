import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";

import { NotifyComponent } from "./components/notify/notify.component";

const COMPONENTS = [NotifyComponent];

const UI_COMPONENTS = [
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatCardModule,
  MatTooltipModule,
  MatIconModule,
  MatSidenavModule,
];

const COMMON_MODULES = [CommonModule, FormsModule, RouterModule, ReactiveFormsModule];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...COMMON_MODULES, ...UI_COMPONENTS],
  exports: [...COMMON_MODULES, ...UI_COMPONENTS, ...COMPONENTS],
})
export class SharedModule {}
