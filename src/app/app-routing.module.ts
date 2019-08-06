import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import {LoginComponent} from "~/app/login/login.component";
import {ManagementLoginComponent} from "~/app/login/management/management-login.component";
import {CustomerLoginComponent} from "~/app/login/customer/customer-login.component";
import {SignupComponent} from "~/app/signup/signup.component";
import {CustomerHomeScreenComponent} from "~/app/customer-home-screen/customer-home-screen.component";
import {RelevantInfoComponent} from "~/app/relevant-info/relevant-info.component";
import {ForgotPasswordComponent} from "~/app/password/forgot-password.component";
import {CustomerBookingFormComponent} from "~/app/customer-booking-form/customer-booking-form.component";

const routes: Routes = [
    { path: "managementLogin", component: ManagementLoginComponent },
    { path: "forgotPassword", component: ForgotPasswordComponent },
    { path: "customerLogin", component: CustomerLoginComponent },
    { path: "login", component: LoginComponent },
    { path: "customerSignup", component: SignupComponent },
    { path: "customerHome", component:  CustomerHomeScreenComponent},
    { path: "customerSignup", component: SignupComponent },
    { path: "relevantInfo", component: RelevantInfoComponent},
    { path: "customerBookingForm", component: CustomerBookingFormComponent},
    { path: "", redirectTo: "/login", pathMatch: "full" },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
