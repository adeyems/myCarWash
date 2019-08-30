import {Component, OnInit, ViewContainerRef} from "@angular/core";
import {RouterExtensions, ModalDialogOptions, ModalDialogService} from "nativescript-angular";
import { AuthService } from "~/app/services/auth.service";
import {ActivatedRoute} from "@angular/router";
import * as moment from 'moment';

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./management-home-screen.component.html",
    styleUrls: ["./management-home-screen.component.css"]
})
export class ManagementHomeScreenComponent implements OnInit {
    pageTitle: string;
    public currentUser: string;
    recentBooking: string;
    recentRating;

    constructor(
        private router: RouterExtensions,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute,

    ) {
        this.activatedRoute.queryParams.subscribe( params => {
            this.currentUser = params["user"];
            console.log(this.currentUser);
        });
    }

    ngOnInit() {

    }

    goToBookings() {
        this.router.navigate(["bookings"]);
    }

    goToFeedbacks() {
        this.router.navigate(["feedbacks"]);
    }
    goToRatings() {
        this.router.navigate(["ratings"]);
    }

    onLogout() {
        this.authService.logout();
    }

    goToUploadProducts() {
        this.router.navigate(["upload"])
    }
}
