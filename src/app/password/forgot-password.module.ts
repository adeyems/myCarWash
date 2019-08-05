import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import {ReactiveFormsModule} from "@angular/forms";
import {ForgotPasswordComponent} from "./forgot-password.component";
import {ForgotPasswordRoutingModule} from "./forgot-password-routing.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ReactiveFormsModule,
        ForgotPasswordRoutingModule
    ],
    declarations: [
        ForgotPasswordComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CustomerLoginModule { }
