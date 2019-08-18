import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import {ManageBookingComponent} from "~/app/manage-booking/manage-booking.component";

const routes: Routes = [
    {
        path: '',
        component: ManageBookingComponent
    },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ManageBookingRoutingModule { }
