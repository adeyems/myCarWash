import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import {ReactiveFormsModule} from "@angular/forms";
import {RelevantInfoRoutingModule} from "~/app/relevant-info/relevant-info-routing.module";
import {RelevantInfoComponent} from "~/app/relevant-info/relevant-info.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ReactiveFormsModule,
        RelevantInfoRoutingModule
    ],
    declarations: [
        RelevantInfoComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class RelevantInfoModule { }
