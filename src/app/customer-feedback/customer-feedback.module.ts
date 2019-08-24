import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { CustomerFeedbackComponent } from "./customer-feedback.component";
import { CustomerFeedbackRoutingModule } from "./customer-feedback-routing.module";
import { NativeScriptFormsModule } from "nativescript-angular";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        CustomerFeedbackRoutingModule
    ],
    declarations: [
        CustomerFeedbackComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CustomerHomeScreenModule { }
