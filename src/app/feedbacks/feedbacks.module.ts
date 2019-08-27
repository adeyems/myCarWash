import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { NativeScriptFormsModule } from "nativescript-angular";
import { FeedbacksComponent } from "./feedbacks.component";
import { FeedbacksRoutingModule } from "./feedbacks-routing.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        FeedbacksRoutingModule
    ],
    declarations: [
        FeedbacksComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class FeedbacksModule { }
