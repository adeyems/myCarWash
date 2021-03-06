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
import {CustomerHomeScreenComponent} from "~/app/customer-home-screen/customer-home-screen.component";
import {NativeScriptFormsModule} from "nativescript-angular";
import {ForgotPasswordComponent} from "~/app/password/forgot-password.component";
import {CustomerBookingFormComponent} from "~/app/customer-booking-form/customer-booking-form.component";
import {ManageBookingComponent} from "~/app/manage-booking/manage-booking.component";
import { CustomerFeedbackComponent } from "./customer-feedback/customer-feedback.component";
import { UserRating } from "./modals/user-rating/user-rating.component";
import {ManagementHomeScreenComponent} from "~/app/management-home-screen/management-home-screen.component";
import { BookingsComponent } from "./bookings/bookings.component";
import { FeedbacksComponent } from "./feedbacks/feedbacks.component";
import { FeedbackReply } from "./modals/feedback-reply/feedback-reply.component";
import {UploadProductsComponent} from "~/app/upload-products/upload-products.component";
import {RatingsComponent} from "~/app/ratings/ratings.component";

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
        AppComponent,
        UserRating,
        FeedbackReply
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        CustomerLoginComponent,
        ManagementLoginComponent,
        SignupComponent,
        CustomerHomeScreenComponent,
        ForgotPasswordComponent,
        CustomerBookingFormComponent,
        ManageBookingComponent,
        CustomerFeedbackComponent,
        UserRating,
        UploadProductsComponent,
        ManagementHomeScreenComponent,
        BookingsComponent,
        FeedbacksComponent,
        FeedbackReply,
        RatingsComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})

export class AppModule {

}
