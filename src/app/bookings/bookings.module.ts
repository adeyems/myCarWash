import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { NativeScriptFormsModule } from "nativescript-angular";
import { BookingsComponent } from "./bookings.component";
import { BookingsRoutingModule } from "./bookings-routing.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        BookingsRoutingModule
    ],
    declarations: [
        BookingsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class BookingsModule { }
