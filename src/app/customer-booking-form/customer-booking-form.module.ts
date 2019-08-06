import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import {ReactiveFormsModule} from "@angular/forms";
import {CustomerHomeScreenComponent} from "~/app/customer-home-screen/customer-home-screen.component";
import {CustomerBookingFormRoutingModule} from "~/app/customer-booking-form/customer-booking-form-routing.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ReactiveFormsModule,
        CustomerBookingFormRoutingModule
    ],
    declarations: [
        CustomerHomeScreenComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CustomerBookingFormModule { }
