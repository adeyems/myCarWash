import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import {CustomerLoginComponent} from "~/app/login/customer/customer-login.component";

const routes: Routes = [
    {
        path: '',
        component: CustomerLoginComponent,
    },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class CustomerLoginRoutingModule { }
