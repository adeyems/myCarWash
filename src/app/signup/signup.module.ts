import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import {ReactiveFormsModule} from "@angular/forms";
import {SignupComponent} from "~/app/signup/signup.component";
import { SignupRoutingModule} from "~/app/signup/signup-routing.module";
import {NativeScriptFormsModule} from "nativescript-angular";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        ReactiveFormsModule,
        SignupRoutingModule
    ],
    declarations: [
        SignupComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SignupModule { }
