import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import {SignupComponent} from "~/app/signup/signup.component";

const routes: Routes = [
    {
        path: '',
        component: SignupComponent
    },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class SignupRoutingModule { }
