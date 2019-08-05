import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { LoginRoutingModule } from "./login-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from "~/app/login/login.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        LoginRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [
        LoginComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class LoginModule { }
