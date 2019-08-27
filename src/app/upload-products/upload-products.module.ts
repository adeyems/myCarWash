import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { UploadProductsComponent } from "./upload-products.component";
import { UploadProductsRoutingModule } from "./upload-products-routing.module";
import { NativeScriptFormsModule } from "nativescript-angular";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        UploadProductsRoutingModule
    ],
    declarations: [
        UploadProductsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class UploadProductsModule { }
