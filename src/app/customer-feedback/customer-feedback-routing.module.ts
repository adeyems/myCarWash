import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { CustomerFeedbackComponent } from "./customer-feedback.component";

const routes: Routes = [
    {
        path: '',
        component: CustomerFeedbackComponent
    },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class CustomerFeedbackRoutingModule { }
