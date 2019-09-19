import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import {ReactiveFormsModule} from "@angular/forms";
import {ManagementHomeScreenComponent} from "~/app/management-home-screen/management-home-screen.component";
import { ManagementHomeScreenRoutingModule} from "~/app/management-home-screen/management-home-screen-routing.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ReactiveFormsModule,
        ManagementHomeScreenRoutingModule
    ],
    declarations: [
        ManagementHomeScreenComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ManagementHomeScreenModule { }
