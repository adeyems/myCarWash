import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import {ReactiveFormsModule} from "@angular/forms";
import {ManagementLoginComponent} from "~/app/login/management/management-login.component";
import { ManagementLoginRoutingModule } from "~/app/login/management/management-login-routing.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ReactiveFormsModule,
        ManagementLoginRoutingModule
    ],
    declarations: [
        ManagementLoginComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ManagementLoginModule { }
