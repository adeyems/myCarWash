import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { FeedbacksComponent } from "./feedbacks.component";

const routes: Routes = [
    {
        path: '',
        component: FeedbacksComponent
    },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class FeedbacksRoutingModule { }
