import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import {CustomerBookingFormComponent} from "~/app/customer-booking-form/customer-booking-form.component";

const routes: Routes = [
    {
        path: '',
        component: CustomerBookingFormComponent
    },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class CustomerBookingFormRoutingModule { }
