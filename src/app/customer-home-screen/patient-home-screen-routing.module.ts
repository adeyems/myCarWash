import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import {PatientHomeScreenComponent} from "~/app/customer-home-screen/patient-home-screen.component";

const routes: Routes = [
    {
        path: '',
        component: PatientHomeScreenComponent
    },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class PatientHomeScreenRoutingModule { }
