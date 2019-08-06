import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import {CustomerHomeScreenComponent} from "~/app/customer-home-screen/customer-home-screen.component";

const routes: Routes = [
    {
        path: '',
        component: CustomerHomeScreenComponent
    },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class CustomerHomeScreenRoutingModule { }
