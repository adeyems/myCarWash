import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import {ReactiveFormsModule} from "@angular/forms";
import {NativeScriptHttpClientModule} from "nativescript-angular/http-client";
import {LoginComponent} from "~/app/login/login.component";
import {HomeComponent} from "~/app/home/home.component";
import {CustomerLoginComponent} from "~/app/login/customer/customer-login.component";
import {ManagementLoginComponent} from "~/app/login/management/management-login.component";
import {SignupComponent} from "~/app/signup/signup.component";
import {RelevantInfoComponent} from "~/app/relevant-info/relevant-info.component";
import {CustomerHomeScreenComponent} from "~/app/customer-home-screen/customer-home-screen.component";
import {NativeScriptFormsModule} from "nativescript-angular";
import {ForgotPasswordComponent} from "~/app/password/forgot-password.component";
import {CustomerBookingFormComponent} from "~/app/customer-booking-form/customer-booking-form.component";

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        NativeScriptHttpClientModule,
    ],
    entryComponents: [
        AppComponent
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        CustomerLoginComponent,
        ManagementLoginComponent,
        SignupComponent,
        RelevantInfoComponent,
        CustomerHomeScreenComponent,
        ForgotPasswordComponent,
        CustomerBookingFormComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})

export class AppModule {

}
