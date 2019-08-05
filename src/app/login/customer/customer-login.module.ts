import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import {ReactiveFormsModule} from "@angular/forms";
import {CustomerLoginRoutingModule} from "~/app/login/customer/customer-login-routing.module";
import {CustomerLoginComponent} from "~/app/login/customer/customer-login.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        CustomerLoginRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [
        CustomerLoginComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CustomerLoginModule { }
