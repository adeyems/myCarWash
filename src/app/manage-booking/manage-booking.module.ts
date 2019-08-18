import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {ManageBookingRoutingModule} from "~/app/manage-booking/manage-booking-routing.module";
import {ManageBookingComponent} from "~/app/manage-booking/manage-booking.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ReactiveFormsModule,
        ManageBookingRoutingModule
    ],
    declarations: [
        ManageBookingComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ManageBookingModule { }
