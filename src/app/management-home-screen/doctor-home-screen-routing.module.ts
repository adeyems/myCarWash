import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { DoctorHomeScreenComponent } from "./doctor-home-screen.component";

const routes: Routes = [
    {
        path: '',
        component: DoctorHomeScreenComponent
    },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class DoctorHomeScreenRoutingModule { }
