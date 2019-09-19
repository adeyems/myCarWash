import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { NativeScriptFormsModule } from "nativescript-angular";
import { RatingsComponent } from "./ratings.component";
import { RatingsRoutingModule } from "./ratings-routing.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        RatingsRoutingModule
    ],
    declarations: [
        RatingsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class RatingsModule { }
