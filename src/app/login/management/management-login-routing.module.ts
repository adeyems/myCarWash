import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import {LoginComponent} from "~/app/login/login.component";
import {ManagementLoginComponent} from "~/app/login/management/management-login.component";

const routes: Routes = [
    {
        path: '',
        component: ManagementLoginComponent
    },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ManagementLoginRoutingModule { }
